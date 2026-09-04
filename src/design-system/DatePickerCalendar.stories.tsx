import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePickerCalendar } from "../components/ui/datepicker-calendar";

const meta: Meta<typeof DatePickerCalendar> = {
  title: "Components/DatePicker/Calendar",
  component: DatePickerCalendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof DatePickerCalendar>;

/** Mode="Single" (Figma node 3019:23683) — navegue entre meses, clique num dia pra selecionar. */
export const Single: Story = {
  render: () => {
    function Demo() {
      const [month, setMonth] = React.useState(new Date(2026, 8, 1));
      const [selected, setSelected] = React.useState<Date | undefined>(new Date(2026, 8, 15));
      return <DatePickerCalendar mode="single" month={month} onMonthChange={setMonth} selected={selected} onSelect={setSelected} />;
    }
    return <Demo />;
  },
};

/**
 * Mode="Range" — layout de grade não tem demo própria no Figma além dos
 * estados de CalendarDay (RangeStart/Middle/End já confirmados); primeiro
 * clique define o início, segundo define o fim.
 */
export const Range: Story = {
  render: () => {
    function Demo() {
      const [month, setMonth] = React.useState(new Date(2026, 8, 1));
      const [range, setRange] = React.useState<{ start: Date | undefined; end: Date | undefined }>({
        start: new Date(2026, 8, 10),
        end: new Date(2026, 8, 18),
      });
      return (
        <DatePickerCalendar
          mode="range"
          month={month}
          onMonthChange={setMonth}
          rangeStart={range.start}
          rangeEnd={range.end}
          onRangeChange={setRange}
        />
      );
    }
    return <Demo />;
  },
};

/** minDate/maxDate desabilitam dias fora do intervalo permitido. */
export const WithBoundaries: Story = {
  render: () => {
    function Demo() {
      const [month, setMonth] = React.useState(new Date(2026, 8, 1));
      const [selected, setSelected] = React.useState<Date | undefined>();
      return (
        <DatePickerCalendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={selected}
          onSelect={setSelected}
          minDate={new Date(2026, 8, 5)}
          maxDate={new Date(2026, 8, 25)}
        />
      );
    }
    return <Demo />;
  },
};
