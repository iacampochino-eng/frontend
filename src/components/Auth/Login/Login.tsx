
import React, { useState, useRef, useEffect } from "react";
import { CheckCircle, Eye, EyeOff, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Register } from "../Register/Register";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { useSession } from "@/context/useSession";

// VideoBackground Component
const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />
      <video
        ref={videoRef}
        className="absolute inset-0 min-w-full min-h-full object-cover w-auto h-auto"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src={
            "https://res.cloudinary.com/dvrc38ei4/video/upload/v1748311104/unwatermark_198323_Countryside_Sheep_Herd_Grazing_By_Timelab_Pro_Artlist_HD_shxvhj.mp4"
          }
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { login } = useSession();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);

      // Si llegó acá, login fue exitoso
      toast(`Ingreso exitoso!`, {
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
      // window.location.href = "/dashboard";
    } catch (error: any) {
      toast("Error al iniciar sesión", {
        description: "El email o la contraseña ingresados son incorrectos.",
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-full  ">
        <div className="w-full flex justify-center mt-9"></div>
      </div>
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2 bg-transparent mb-2 space-x-2">
          {/* <TabsTrigger
            className="py-3  border border-black/50  text-sm bg-transparent"
            value="login"
          >
            LOGIN
          </TabsTrigger> */}
          {/* <TabsTrigger
            className="py-3  border text-sm border-black/50 bg-transparent"
            value="registrarse"
          >
            REGISTRARSE
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="login">
          <div className="p-8 rounded-2xl backdrop-blur-sm bg-black/50  w-screen md:w-[700px]">
            <div className="mb-8 text-center ">
              <h2 className="text-3xl font-bold mb-2 relative group">
                <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
                <span className="relative inline-block text-3xl font-bold mb-2 text-white">
                  Ingresar
                </span>
                <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </h2>
              <div className="text-white/80 flex flex-col items-center space-y-1">
                <span className="relative group cursor-default">
                  <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative inline-block animate-pulse">
                    Accede con tu cuenta y utiliza nuestra tecnología
                    inteligente para llevar el control total de tu hacienda.
                  </span>
                </span>
                <span className="text-base text-white/50 animate-pulse">
                  Por favor ingresa con tu usuario registrado.
                </span>
                <div className="flex space-x-2 text-xl text-white/40">
                  <span className="animate-pulse">🐄</span>
                  <span className="animate-pulse">🐑</span>
                  <span className="animate-pulse">🧑‍🌾</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <Label htmlFor="email" className="text-white py-1">
                Nombre de usuario *
              </Label>

              <Input
                className="bg-white text-black my-2 rounded-lg"
                type="email"
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Ingresa una dirección de correo válida",
                  },
                })}
                name="email"
                placeholder="Introduce tu correo electrónico"
              />
              <Label htmlFor="password" className="text-white py-1">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  className="bg-white text-black my-2 rounded-lg"
                  {...register("password", {
                    required: "Contraseña es requerida",
                    minLength: {
                      value: 3,
                      message: "La contraseña debe tener al menos 3 caracteres",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2  focus:outline-none transition-colors text-black bg-white"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <div className="flex items-center justify-center py-3">
                {/* <a
                  href="#"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a> */}
              </div>
              <button
                type="submit"
                // disabled={isSubmitting}
                className={`cursor-pointer w-full py-3 rounded-lg ${isSubmitting
                    ? "animate-success"
                    : "bg-purple-600 hover:bg-purple-700"
                  }  text-white font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40`}
              >
                {isSubmitting ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            {/* <div className="mt-8">
              <div className="relative flex items-center justify-center w-full ">
                <div className="border-t border-white/10 absolute w-full"></div>
                <div className="bg-transparent px-4 relative text-white/60 text-sm">
                  Accede o registrate con Google
                </div>
              </div>
              <div className="mt-6 w-full flex justify-center gap-3">
                <Button
                  className="w-full cursor-pointer flex items-center gap-4  py-6 relative  hover:bg-[rgba(240, 52, 0, 1)] mb-2"
                >
                  <div className=" font-bold flex items-center gap-4 py-6  ">
                    <div className=" ">
                      <img
                        src="/logos/google-logo.png"
                        height="25"
                        width="25"
                        alt="imagen de google"
                      />
                    </div>
                    <p className=" font-bold  mr-[9px] text-sm ">GOOGLE</p>
                  </div>
                </Button>
              </div>
            </div> */}
          </div>
        </TabsContent>
        <TabsContent value="registrarse">
          <Register />
        </TabsContent>
      </Tabs>

      <Toaster />
    </div>
  );
};

// Export as default components
const LoginPage = {
  LoginForm,
  VideoBackground,
};

export default LoginPage;
