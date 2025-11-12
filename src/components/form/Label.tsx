import { FormLabel } from "../ui/form";

interface LabelProps {
  name: string;
  label?: string;
  required?: boolean;
}

const Label = ({ name, label, required }: LabelProps) => {
  return (
    <FormLabel htmlFor={name} className={`${label && "cursor-pointer"}`}>
      {label} {required && <span className="text-red-600">*</span>}
    </FormLabel>
  );
};

export default Label;
