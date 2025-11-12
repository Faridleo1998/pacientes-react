import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import type { PatientType } from "./types";
import type { PatientFormType } from "./schemas/patient";

interface StateType {
  patients: PatientType[];
  patientToEdit?: PatientType;
}

interface ActionType {
  addPatient: (patientForm: PatientFormType) => void;
  setPatientToEdit: (patient: PatientType["id"] | undefined) => void;
  updatePatient: (
    id: PatientType["id"],
    updatedPatient: PatientFormType
  ) => void;
  deletePatient: (id: PatientType["id"]) => void;
}

const createPatient = (patientForm: PatientFormType): PatientType => {
  return {
    id: crypto.randomUUID(),
    ...patientForm,
  };
};

export const usePatientStore = create<StateType & ActionType>()(
  devtools(
    persist(
      (set, get) => ({
        patients: [],

        addPatient: (patientForm) => {
          const newPatient = createPatient(patientForm);
          set({
            patients: [...get().patients, newPatient],
          });
        },

        setPatientToEdit: (id) => {
          set({
            patientToEdit: get().patients.find((patient) => patient.id === id),
          });
        },

        updatePatient: (id, updatedPatient) => {
          set({
            patients: get().patients.map((patient) =>
              patient.id === id
                ? { id: patient.id, ...updatedPatient }
                : patient
            ),
            patientToEdit: undefined,
          })
        },

        deletePatient: (id) => {
          set({
            patients: get().patients.filter((patient) => patient.id !== id),
            patientToEdit:
              get().patientToEdit?.id === id ? undefined : get().patientToEdit,
          });
        },
      }),
      {
        name: "patient-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
