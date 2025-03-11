import { addDays, format } from "date-fns";
    import { DateRange } from "react-day-picker";

    import { Button } from "@/components/ui/button";
    import { Calendar } from "@/components/ui/calendar";
    import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
    import { cn } from "@/lib/utils";
    import { CalendarIcon } from "lucide-react";

    interface DatePickerWithRangeProps {
      date?: Date;
      setDate: (date: Date | undefined) => void;
    }

    export function DatePickerWithRange({
      date,
      setDate
    }: DatePickerWithRangeProps) {

      return (
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          //initialFocus
        />
      )
    }
