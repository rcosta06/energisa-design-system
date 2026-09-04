import type { Meta, StoryObj } from "@storybook/react";
import { DatePickerCalendarDay } from "../components/ui/datepicker-calendar-day";

// `!dev` (não `autodocs`): peça interna do composto `DatePicker` — quem
// consome o DS só vê `DatePicker` na sidebar. `!dev` remove a entrada da
// navegação principal sem apagar a story: continua indexada, acessível por
// URL direta e disponível pro build/test-runner, só não aparece na árvore
// do modo dev. Ver DatePicker.stories.tsx.
const meta: Meta<typeof DatePickerCalendarDay> = {
  title: "Components/DatePickerCalendarDay",
  component: DatePickerCalendarDay,
  tags: ["!dev"],
  parameters: { layout: "centered" },
  argTypes: {
    day: { control: "text" },
    variant: {
      control: "select",
      options: ["default", "today", "selected", "todaySelected", "rangeStart", "rangeMiddle", "rangeEnd", "outsideMonth", "disabled"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerCalendarDay>;

/** Interativo — hover é real (`:hover` nativo), não simulado. */
export const Default: Story = {
  args: { day: 15, variant: "default" },
};

/** Os 10 estados do Figma (node 3019:23675, DatePicker/CalendarDay). */
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-3">
      {(
        [
          ["default", "Default"],
          ["today", "Today"],
          ["selected", "Selected"],
          ["todaySelected", "Today + Selected"],
          ["disabled", "Disabled"],
          ["outsideMonth", "OutsideMonth"],
          ["rangeStart", "RangeStart"],
          ["rangeMiddle", "RangeMiddle"],
          ["rangeEnd", "RangeEnd"],
        ] as const
      ).map(([variant, name]) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <DatePickerCalendarDay day={15} variant={variant} />
          <span className="text-xs text-[var(--color-text-secondary)]">{name}</span>
        </div>
      ))}
    </div>
  ),
};

/** Sequência RangeStart → RangeMiddle → RangeEnd, como aparecem lado a lado numa semana selecionada. */
export const RangeSequence: Story = {
  render: () => (
    <div className="flex">
      <DatePickerCalendarDay day={10} variant="rangeStart" />
      <DatePickerCalendarDay day={11} variant="rangeMiddle" />
      <DatePickerCalendarDay day={12} variant="rangeMiddle" />
      <DatePickerCalendarDay day={13} variant="rangeEnd" />
    </div>
  ),
};
