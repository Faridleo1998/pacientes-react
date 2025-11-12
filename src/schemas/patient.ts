import type { PatientType } from "@/types";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(20, { message: "El nombre no debe exceder los 20 caracteres." }),
  caretaker: z
    .string()
    .trim()
    .min(3, {
      message: "El nombre del cuidador debe tener al menos 3 caracteres.",
    })
    .max(20, {
      message: "El nombre del cuidador no debe exceder los 20 caracteres.",
    }),
  email: z.email({ message: "Correo electrónico inválido." }).trim(),
  date: z
    .date({
      error: (issue) =>
        issue.input === undefined
          ? "La fecha es obligatoria."
          : "Fecha inválida.",
    })
    .max(new Date(), { message: "La fecha no puede ser en el futuro." }),
  symptoms: z
    .string()
    .trim()
    .min(10, { message: "Los síntomas deben tener al menos 10 caracteres." }),
});

type PatientFormType = z.infer<typeof formSchema>;

const formDefaultValues = {
  name: "",
  caretaker: "",
  email: "",
  date: undefined,
  symptoms: "",
};

const mapPatientToFormValues = (patient: PatientType): PatientFormType => ({
  name: patient.name,
  caretaker: patient.caretaker,
  email: patient.email,
  date: new Date(patient.date),
  symptoms: patient.symptoms,
});

export {
  formSchema,
  type PatientFormType,
  formDefaultValues,
  mapPatientToFormValues,
};
