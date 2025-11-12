import type { Control, FieldValues, Path } from "react-hook-form";
import { ChevronDownIcon, X } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import Label from "./Label";

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  buttonClassname?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  disabledBefore?: Date;
  disabledAfter?: Date;
}

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Seleccionar fecha",
  description,
  className,
  buttonClassname,
  required = false,
  prefix,
  disabledBefore,
  disabledAfter,
}: DatePickerProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && <Label name={name} label={label} required={required} />}

          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <div className="relative">
                <PopoverTrigger asChild>
                  <Button
                    id={name}
                    type="button"
                    variant="outline"
                    className={`w-full justify-between font-normal ${buttonClassname}`}
                    aria-invalid={fieldState.invalid}
                    aria-haspopup="dialog"
                    aria-expanded={open}
                    aria-controls={`${name}-calendar`}
                    aria-describedby={`${name}-error`}
                    aria-label={
                      label
                        ? `Seleccionar ${label.toLowerCase()}`
                        : "Seleccionar fecha"
                    }
                  >
                    <div className="flex items-center">
                      {prefix && (
                        <span className="mr-2 text-muted-foreground">
                          {prefix}
                        </span>
                      )}

                      {field.value
                        ? format(field.value, "PPP", { locale: es })
                        : placeholder}
                    </div>
                    <ChevronDownIcon
                      className="text-muted-foreground"
                      aria-hidden="true"
                    />
                  </Button>
                </PopoverTrigger>

                {field.value && (
                  <Button
                    type="button"
                    variant="link"
                    className="absolute right-6 text-muted-foreground hover:text-muted-foreground"
                    onClick={() => field.onChange(undefined)}
                    aria-label="Clear date"
                  >
                    <X aria-hidden="true" />
                  </Button>
                )}
              </div>

              <PopoverContent
                id={`${name}-calendar`}
                className="w-auto p-0"
                align="start"
                role="dialog"
                aria-label="Selector de fecha"
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  autoFocus
                  disabled={(date) => {
                    const beforeLimit = disabledBefore
                      ? date < startOfDay(disabledBefore)
                      : false;

                    const afterLimit = disabledAfter
                      ? date > startOfDay(disabledAfter)
                      : false;

                    return beforeLimit || afterLimit;
                  }}
                  showOutsideDays={false}
                />
              </PopoverContent>
            </Popover>
          </FormControl>

          <FormMessage id={`${name}-error`} />
          {description && (
            <FormDescription id={`${name}-description`}>
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

export default DatePicker;
