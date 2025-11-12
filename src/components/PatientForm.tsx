import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePatientStore } from "@/store";

import { Form } from "./ui/form";
import Input from "./form/Input";
import DatePicker from "./form/DatePicker";
import Textarea from "./form/Textarea";
import { Calendar, Mail, User, UserStar } from "lucide-react";

import {
  formSchema,
  type PatientFormType,
  formDefaultValues,
  mapPatientToFormValues,
} from "../schemas/patient";
import Button from "./Button";
import { toast } from "sonner";
import { useEffect } from "react";

const PatientForm = () => {
  const addPatient = usePatientStore((state) => state.addPatient);
  const patientToEdit = usePatientStore((state) => state.patientToEdit);
  const setPatientToEdit = usePatientStore((state) => state.setPatientToEdit);
  const updatePatient = usePatientStore((state) => state.updatePatient);

  const form = useForm<PatientFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  useEffect(() => {
    form.reset(
      patientToEdit ? mapPatientToFormValues(patientToEdit) : formDefaultValues
    );
  }, [patientToEdit, form]);

  const onSubmit = async (data: PatientFormType) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    if (patientToEdit) {
      updatePatient(patientToEdit.id, data);
      toast.success("Paciente actualizado correctamente");
    } else {
      addPatient(data);
      toast.success("Paciente agregado correctamente");
    }

    form.reset();
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="mb-2 md:mb-8 font-black text-xl md:text-2xl text-center">
        Formulario del Paciente
      </h2>

      <Form {...form}>
        <form
          id="patient-form"
          className="bg-white shadow-md rounded-lg py-6 px-5 space-y-6"
          noValidate
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Input
            control={form.control}
            name="name"
            label="Nombre"
            required
            prefix={<User />}
            autoFocus
          />

          <Input
            control={form.control}
            name="caretaker"
            label="Cuidador"
            required
            prefix={<UserStar />}
          />

          <Input
            control={form.control}
            name="email"
            label="Correo Electrónico"
            required
            prefix={<Mail />}
          />

          <DatePicker
            control={form.control}
            name="date"
            label="Fecha"
            required
            prefix={<Calendar />}
            disabledAfter={new Date()}
          />

          <Textarea
            control={form.control}
            name="symptoms"
            label="Síntomas"
            required
            inputClassname="resize-none"
          />

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full"
              form="patient-form"
              loading={form.formState.isSubmitting}
            >
              {patientToEdit ? "Guardar Cambios" : "Agregar Paciente"}
            </Button>
            {patientToEdit && (
              <Button
                type="button"
                className="w-full"
                variant="destructive"
                onClick={() => setPatientToEdit(undefined)}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PatientForm;
