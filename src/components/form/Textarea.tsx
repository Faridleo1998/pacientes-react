import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea as TextareaShadcn } from "@/components/ui/textarea";
import Label from "./Label";

interface TextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  inputClassname?: string;
  required?: boolean;
}

const Textarea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  className,
  inputClassname,
  required = false,
}: TextareaProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && <Label name={name} label={label} required={required} />}
          <FormControl>
            <TextareaShadcn
              className={inputClassname}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              {...field}
            />
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export default Textarea;
