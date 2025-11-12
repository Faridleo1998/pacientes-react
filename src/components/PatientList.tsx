import { usePatientStore } from "@/store";
import PatientDetail from "./PatientDetail";

const PatientList = () => {
  const patients = usePatientStore((state) => state.patients);

  return (
    <div className="flex-1 max-h-screen overflow-hidden">
      {patients.length === 0 ? (
        <>
          <h2 className="mb-2 md:mb-8 font-black text-xl md:text-2xl text-center">
            No hay pacientes registrados
          </h2>
          <p className="text-center text-gray-500">
            Agrega pacientes para que aparezcan en la lista
          </p>
        </>
      ) : (
        <div className="space-y-4 max-h-[80dvh] overflow-y-auto px-5 pb-5">
          {patients.map((patient) => (
            <PatientDetail key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
