import * as React from "react";
import { avatarPresets, type AvatarPresetId } from "@/components/ui/avatar-presets";
import type { AvatarType } from "@/components/ui/avatar";

/**
 * Fonte única de verdade para "como uma pessoa deve ser representada" —
 * Context mínimo (não Redux/Zustand, mesmo padrão do resto do projeto). A
 * preferência pertence à PESSOA (chave = `id` estável), não ao componente
 * onde ela foi escolhida — por isso o mapa é `Record<personId, preference>`,
 * não um valor único. Isso é o que permite Eren trocar o próprio avatar sem
 * afetar Ana Ribeiro, Carlos Souza etc., e o que permite qualquer card/lista
 * que represente essas pessoas puxar a MESMA preferência salva, em vez de
 * cada um decidir por conta própria.
 *
 * Login não autentica de verdade nem identifica um usuário distinto (`App()`
 * descarta o `username` digitado) — "o usuário atual" aqui é um único perfil
 * fixo (`CURRENT_USER`, mesmo nome/cargo hardcoded que já existia). Pessoas
 * que NÃO são o usuário logado (ex: responsável de uma reclamação) não têm
 * UI própria pra escolher avatar nesta tarefa — só o mecanismo de resolução
 * (`useUserAvatar`) e a persistência (mesma chave de `localStorage`) já
 * suportam qualquer `id`, prontos pra quando existir essa UI.
 */

export interface UserAvatarPreference {
  type: Extract<AvatarType, "preset" | "initials">;
  preset?: AvatarPresetId;
}

export interface PersonRef {
  /** Identificador estável — chave da preferência salva. Nunca o nome (nomes podem se repetir/mudar). */
  id: string;
  /** Fallback seguro quando não há preset/foto salvos para este `id` — nunca a fonte primária. */
  initials: string;
}

export interface CurrentUser extends PersonRef {
  name: string;
  role: string;
}

export interface ResolvedUserAvatar {
  type: AvatarType;
  preset?: AvatarPresetId;
  initials: string;
}

const STORAGE_KEY = "energisa-ds:avatar-preferences";

const CURRENT_USER: CurrentUser = { id: "eren", name: "Eren", role: "Designer", initials: "ER" };

type AvatarPreferenceMap = Record<string, UserAvatarPreference>;

/**
 * Preferências padrão (mock, sem backend) pra pessoas que não são o usuário
 * logado — hoje só Ana Ribeiro (`id` usado em `App.tsx`: Cards/Lista).
 * `localStorage` sempre tem prioridade sobre isso (é só o valor inicial).
 */
const DEFAULT_PREFERENCES: AvatarPreferenceMap = {
  "ana-ribeiro": { type: "preset", preset: "avatar-af13" },
};

function isValidPreference(value: unknown): value is UserAvatarPreference {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<UserAvatarPreference>;
  if (candidate.type === "initials") return true;
  if (candidate.type === "preset") return typeof candidate.preset === "string" && candidate.preset in avatarPresets;
  return false;
}

function readStoredPreferences(): AvatarPreferenceMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREFERENCES };
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...DEFAULT_PREFERENCES };
    const result: AvatarPreferenceMap = { ...DEFAULT_PREFERENCES };
    for (const [personId, preference] of Object.entries(parsed as Record<string, unknown>)) {
      if (isValidPreference(preference)) result[personId] = preference;
    }
    return result;
  } catch {
    // localStorage indisponível (modo privado, quota, SSR) — cai só nos padrões.
    return { ...DEFAULT_PREFERENCES };
  }
}

interface CurrentUserContextValue {
  currentUser: CurrentUser;
  preferences: AvatarPreferenceMap;
  setAvatarPreset: (preset: AvatarPresetId) => void;
  setAvatarInitials: () => void;
}

const CurrentUserContext = React.createContext<CurrentUserContextValue | null>(null);

function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = React.useState<AvatarPreferenceMap>(readStoredPreferences);

  const setPreferenceFor = React.useCallback((personId: string, preference: UserAvatarPreference) => {
    setPreferences((prev) => {
      const next = { ...prev, [personId]: preference };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // idem — preferência só dura em memória para esta sessão.
      }
      return next;
    });
  }, []);

  const value = React.useMemo<CurrentUserContextValue>(
    () => ({
      currentUser: CURRENT_USER,
      preferences,
      setAvatarPreset: (preset) => setPreferenceFor(CURRENT_USER.id, { type: "preset", preset }),
      setAvatarInitials: () => setPreferenceFor(CURRENT_USER.id, { type: "initials" }),
    }),
    [preferences, setPreferenceFor]
  );

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}

function resolveAvatar(preference: UserAvatarPreference | undefined, initials: string): ResolvedUserAvatar {
  if (preference?.type === "preset" && preference.preset) {
    return { type: "preset", preset: preference.preset, initials };
  }
  return { type: "initials", initials };
}

/**
 * Avatar resolvido de QUALQUER pessoa (usuária logada ou não), reativo —
 * re-renderiza sozinho quando a preferência daquele `id` específico muda em
 * qualquer lugar da aplicação. Funciona mesmo fora de um `CurrentUserProvider`
 * (Storybook isolado, cards sem `CurrentUserProvider` por perto): sem
 * Provider ou sem preferência salva para o `id`, cai em `initials` — nunca
 * lança erro, nunca renderiza um Avatar vazio.
 */
function useUserAvatar(person: PersonRef): ResolvedUserAvatar {
  const ctx = React.useContext(CurrentUserContext);
  return resolveAvatar(ctx?.preferences[person.id], person.initials);
}

/**
 * Usuário autenticado — nome/cargo pra exibição, avatar já resolvido, e os
 * únicos setters expostos (só a própria pessoa loga escolhe o próprio
 * avatar; outras pessoas usam `useUserAvatar` só para leitura). Ao contrário
 * de `useUserAvatar`, exige um `CurrentUserProvider` de verdade — não faz
 * sentido "usuário autenticado" sem sessão.
 */
function useCurrentUser() {
  const ctx = React.useContext(CurrentUserContext);
  if (!ctx) throw new Error("useCurrentUser deve ser usado dentro de um CurrentUserProvider");
  return {
    user: ctx.currentUser,
    avatar: resolveAvatar(ctx.preferences[ctx.currentUser.id], ctx.currentUser.initials),
    setAvatarPreset: ctx.setAvatarPreset,
    setAvatarInitials: ctx.setAvatarInitials,
  };
}

export { CurrentUserProvider, useCurrentUser, useUserAvatar };
