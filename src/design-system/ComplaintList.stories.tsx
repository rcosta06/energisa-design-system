import type { Meta, StoryObj } from "@storybook/react";
import { ComplaintListHeader, ComplaintListRow } from "../components/ui/complaint-list";

const meta: Meta = {
  title: "Components/ComplaintList",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const rows = [
  {
    idText: "4821",
    numberText: "SIATT-2026-004821",
    companyText: "Energisa Acre",
    level: "N1" as const,
    typologyText: "Pagamento / Inadimplência",
    typologySub: "Religação não realizada",
    status: "Em Tratativa" as const,
    priority: "high" as const,
    responsibleText: "Ana Ribeiro",
    responsibleInitials: "AR",
    openDateText: "12/08/2026",
    slaText: "vence hoje",
  },
  {
    idText: "4822",
    numberText: "SIATT-2026-004822",
    companyText: "Energisa MT",
    level: "N2" as const,
    typologyText: "Medição / Leitura",
    typologySub: "Consumo divergente",
    status: "Em Subsídio" as const,
    priority: "medium" as const,
    responsibleText: "Carlos Souza",
    responsibleInitials: "CS",
    openDateText: "10/08/2026",
    slaText: "2 dias restantes",
  },
  {
    idText: "4823",
    numberText: "SIATT-2026-004823",
    companyText: "Energisa RO",
    level: "N3" as const,
    typologyText: "Rede / Interrupção",
    typologySub: "Falta de energia prolongada",
    status: "Análise de Causa" as const,
    priority: "low" as const,
    responsibleText: "Bruna Lima",
    responsibleInitials: "BL",
    openDateText: "09/08/2026",
    slaText: "5 dias restantes",
  },
  {
    idText: "4824",
    numberText: "SIATT-2026-004824",
    companyText: "Energisa Acre",
    level: "External" as const,
    typologyText: "Atendimento / SAC",
    typologySub: "Reclamação Consumidor.gov",
    status: "Finalizado" as const,
    priority: "low" as const,
    responsibleText: "Ana Ribeiro",
    responsibleInitials: "AR",
    openDateText: "01/08/2026",
    slaText: "concluído",
  },
];

/** Tabela completa — header + linhas, uma por nível/status. Ocupa 100% da largura disponível (coluna Tipologia é flexível). */
export const Table: Story = {
  render: () => (
    <div className="overflow-x-auto">
      <div className="flex min-w-fit flex-col">
        <ComplaintListHeader />
        {rows.map((row) => (
          <ComplaintListRow key={row.idText} {...row} />
        ))}
      </div>
    </div>
  ),
};

/** Linha isolada em hover forçado. */
export const RowHover: Story = {
  render: () => (
    <div className="flex min-w-fit flex-col">
      <ComplaintListHeader />
      <ComplaintListRow {...rows[0]} state="hover" />
    </div>
  ),
};
