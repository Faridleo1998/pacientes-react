interface PatientDetailEntryProps<T> {
  label: string;
  value: T;
  labelClassName?: string;
  valueClassName?: string;
}

const PatientDetailEntry = <T,>({
  label,
  value,
  labelClassName,
  valueClassName,
}: PatientDetailEntryProps<T>) => {
  return (
    <div>
      <strong className={labelClassName}>{label}:</strong>{" "}
      <span className={valueClassName}>{String(value)}</span>
    </div>
  );
};

export default PatientDetailEntry;
