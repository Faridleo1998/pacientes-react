import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";

function App() {
  return (
    <div className="container mx-auto">
      <h1 className="my-6 font-black text-2xl md:text-4xl text-center md:w-2/3 md:mx-auto">
        Seguimiento de pacientes{" "}
        <span className="text-indigo-700">Veterinaria</span>
      </h1>

      <div className="md:flex">
        <PatientForm />
        <PatientList />
      </div>
    </div>
  );
}

export default App;
