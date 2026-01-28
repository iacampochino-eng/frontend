

// import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { AlertCircle, CheckCircle, Eye, EyeOff, X } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { useSession } from "@/context/useSession";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleClickTooltip = (e: any) => {
    e.preventDefault();
  };

  const { register: registerUser } = useSession();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError("");

    const { name, email, password } = data;

    const result = await registerUser(name, email, password);
    console.log("result");

    if (result.success) {
      toast(`Registro exitoso!`, {
        description: "Bienvenido a IAgro!",
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

      window.location.href = "/dashboard";
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

  console.log(error);

  return (
    <>
      <div className="p-8 rounded-2xl backdrop-blur-sm bg-black/50  w-screen md:w-[700px]">
        <div className="mb-8 text-center ">
          <h2 className="text-3xl font-bold mb-2 relative group">
            <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
            <span className="relative inline-block text-3xl font-bold mb-2 text-white">
              Registrarse
            </span>
            <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
          </h2>
          <div className="text-white/80 flex flex-col items-center space-y-1">
            <span className="relative group cursor-default">
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative inline-block animate-pulse">
                Registra tu cuenta y utiliza nuestra tecnología inteligente para
                llevar el control total de tu hacienda.
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
            <Label htmlFor="name" className="text-white">
              Nombre de usuario *
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleClickTooltip}>
                  <AlertCircle size={15} color="#f03300" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="dark:text-white text-white">
                    Este será tu nombre de usuario único y no podrás cambiarlo
                    por razones de seguridad, así que tómate un momento para
                    elegirlo con cuidado.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <Input
              className="bg-white text-black my-2 rounded-lg"
              type="text"
              {...register("name", {
                required: "El nombre es requerido",
                minLength: {
                  value: 2,
                  message:
                    "El nombre de usuario no puedo tener más de 20 caracteres",
                },
                maxLength: {
                  value: 20,
                  message:
                    "El nombre de usuario debe tener al menos 2 caracteres",
                },
              })}
              placeholder="Nombre de usuario"
            />
            <span className="text-red-300 text-sm mt-1">
              {errors.name && errors.name.message}
            </span>
          </div>
          <div>
            <Label htmlFor="email" className="py-1 text-white">
              Email *
            </Label>
            <Input
              className="bg-white text-black my-2 rounded-lg"
              type="email"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Ingresa un correo válido",
                },
              })}
              placeholder="harold@gmail.com"
            />
            <span className="text-red-300 text-sm mt-1">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div>
            <Label htmlFor="password" className="py-1 text-white">
              Contraseña *{" "}
            </Label>
            <div className="relative">
              <Input
                className="bg-white text-black my-2 rounded-lg"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                })}
                placeholder="********"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2  focus:outline-none transition-colors text-black"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <span className="text-red-300 text-sm mt-1">
              {errors.password && errors.password.message}
            </span>
          </div>

          <button
            type="submit"
            className={`cursor-pointer w-full py-3 rounded-lg mt-4 ${isLoading
                ? "animate-success"
                : "bg-purple-600 hover:bg-purple-700"
              }  text-white font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40`}
          >
            Registrarse
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <a
            href="#"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            ¿Necesitas ayuda?
          </a>
        </div>

        {/* <div className="mt-8">
          <div className="relative flex items-center justify-center w-full">
            <div className="border-t border-white/10 absolute w-full"></div>
            <div className="bg-transparent px-4 relative text-white/60 text-sm">
              Regístrate con Google
            </div>
          </div>

          <div className="mt-6 w-full flex justify-center gap-3">
            <Button
              className="w-full cursor-pointer flex items-center gap-4 py-6 relative dark:hover:bg-[rgba(240,52,0,1)]"
            >
              <div className="flex items-center gap-4">
                <img
                  src="/logos/google-logo.png"
                  height={25}
                  width={25}
                  alt="Logo de Google"
                />

                <p className="text-white font-bold text-sm">GOOGLE</p>
              </div>
            </Button>
          </div>
          {error && <span className="text-red-300 text-sm mt-1">{error}</span>}
        </div> */}
      </div>

      <Toaster />
    </>
  );
};
