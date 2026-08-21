import * as React from "react";
import { createPortal } from "react-dom";
import { SelectCaretDownIcon } from "@/components/ui/icons/select-caret-down";
import { SelectCaretUpIcon } from "@/components/ui/icons/select-caret-up";
import { SelectCheckIcon } from "@/components/ui/icons/select-check";
import { SelectSearchIcon } from "@/components/ui/icons/select-search";
import { SelectTagCloseIcon } from "@/components/ui/icons/select-tag-close";
import { SelectCheckboxCheckedIcon } from "@/components/ui/icons/select-checkbox";
import { useFloatingDropdown } from "@/lib/use-floating-dropdown";
import { cn } from "@/lib/utils";

/**
 * Select — Energisa Design System (Figma: "Componetnes Formularios", node
 * 2676:4332 — Select / Field 2684:3249, Select / Trigger 2683:3241,
 * Select / Item 2683:3177, Select / Dropdown 2698:3572, Select / Multi
 * Value Tag 2684:2491, Select / Checkbox Item 2698:3398, Select / Filter
 * Chip 2698:3405, Select / Search 2684:2476, Select / Empty 2684:2479,
 * Select / Group Label 2684:2472, Select / Separator 2684:2474).
 *
 * O dropdown é posicionado via portal em `document.body`, usando o hook
 * compartilhado `useFloatingDropdown` (`src/lib/use-floating-dropdown.ts`)
 * — a mesma infraestrutura de floating layer do `Select` já usada pelo
 * `DropdownMenu` do Menu (getBoundingClientRect, clique fora, Escape,
 * reposicionamento em scroll/resize). Isso evita que o painel seja cortado
 * dentro de containers com `overflow-x-auto`/`overflow-hidden`. A largura
 * do painel acompanha a largura medida do trigger (`minWidth`); o visual
 * (fundo, borda, radius, sombra, padding) continua idêntico ao do Figma.
 *
 * `showValue` do Figma (usado só porque o Figma não deriva o booleano
 * inverso de MultiSelect) não existe na API React — é sempre derivado:
 * single-select mostra value/placeholder, multiSelect mostra as tags.
 */

export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  disabled?: boolean;
  /** Nome do grupo — quando qualquer opção tem `group`, o dropdown agrupa por esse valor (dados, não hardcoded). */
  group?: string;
}

export interface SelectFilterOption {
  value: string;
  label: string;
}

const sizeConfig: Record<SelectSize, { trigger: string; text: string; radius: string }> = {
  sm: { trigger: "px-3 py-2", text: "text-xs leading-4", radius: "rounded-[var(--radius-sm)]" },
  md: { trigger: "px-3 py-2.5", text: "text-sm leading-5", radius: "rounded-[var(--radius-sm)]" },
  lg: { trigger: "p-4", text: "text-sm leading-5", radius: "rounded-[var(--radius-md)]" },
};

/** Reserva de largura para o badge "+N" — medir dinamicamente exigiria uma segunda passada; este valor cobre até 2 dígitos com folga. */
const OVERFLOW_BADGE_RESERVED_WIDTH = 44;
const TAG_GAP = 6;

function flattenOptions(options: SelectOption[]): SelectOption[] {
  return options;
}

function groupOptions(options: SelectOption[]): { group: string | null; items: SelectOption[] }[] {
  const hasGroups = options.some((o) => o.group);
  if (!hasGroups) return [{ group: null, items: options }];
  const order: string[] = [];
  const map = new Map<string, SelectOption[]>();
  for (const option of options) {
    const key = option.group ?? "";
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)!.push(option);
  }
  return order.map((key) => ({ group: key || null, items: map.get(key)! }));
}

function matchesQuery(option: SelectOption, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return option.label.toLowerCase().includes(q) || (option.description?.toLowerCase().includes(q) ?? false);
}

interface SelectItemRowProps {
  option: SelectOption;
  selected: boolean;
  highlighted: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
}

