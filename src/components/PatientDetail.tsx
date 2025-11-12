import { useState } from "react";
import type { PatientType } from "@/types";
import { usePatientStore } from "@/store";

import Button from "./Button";
import { Edit, Trash } from "lucide-react";
import PatientDetailEntry from "./PatientDetailEntry";
import { toast } from "sonner";

interface PatientDetailProps {
  patient: PatientType;
}

const PatientDetail = ({ patient }: PatientDetailProps) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const setPatientToEdit = usePatientStore((state) => state.setPatientToEdit);
  const deletePatient = usePatientStore((state) => state.deletePatient);

  return (
    <div className="bg-white shadow-md rounded-lg py-4 px-5 flex justify-between">
      <div>
        <PatientDetailEntry
          label="Nombre"
          value={patient.name}
          valueClassName="capitalize"
        />

        <PatientDetailEntry
          label="Cuidador"
          value={patient.caretaker}
          valueClassName="capitalize"
        />

        <PatientDetailEntry label="Email" value={patient.email} />

        <PatientDetailEntry
          label="Fecha"
          value={new Date(patient.date).toLocaleDateString()}
        />

        <PatientDetailEntry label="Síntomas" value={patient.symptoms} />
      </div>

      <div className="grid">
        <Button
          icon={<Edit />}
          onClick={() => setPatientToEdit(patient.id)}
        >
          Editar
        </Button>
        <Button
          icon={<Trash />}
          loading={loadingDelete}
          variant="destructive"
          onClick={async () => {
            setLoadingDelete(true);
            await new Promise((resolve) => setTimeout(resolve, 500));
            deletePatient(patient.id);
            toast.success("Paciente eliminado correctamente");
          }}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default PatientDetail;
