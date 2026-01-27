

import type React from "react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/Layout/MainLayout";
import { useSession } from "@/context/useSession";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Estancia } from "@/interfaces/estancia";
import { Toaster, toast } from "sonner";
import { IDataYolo } from "@/interfaces/info-video";
import { renderStepIndicator } from "@/components/FormUploadVideo/RenderStepIndicator";
import {
  estimarSegundosDeProcesamiento,
  estimarTiempoProcesamiento,
} from "@/components/FormUploadVideo/EstimarTiempoProcesamiento";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { AnimationCircleProgress } from "@/components/CircleProgress/AnimationCircleProgress";

export default function UploadVideoWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSession();
  const [estancias, setEstancias] = useState<Estancia[]>([]);
  const [estanciaSeleccionada, setEstanciaSeleccionada] = useState<
    number | null
  >(null);
  const [data, setData] = useState<IDataYolo | null>(null);
  const [tiempoEstimadoTexto, setTiempoEstimadoTexto] = useState<string | null>(
    null
  );
  const [segundosDeProcesamiento, setSegundosDeProcesamiento] =
    useState<number>();
  const [videoName, setVideoName] = useState<string>("");

  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setData(null);
      setTiempoEstimadoTexto(null);

      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.onloadedmetadata = () => {
        window.URL.revokeObjectURL(videoElement.src);
        const duracion = videoElement.duration;
        const texto = estimarTiempoProcesamiento(duracion);
        const segundos = estimarSegundosDeProcesamiento(duracion);
        setSegundosDeProcesamiento(segundos);
        setTiempoEstimadoTexto(texto);
      };
      videoElement.src = URL.createObjectURL(file);
    }
  };

  // aszdasd

  const handleSubmit = async () => {
    if (!videoFile) return alert("Seleccioná un video primero.");
    if (!estanciaSeleccionada) return alert("Seleccioná una estancia.");

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("video_name", videoName || videoFile.name);
    formData.append("estancia_id", estanciaSeleccionada.toString());

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_FRONTEND_URL}/yolo/procesar-video/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Error al procesar el video");

      const data = await res.json();
      const taskId = data.task_id;
      //console.log(taskId, "taskId");
      // Empezá a hacer polling con el taskId
      checkVideoStatus(taskId);
      setData(data);
      setError(null);
    } catch (error) {
      console.error("❌ Error al procesar o guardar video:", error);
      setError("Ocurrió un error al procesar o guardar el video.");
    }
  };

  const checkVideoStatus = async (taskId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_FRONTEND_URL}/yolo/estado-tarea/${taskId}`
      );
      const data = await res.json();

      if (data.state === "PROGRESS") {
        setLoading(true); // Mantener el loading encendido
        setTimeout(() => checkVideoStatus(taskId), 2000); // Seguimos haciendo polling
      }

      else if (data.state === "SUCCESS" && data.result?.video_url) {
        setVideoUrl(data.result.video_url); // Mostralo en un <video />
        setData(data.result);
        setCurrentStep(3); // o el paso que corresponda
        setLoading(false); // Ya terminó
      } else if (data.state === "FAILURE") {
        setError("Error al procesar el video");
        setLoading(false);
      } else {
        // Si todavía está en progreso, esperamos y volvemos a intentar
        setTimeout(() => checkVideoStatus(taskId), 2000);
      }
    } catch (error) {
      console.error("❌ Error al consultar estado:", error);
      setError("Error al consultar el estado del video.");
      setLoading(false);
    }
  };

  async function eliminarVideo(video_id: number) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/yolo/eliminar-video/${video_id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setCurrentStep(1);
        setVideoFile(null);
        setData(null);
        setEstanciaSeleccionada(null);
        setError(null);
        setVideoName("");
        setTiempoEstimadoTexto(null);
        toast.success("Video eliminado correctamente");
      } else {
        alert("error al eliminar el video");
        throw new Error(data.error || "Error al eliminar el video");
      }
    } catch (error) {
      console.error("Error eliminando video:", error);
      alert("No se pudo eliminar el video");

    }
  }

  const canProceedToStep2 = estanciaSeleccionada !== null;
  const selectedEstancia = estancias.find((e) => e.id === estanciaSeleccionada);

  useEffect(() => {
    const obtenerEstancias = async () => {
      if (!user?.id) return;
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/info_estancia/${user.id}`
      );

      if (!res.ok) {
        console.error('Error fetching estancias:', res.status, res.statusText);
        return;
      }

      const data = await res.json();
      setEstancias(data);
      console.log(data);

    };

    obtenerEstancias();
  }, [user]);
  // console.log("segundosDeProcesamiento", segundosDeProcesamiento);
  // console.log(data, "data");

  const renderStep1 = () => (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
      <CardHeader>
        <CardTitle className="text-2xl">Paso 1: Seleccionar Estancia</CardTitle>
        <p className="text-gray-500">
          Elige la estancia donde se realizó el video que vas a analizar
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {estancias.length > 0 ? (
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-400">
              Estancias disponibles:
            </label>
            <div className="grid gap-3 mt-4">
              {estancias.map((estancia) => (
                <div
                  key={estancia.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${estanciaSeleccionada === estancia.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                  onClick={() => setEstanciaSeleccionada(estancia.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{estancia.nombre}</span>
                    {estanciaSeleccionada === estancia.id && (
                      <Badge variant="default">Seleccionada</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              No tienes estancias registradas
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Crear Nueva Estancia
            </Button>
          </div>
        )}

        {estancias.length > 0 && (
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" disabled>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!canProceedToStep2}
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
      <CardHeader>
        <CardTitle className="text-2xl">Paso 2: Subir Video</CardTitle>
        <p className="text-gray-400">
          Estancia seleccionada:{" "}
          <Badge variant="secondary">{selectedEstancia?.nombre}</Badge>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <AnimationCircleProgress
              animationDuration={segundosDeProcesamiento!}
            />

            <p className="text-sm text-gray-500 text-center">
              El video se está procesando. Este análisis puede tardar algunos
              minutos.
            </p>
            {tiempoEstimadoTexto && (
              <p className="text-sm text-gray-500 text-center max-w-md">
                {tiempoEstimadoTexto}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">
                Seleccionar archivo de video:
              </label>
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">
                Nombre personalizado del video:
              </label>
              <Input
                type="text"
                placeholder="Ej: Vaca corral 12 - mañana"
                value={videoName}
                onChange={(e) => setVideoName(e.target.value)}
                className="w-full"
              />
            </div>

            {videoFile && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Video seleccionado: {videoFile.name}
                </p>
                {tiempoEstimadoTexto && (
                  <p className="text-xs text-green-700 mt-1">
                    {tiempoEstimadoTexto}
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(1)}
            disabled={loading}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!videoFile || loading || !videoName.trim()}
          >
            {loading ? "Procesando..." : "Procesar Video"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <div className="space-y-6 border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">

      <Card className="shadow-md">
        {loading || !data ? (
          // 🌀 Mostrar animación de carga
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <AnimationCircleProgress animationDuration={segundosDeProcesamiento!} />

            <p className="text-sm text-gray-500 text-center">
              El video se está procesando. Este análisis puede tardar algunos minutos.
            </p>
            {tiempoEstimadoTexto && (
              <p className="text-sm text-gray-500 text-center max-w-md">
                {tiempoEstimadoTexto}
              </p>
            )}
          </div>
        ) : (
          // ✅ Mostrar resultados del análisis
          <>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                ✅ Análisis Completado
              </CardTitle>
              <p className="text-sm text-gray-500">
                Resumen del video "{data.video_name}" procesado para la estancia:{" "}
                <Badge variant="secondary">{selectedEstancia?.nombre}</Badge>
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.conteo_por_tipo?.Vaca && (
                  <div className="rounded-xl border p-4 shadow-sm flex gap-4 items-center">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4">
                      <img src="/cow.svg" alt="vaca" />
                    </div>
                    <div className="text-lg font-semibold">
                      {data.conteo_por_tipo.Vaca}
                    </div>
                    <div className="text-sm text-gray-500">Vacas</div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Promedio de peso</div>
                  <div className="text-xl font-semibold">
                    {data.peso_promedio} kg
                  </div>
                </div>
                <div className="p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Total de animales</div>
                  <div className="text-xl font-semibold">{data.total_animales}</div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                    >
                      Eliminar Video
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader className="mb-4 items-center gap-2">
                      <div
                        aria-hidden="true"
                        className="shrink-0 rounded-full bg-red-50 p-3 dark:bg-red-900"
                      >
                        <Trash2 className="size-5 text-red-600 dark:text-red-200" />
                      </div>
                      <div className="flex flex-col gap-2 text-center">
                        <AlertDialogTitle>Eliminar operación</AlertDialogTitle>
                        <AlertDialogDescription className="text-balance">
                          ¿Estás seguro de que deseas eliminar esta operación?
                          Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-between">
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={() => eliminarVideo(data.id)}
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  onClick={() => {
                    setCurrentStep(1);
                    setVideoFile(null);
                    setData(null);
                    setEstanciaSeleccionada(null);
                    setError(null);
                  }}
                >
                  Analizar Otro Video
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
      {videoUrl && !loading && (
        <Card>
          <CardHeader>
            <CardTitle>Video Procesado</CardTitle>
          </CardHeader>
          <CardContent>
            <video
              width="100%"
              height="auto"
              controls
              preload="metadata"
              crossOrigin="anonymous"
              className="rounded-lg shadow"
            >
              <source src={videoUrl} type="video/mp4" />
              Tu navegador no soporta el video HTML5.
            </video>
          </CardContent>
        </Card>
      )}
    </div>
  );


  // console.log("🎬 URL del video 2:", videoUrl);

  return (
    <MainLayout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {renderStepIndicator(currentStep)}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>
      <Toaster />
    </MainLayout>
  );
}