function SelectItemRow({ option, selected, highlighted, onSelect, onMouseEnter }: SelectItemRowProps) {
  return (
    <div
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled || undefined}
      onClick={option.disabled ? undefined : onSelect}
      onMouseEnter={option.disabled ? undefined : onMouseEnter}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-[var(--radius-xs)] px-3 py-2",
        option.disabled
          ? "cursor-not-allowed opacity-50"
          : cn("cursor-pointer", (selected || highlighted) && "bg-[var(--color-surface-secondary)]")
      )}
    >
      {option.leftElement && <span className="flex size-6 shrink-0 items-center justify-center">{option.leftElement}</span>}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="w-full truncate text-sm text-[var(--color-text-primary)]">{option.label}</p>
        {option.description && (
          <p className="w-full truncate text-xs text-[var(--color-text-muted)]">{option.description}</p>
        )}
      </div>
      {option.rightElement && <span className="flex shrink-0 items-center">{option.rightElement}</span>}
      {selected && <SelectCheckIcon className="size-4 shrink-0 text-[var(--color-action-primary)]" />}
    </div>
  );
}

interface SelectCheckboxRowProps {
  option: SelectOption;
  checked: boolean;
  highlighted: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
}

function SelectCheckboxRow({ option, checked, highlighted, onToggle, onMouseEnter }: SelectCheckboxRowProps) {
  return (
    <div
      role="option"
      aria-selected={checked}
      aria-disabled={option.disabled || undefined}
      onClick={option.disabled ? undefined : onToggle}
      onMouseEnter={option.disabled ? undefined : onMouseEnter}
      className={cn(
        "flex w-full items-center gap-2 rounded-[var(--radius-xs)] px-3 py-2",
        option.disabled
          ? "cursor-not-allowed opacity-50"
          : cn("cursor-pointer", (checked || highlighted) && "bg-[var(--color-surface-secondary)]")
      )}
    >
      {checked ? (
        <SelectCheckboxCheckedIcon className="size-3.5 shrink-0" />
      ) : (
        <div className="size-3.5 shrink-0 rounded-[3px] border-[1.5px] border-[var(--color-border-default)]" />
      )}
      <p className="min-w-0 flex-1 truncate text-sm text-[var(--color-text-primary)]">{option.label}</p>
    </div>
  );
}

function SelectGroupLabel({ label }: { label: string }) {
  return (
    <div className="w-full px-3 pb-1 pt-2.5">
      <p className="w-full truncate text-[11px] font-semibold uppercase tracking-[0.6px] text-[var(--color-text-secondary)]">
        {label}
      </p>
    </div>
  );
}

function SelectSeparator() {
  return (
    <div className="w-full px-3 py-1">
      <div className="h-px w-full bg-[var(--color-border-default)]" />
    </div>
  );
}

function SelectEmptyState({ message }: { message: string }) {
  return (
    <div className="flex w-full items-start justify-center px-3 py-6">
      <p className="flex-1 text-center text-[13px] text-[var(--color-text-muted)]">{message}</p>
    </div>
  );
}

export interface SelectProps {
  options: SelectOption[];
  size?: SelectSize;
  label?: string;
  required?: boolean;
  helperText?: string;
  /** Presença ativa o estado de erro (borda/mensagem danger). */
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  multiSelect?: boolean;
  /** Single-select controlado. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Multi-select controlado. */
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  /** Chips de filtro acima da lista ("Internal Filter") — filtragem client-side pelos dados. */
  filters?: SelectFilterOption[];
  filterValue?: string;
  defaultFilterValue?: string;
  onFilterChange?: (value: string) => void;
  /** Estado inicial aberto — não-controlado (Storybook/regressão do state "Open"). */
  defaultOpen?: boolean;
  /** Foco real ao montar (Storybook/regressão do state "Focus"). */
  autoFocus?: boolean;
  /** Força visualmente o hover (Storybook/regressão do state "Hover" — não afeta interação real). */
  state?: "default" | "hover";
  className?: string;
  id?: string;
}

