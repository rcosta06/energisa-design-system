import * as React from "react";
import { X } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { PageHeading } from "@/components/ui/page-heading";
import { IconButton } from "@/components/ui/icon-button";
import { Select, type SelectOption } from "@/components/ui/select";
import { FilterChip } from "@/components/ui/filter-chip";
import { Button } from "@/components/ui/button";
import {
  levelConfig,
  priorityConfig,
  statusTone,
  type ComplaintLevel,
  type ComplaintPriority,
  type ComplaintStatus,
} from "@/components/ui/complaint-shared";

/**
 * ComplaintFilterDrawer — Energisa Design System (Figma: "Filtro
 * Atendimento", node 2676:3644, arquivo fPO7o9NBbeKsEgQF5T0zRz).
 *
 * Composição de domínio sobre o `Drawer` genérico — não usa o slot
 * `title`/`showClose` dele porque o header do Figma (bullet + divisor do
 * `PageHeading`, botão de fechar 44px) não é o header simples (h2 + X com
 * borda) que o `Drawer` oferece por padrão; aqui o header/close ficam no
 * `children`, e o `Drawer` só fornece overlay/painel/footer. Em compensação,
 * passa `ariaLabel`/`initialFocusRef` para o `Drawer` continuar responsável
 * pelo nome acessível do dialog e pelo foco inicial (nenhum focus trap ou
 * listener de teclado é reimplementado aqui).
 *
 * `side="right"` e `size="xl"` (600px, node "drawer" 2676:3967) — conferido
 * ao vivo via Figma MCP: o painel abre pela direita, não pela esquerda.
 * `contentClassName`/`footerClassName` ajustam o padding só desta instância
 * (`space-4`/`space-8` do Figma, 16px/32px) sem alterar o padding padrão
 * (`px-5 py-4`) de nenhuma outra instância do `Drawer`.
 *
 * "Procon - Linha Direta" aparece no Figma como um chip de Nível de
 * reclamação, mas não existe em `ComplaintLevel` (só N1/N2/N3/External) —
 * por decisão já validada, fica de fora deste filtro funcional em vez de
 * mapeado para outro nível ou virar um valor fake. Os chips de
 * Prioridade/Nível/Status são gerados a partir de `priorityConfig`/
 * `levelConfig`/`statusTone` (fonte única em `complaint-shared.ts`), não de
 * arrays duplicados — por isso a omissão do Procon é automática, não um
 * filtro manual esquecível.
 *
 * Empresa/Ordenação/Prioridade/Nível/Status/"Somente inconsistentes" filtram
 * de verdade os dados reais (`filterComplaints`/`sortComplaints` em
 * `complaint-shared.ts`, chamados pelo consumidor — este componente só
 * expõe os campos controlados). "Somente as minhas" continua só visual:
 * não há conceito de usuário logado no projeto que bata com
 * `responsibleText` (ver `ComplaintFilters` em `complaint-shared.ts` e
 * Introduction.mdx).
 */

export interface ComplaintFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyOptions: SelectOption[];
  company: string;
  onCompanyChange: (value: string) => void;
  sortOptions: SelectOption[];
  sort: string;
  onSortChange: (value: string) => void;
  onlyMine: boolean;
  onOnlyMineChange: (value: boolean) => void;
  onlyInconsistent: boolean;
  onOnlyInconsistentChange: (value: boolean) => void;
  selectedPriorities: ComplaintPriority[];
  onPrioritiesChange: (value: ComplaintPriority[]) => void;
  selectedLevels: ComplaintLevel[];
  onLevelsChange: (value: ComplaintLevel[]) => void;
  selectedStatuses: ComplaintStatus[];
  onStatusesChange: (value: ComplaintStatus[]) => void;
  onClear: () => void;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function FilterCheckboxRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  const id = React.useId();
  return (
    <label
      htmlFor={id}
      className="flex flex-1 items-center gap-2 rounded-[var(--radius-xs)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="size-3.5 rounded-[3px] border-[1.5px] border-[var(--color-border-default)] accent-[var(--color-action-primary)]"
      />
      {label}
    </label>
  );
}

function FilterSectionDivider() {
  return <div className="h-px w-full bg-[var(--color-border-default)]" />;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-sm font-medium text-[var(--color-text-primary)]">{title}</p>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  );
}

function ComplaintFilterDrawer({
  open,
  onOpenChange,
  companyOptions,
  company,
  onCompanyChange,
  sortOptions,
  sort,
  onSortChange,
  onlyMine,
  onOnlyMineChange,
  onlyInconsistent,
  onOnlyInconsistentChange,
  selectedPriorities,
  onPrioritiesChange,
  selectedLevels,
  onLevelsChange,
  selectedStatuses,
  onStatusesChange,
  onClear,
}: ComplaintFilterDrawerProps) {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const close = () => onOpenChange(false);

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      side="right"
      size="xl"
      showClose={false}
      ariaLabel="Filtrar por"
      initialFocusRef={closeButtonRef}
      contentClassName="px-4 py-8"
      footerClassName="px-4 pb-8 pt-4"
      footer={
        <div className="flex w-full justify-end">
          <Button variant="secondary" size="sm" onClick={onClear}>
            Limpar Filtro
          </Button>
        </div>
      }
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center gap-4">
          <PageHeading text="Filtrar por" className="flex-1" />
          <IconButton ref={closeButtonRef} icon={<X className="size-6" />} onClick={close} tooltip="Fechar" />
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center gap-4">
            <Select
              className="w-[280px] shrink-0"
              options={companyOptions}
              value={company}
              onValueChange={onCompanyChange}
              label="Empresa"
              placeholder="Selecione uma empresa"
            />
            <Select
              className="min-w-0 flex-1"
              options={sortOptions}
              value={sort}
              onValueChange={onSortChange}
              label="Ordenação"
              placeholder="Selecione uma opção"
            />
          </div>
          <div className="flex w-full items-center gap-4">
            <FilterCheckboxRow label="Somente as minhas" checked={onlyMine} onCheckedChange={onOnlyMineChange} />
            <FilterCheckboxRow
              label="Somente inconsistentes"
              checked={onlyInconsistent}
              onCheckedChange={onOnlyInconsistentChange}
            />
          </div>
        </div>

        <FilterSectionDivider />

        <FilterSection title="Prioridade">
          {(Object.keys(priorityConfig) as ComplaintPriority[]).map((priority) => (
            <FilterChip
              key={priority}
              label={priorityConfig[priority].label}
              selected={selectedPriorities.includes(priority)}
              onClick={() => onPrioritiesChange(toggle(selectedPriorities, priority))}
            />
          ))}
        </FilterSection>

        <FilterSectionDivider />

        <FilterSection title="Nível de reclamação">
          {(Object.keys(levelConfig) as ComplaintLevel[]).map((level) => (
            <FilterChip
              key={level}
              label={levelConfig[level].label}
              selected={selectedLevels.includes(level)}
              onClick={() => onLevelsChange(toggle(selectedLevels, level))}
            />
          ))}
        </FilterSection>

        <FilterSectionDivider />

        <FilterSection title="Status">
          {(Object.keys(statusTone) as ComplaintStatus[]).map((status) => (
            <FilterChip
              key={status}
              label={status}
              selected={selectedStatuses.includes(status)}
              onClick={() => onStatusesChange(toggle(selectedStatuses, status))}
            />
          ))}
        </FilterSection>
      </div>
    </Drawer>
  );
}

export { ComplaintFilterDrawer };
