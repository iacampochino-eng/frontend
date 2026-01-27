

import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/context/useSession";
import MainLayout from "@/components/Layout/MainLayout";

interface FormData {
  nombre: string;
  ubicacion: string;
  userId: number;
}

const crearEstancia = async (
  nombre: string,
  ubicacion: string,
  user_id: number
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/crear_estancia`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, ubicacion, user_id }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.detail || "Error al crear estancia",
      };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message || "Error inesperado" };
  }
};

const CrearEstancia = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError("");

    const { nombre, ubicacion } = data;

    const userId = Number(user?.id); // o donde sea que estés guardando el ID del usuario actual

    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      setIsLoading(false);
      return;
    }

    const result = await crearEstancia(nombre, ubicacion, userId);

    if (result.success) {
      toast(`Estancia creada con exito!`, {
        description: "Su estancia ha sido creada con exito",
        className:
          "flex items-center justify-between bg-[#F3F4F6] text-black p-4",
        action: (
          <button
            className="flex items-center justify-center text-white rounded-full"
            style={{ marginLeft: "10px" }}
            onClick={() => toast.dismiss()}
          >
            <CheckCircle className="text-green-500 mr-2 " />
          </button>
        ),
      });
      reset(); // Limpia los campos

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      toast("Datos incorrectos", {
        description: result.message || "Error al registrarse.",
        className:
          "flex items-start justify-between bg-gray-100 text-black p-4 rounded-lg shadow-md border border-gray-300",
        action: (
          <button
            className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
            onClick={() => toast.dismiss()}
            aria-label="Cerrar notificación"
          >
            <X className="w-5 h-5" />
          </button>
        ),
      });

      setError(result.message || "Ocurrió un error inesperado");
    }

    setIsLoading(false);
  };

  return (
    <>
      <MainLayout>
        <div className="p-8 rounded-2xl backdrop-blur-sm bg-black/50  w-screen md:w-[700px] mx-auto mt-20">
          <div className="mb-8 text-center ">
            <h2 className="text-3xl font-bold mb-2 relative group">
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
              <span className="relative inline-block text-3xl font-bold mb-2 text-white">
                Crear nueva estancia
              </span>
              <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </h2>
            <div className="text-white/80 flex flex-col items-center space-y-1">
              <span className="relative group cursor-default">
                <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative inline-block animate-pulse">
                  Ingresá los datos básicos de tu establecimiento ganadero. Esto
                  nos permitirá organizar mejor la información de tus animales y
                  facilitar su seguimiento mediante inteligencia artificial.
                </span>
              </span>
              <span className="text-base text-white/50 animate-pulse">
                Por favor complete el formulario.
              </span>
              <div className="flex space-x-2 text-xl text-white/40">
                <span className="animate-pulse">🐄</span>
                <span className="animate-pulse">🐑</span>
                <span className="animate-pulse">🧑‍🌾</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 items-center">
              <Label htmlFor="nombre" className="text-white">
                Nombre de la estancia <span className="text-secondary">*</span>
              </Label>
            </div>
            <div>
              <Input
                id="nombre"
                className="bg-white text-black my-2 rounded-lg"
                type="text"
                {...register("nombre", {
                  required: "El nombre es de la estancia es requerido",
                })}
                placeholder="Nombre de la estancia"
              />
              <span className="text-red-300 text-sm mt-1">
                {errors.nombre && errors.nombre.message}
              </span>
            </div>
            <div>
              <Label htmlFor="ubicacion" className="py-1 text-white">
                Ubicacion de la estancia *
              </Label>
              <Input
                id="ubicacion"
                className="bg-white text-black my-2 rounded-lg"
                type="text"
                {...register("ubicacion", {
                  required: "La ubicación es requerida",
                })}
                placeholder="Ubicación de la estancia"
              />
              <span className="text-red-300 text-sm mt-1">
                {errors.ubicacion && errors.ubicacion.message}
              </span>
            </div>

            <button
              type="submit"
              className={`cursor-pointer w-full py-3 rounded-lg mt-4 ${
                isLoading
                  ? "animate-success"
                  : "bg-purple-600 hover:bg-purple-700"
              }  text-white font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40`}
            >
              Crear estancia
            </button>
          </form>

          <div className="mt-8">
            {error && (
              <span className="text-red-300 text-sm mt-1">{error}</span>
            )}
          </div>
        </div>

        <Toaster />
      </MainLayout>
    </>
  );
};

export default CrearEstancia;