function Select({
  options,
  size = "md",
  label,
  required = false,
  helperText,
  errorMessage,
  placeholder = "Selecione uma opção",
  disabled = false,
  searchable = false,
  searchPlaceholder = "Pesquisar...",
  emptyMessage = "Nenhum resultado encontrado",
  multiSelect = false,
  value: controlledValue,
  defaultValue,
  onValueChange,
  values: controlledValues,
  defaultValues,
  onValuesChange,
  filters,
  filterValue: controlledFilterValue,
  defaultFilterValue,
  onFilterChange,
  defaultOpen = false,
  autoFocus = false,
  state = "default",
  className,
  id,
}: SelectProps) {
  const hasError = !!errorMessage;
  const config = sizeConfig[size];

  const [open, setOpen] = React.useState(defaultOpen);
  const [focused, setFocused] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [highlightedValue, setHighlightedValue] = React.useState<string | null>(null);

  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const value = controlledValue ?? internalValue;

  const [internalValues, setInternalValues] = React.useState<string[]>(defaultValues ?? []);
  const selectedValues = controlledValues ?? internalValues;

  const [internalFilterValue, setInternalFilterValue] = React.useState<string | undefined>(
    defaultFilterValue ?? filters?.[0]?.value
  );
  const activeFilterValue = controlledFilterValue ?? internalFilterValue;

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const tagRowRef = React.useRef<HTMLDivElement>(null);
  const tagRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());
  const [visibleTagCount, setVisibleTagCount] = React.useState(selectedValues.length);

  const filteredByChip = React.useMemo(() => {
    if (!filters || !activeFilterValue) return options;
    const allValue = filters[0]?.value;
    if (activeFilterValue === allValue) return options;
    return options.filter((o) => o.group === activeFilterValue);
  }, [options, filters, activeFilterValue]);

  const filteredOptions = React.useMemo(
    () => filteredByChip.filter((o) => matchesQuery(o, query)),
    [filteredByChip, query]
  );

  const flatFilteredOptions = React.useMemo(() => flattenOptions(filteredOptions), [filteredOptions]);
  const groupedFilteredOptions = React.useMemo(() => groupOptions(filteredOptions), [filteredOptions]);

  const selectedOption = React.useMemo(() => options.find((o) => o.value === value), [options, value]);
  const selectedTagOptions = React.useMemo(
    () => selectedValues.map((v) => options.find((o) => o.value === v)).filter((o): o is SelectOption => !!o),
    [selectedValues, options]
  );

  const close = React.useCallback(() => {
    setOpen(false);
    setQuery("");
    setHighlightedValue(null);
  }, []);

  const openDropdown = React.useCallback(() => {
    if (disabled) return;
    setOpen(true);
    const first = flatFilteredOptions.find((o) => !o.disabled);
    setHighlightedValue(first?.value ?? null);
  }, [disabled, flatFilteredOptions]);

  const toggleOpen = () => {
    if (disabled) return;
    if (open) close();
    else openDropdown();
  };

  const commitSingleValue = (next: string) => {
    if (controlledValue === undefined) setInternalValue(next);
    onValueChange?.(next);
    close();
  };

  const toggleMultiValue = (next: string) => {
    const isSelected = selectedValues.includes(next);
    const nextValues = isSelected ? selectedValues.filter((v) => v !== next) : [...selectedValues, next];
    if (controlledValues === undefined) setInternalValues(nextValues);
    onValuesChange?.(nextValues);
  };

  const removeTag = (removeValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextValues = selectedValues.filter((v) => v !== removeValue);
    if (controlledValues === undefined) setInternalValues(nextValues);
    onValuesChange?.(nextValues);
  };

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    if (multiSelect) toggleMultiValue(option.value);
    else commitSingleValue(option.value);
  };

  const handleFilterClick = (filterValueClicked: string) => {
    if (controlledFilterValue === undefined) setInternalFilterValue(filterValueClicked);
    onFilterChange?.(filterValueClicked);
  };

  // Posicionamento + clique fora + Escape + reposicionamento em scroll/resize — infraestrutura compartilhada com o DropdownMenu do Menu.
  const position = useFloatingDropdown({ open, onClose: close, triggerRef, panelRef });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    const enabled = flatFilteredOptions.filter((o) => !o.disabled);
    const currentIndex = enabled.findIndex((o) => o.value === highlightedValue);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = enabled[(currentIndex + 1 + enabled.length) % enabled.length];
      if (next) setHighlightedValue(next.value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = enabled[(currentIndex - 1 + enabled.length) % enabled.length];
      if (prev) setHighlightedValue(prev.value);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const highlighted = enabled.find((o) => o.value === highlightedValue);
      if (highlighted) handleSelect(highlighted);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  // Overflow "+N" dinâmico — mede as tags reais depois de renderizar todas, então corrige a contagem visível antes do paint.
  React.useLayoutEffect(() => {
    setVisibleTagCount(selectedValues.length);
  }, [selectedValues, size]);

  React.useLayoutEffect(() => {
    if (!multiSelect || !tagRowRef.current || selectedValues.length === 0) return;
    const availableWidth = tagRowRef.current.clientWidth;
    let used = 0;
    let count = 0;
    for (let i = 0; i < selectedValues.length; i++) {
      const el = tagRefs.current.get(selectedValues[i]);
      if (!el) break;
      const w = el.offsetWidth + (i > 0 ? TAG_GAP : 0);
      const remaining = selectedValues.length - (i + 1);
      const reserve = remaining > 0 ? OVERFLOW_BADGE_RESERVED_WIDTH + TAG_GAP : 0;
      if (used + w + reserve > availableWidth) break;
      used += w;
      count = i + 1;
    }
    setVisibleTagCount(Math.max(count, selectedValues.length > 0 ? 1 : 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues, size]);

  const overflowCount = selectedValues.length - visibleTagCount;
  const isFilled = multiSelect ? selectedValues.length > 0 : value !== undefined;
  const forceHover = state === "hover";
  const showActiveRing = open || focused;

  const triggerBorderClass = disabled
    ? "border-[var(--color-border-default)]"
    : hasError
      ? "border-[var(--color-danger-default)]"
      : showActiveRing
        ? "border-2 border-[var(--color-action-primary)]"
        : forceHover
          ? "border-[var(--color-border-strong)]"
          : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]";

  const reactId = React.useId();
  const triggerId = id ?? reactId;

  return (
    <div className={cn("flex w-full flex-col items-start gap-1", className)} onKeyDown={handleKeyDown}>
      {label && (
        <div className="flex w-full items-start gap-0.5 text-sm font-medium leading-5">
          <p className="text-[var(--color-text-primary)]">{label}</p>
          {required && <p className="text-[var(--color-danger-default)]">*</p>}
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleOpen}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "flex w-full items-center justify-between overflow-hidden border border-solid",
          config.trigger,
          config.radius,
          disabled ? "cursor-not-allowed bg-[var(--color-surface-secondary)] opacity-50" : "bg-[var(--color-surface-primary)]",
          triggerBorderClass
        )}
      >
        {multiSelect ? (
          selectedValues.length > 0 ? (
            <>
              <div ref={tagRowRef} className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
                {selectedTagOptions.slice(0, visibleTagCount).map((option) => (
                  <div
                    key={option.value}
                    ref={(el) => {
                      if (el) tagRefs.current.set(option.value, el);
                      else tagRefs.current.delete(option.value);
                    }}
                    className="flex shrink-0 items-center gap-1 rounded-[var(--radius-xs)] bg-[var(--color-surface-secondary)] py-1 pl-2 pr-1.5"
                  >
                    <p className="whitespace-nowrap text-xs font-medium text-[var(--color-text-primary)]">{option.label}</p>
                    <button
                      type="button"
                      aria-label={`Remover ${option.label}`}
                      onClick={(e) => removeTag(option.value, e)}
                      className="flex size-2.5 shrink-0 items-center justify-center text-[var(--color-text-secondary)]"
                    >
                      <SelectTagCloseIcon className="size-full" />
                    </button>
                  </div>
                ))}
              </div>
              {overflowCount > 0 && (
                <span className="shrink-0 whitespace-nowrap rounded-[var(--radius-xs)] bg-[var(--color-surface-secondary)] px-1.5 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
                  +{overflowCount}
                </span>
              )}
              {/* Medição oculta: renderiza todas as tags fora da tela para saber a largura real de cada uma antes de decidir o corte. */}
              <div className="pointer-events-none invisible absolute left-0 top-0 flex -translate-y-full gap-1.5" aria-hidden="true">
                {selectedTagOptions.map((option) => (
                  <div
                    key={option.value}
                    ref={(el) => {
                      if (el) tagRefs.current.set(option.value, el);
                    }}
                    className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-[var(--radius-xs)] py-1 pl-2 pr-1.5"
                  >
                    <p className="whitespace-nowrap text-xs font-medium">{option.label}</p>
                    <span className="flex size-2.5 shrink-0" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className={cn("flex-1 truncate text-left", config.text, "text-[var(--color-text-muted)]")}>{placeholder}</p>
          )
        ) : (
          <p
            className={cn(
              "flex-1 truncate text-left",
              config.text,
              isFilled ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
            )}
          >
            {selectedOption?.label ?? placeholder}
          </p>
        )}
        <span className="ml-2 flex size-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]">
          {open ? <SelectCaretUpIcon className="size-full" /> : <SelectCaretDownIcon className="size-full" />}
        </span>
      </button>

      {hasError ? (
        <p className="w-full text-xs text-[var(--color-danger-default)]">{errorMessage}</p>
      ) : (
        helperText && <p className="w-full text-xs text-[var(--color-text-secondary)]">{helperText}</p>
      )}

      {position &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            aria-multiselectable={multiSelect || undefined}
            style={{ position: "fixed", top: position.top, left: position.left, width: position.minWidth }}
            className="z-50 flex flex-col items-start rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-1 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
          {searchable && (
            <div className="flex w-full items-center gap-2 border-b border-[var(--color-border-default)] px-3 py-2.5">
              <SelectSearchIcon className="size-4 shrink-0 text-[var(--color-text-muted)]" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  const first = flatFilteredOptions.find((o) => !o.disabled);
                  setHighlightedValue(first?.value ?? null);
                }}
                placeholder={searchPlaceholder}
                autoFocus
                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
              />
            </div>
          )}

          {filters && filters.length > 0 && (
            <div className="flex w-full items-start gap-1.5 px-2 pb-2 pt-1.5">
              {filters.map((filter) => {
                const isActive = filter.value === activeFilterValue;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => handleFilterClick(filter.value)}
                    className={cn(
                      "shrink-0 whitespace-nowrap rounded-[var(--radius-xs)] px-2.5 py-1 text-xs font-medium",
                      isActive
                        ? "bg-[var(--color-action-primary)] text-[var(--color-icon-on-action)]"
                        : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]"
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex max-h-72 w-full flex-col items-start overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <SelectEmptyState message={emptyMessage} />
            ) : multiSelect ? (
              filteredOptions.map((option) => (
                <SelectCheckboxRow
                  key={option.value}
                  option={option}
                  checked={selectedValues.includes(option.value)}
                  highlighted={highlightedValue === option.value}
                  onToggle={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedValue(option.value)}
                />
              ))
            ) : (
              groupedFilteredOptions.map((group, i) => (
                <React.Fragment key={group.group ?? `ungrouped-${i}`}>
                  {i > 0 && <SelectSeparator />}
                  {group.group && <SelectGroupLabel label={group.group} />}
                  {group.items.map((option) => (
                    <SelectItemRow
                      key={option.value}
                      option={option}
                      selected={option.value === value}
                      highlighted={highlightedValue === option.value}
                      onSelect={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedValue(option.value)}
                    />
                  ))}
                </React.Fragment>
              ))
            )}
          </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export { Select };
