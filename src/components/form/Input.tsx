import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import Label from "./Label";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  description?: string;
  className?: string;
  inputClassname?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  autoFocus?: boolean;
}

const Input = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  description,
  className,
  inputClassname,
  required = false,
  prefix,
  autoFocus = false,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={className}>
            {label && <Label name={name} label={label} required={required} />}
            <FormControl>
              <InputGroup>
                {prefix && <InputGroupAddon>{prefix}</InputGroupAddon>}
                <InputGroupInput
                  id={name}
                  className={inputClassname}
                  type={type}
                  placeholder={placeholder}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={`${name}-error`}
                  autoFocus={autoFocus}
                  {...field}
                />
              </InputGroup>
            </FormControl>
            <FormMessage id={`${name}-error`} />
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
};

export default Input;
