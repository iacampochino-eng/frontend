import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button, buttonVariants } from "../ui/button";
import {
  Trash2,
  RefreshCw,
  Video,
  Filter,
  Eye,
  CheckCircle,
  Settings,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Estancia } from "@/interfaces/estancia";
import { useSession } from "@/context/useSession";
import VideoPreviewModal from "./VideoPrevieModal";
import { Toaster, toast } from "sonner";
import { IDataYolo, IDataYoloComplete } from "@/interfaces/info-video";
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
} from "../ui/alert-dialog";

const EstanciaVideoViewer: React.FC = () => {
  const [selectedEstancia, setSelectedEstancia] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<IDataYolo[]>([]);
  const [completeData, setCompleteData] = useState<IDataYoloComplete>();
  const { user } = useSession();
  const [estancias, setEstancias] = useState<Estancia[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const calcularPorcentaje = (cantidad: number = 0, total: number) =>
    total > 0 ? parseFloat(((cantidad / total) * 100).toFixed(2)) : 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const obtenerEstancias = async () => {
      if (!user?.id) return;
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/info_estancia/${user.id}`
      );
      const data = await res.json();
      setEstancias(data);
    };

    obtenerEstancias();
  }, [user]);

  const fetchVideos = async (estanciaId: string, page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/video-info/${estanciaId}?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setCompleteData(data);
      setVideos(data.videos);
    } catch (error) {
      console.error("Error al obtener videos:", error);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEstanciaChange = async (value: string) => {
    setSelectedEstancia(value);
    setPage(1); // Reinicia la paginación
    fetchVideos(value, 1);
  };

  const handleDeleteVideo = async (videoId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/yolo/eliminar-video/${videoId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "Error al eliminar el video");

      toast("Video Eliminado", {
        description: "Se ha eliminado el video de manera exitosa.",
        icon: <CheckCircle className="text-green-500 relative right-1" />,
        duration: 10000,
      });
    } catch (error) {
      console.error("Error eliminando video:", error);
      alert("No se pudo eliminar el video");
    }

    setVideos(videos.filter((video) => video.id !== videoId));
  };

  const handleEliminarTodos = async () => {
    if (!selectedEstancia) return;

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/yolo/eliminar-videos/?estancia_id=${selectedEstancia}`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast("Videos Eliminados", {
          description:
            "Se han eliminado todos los videos de la estancia de manera exitosa.",
          icon: <CheckCircle className="text-green-500 relative right-1" />,
          duration: 10000,
        });
        setVideos([]); // Limpiar lista en frontend
      } else {
        toast.error("", {
          description: "No se pudo eliminar su video",
          action: {
            label: "Reportar problema.",
            onClick: () => {
              window.open("/contacto", "_blank");
            },
          },
        });
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error eliminando videos:", error);
    }
  };
  console.log(completeData, "completeData");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-slate-100 flex items-center">
              <Filter className="mr-2 h-5 w-5 text-emerald-400" />
              Selección de Estancia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={handleEstanciaChange}>
              <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Seleccionar estancia" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-slate-100">
                {estancias.map((estancia) => (
                  <SelectItem key={estancia.id} value={estancia.id.toString()}>
                    {estancia.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </motion.div>

      {completeData && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            onClick={() => {
              if (page > 1 && selectedEstancia) {
                const newPage = page - 1;
                setPage(newPage);
                fetchVideos(selectedEstancia, newPage);
              }
            }}
            disabled={page === 1}
            className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-emerald-700"
          >
            Anterior
          </Button>
          <span className="text-slate-100">
            Página {page} de {completeData?.total_pages}
          </span>
          <Button
            disabled={
              !selectedEstancia ||
              (completeData && page >= completeData.total_pages)
            }
            onClick={() => {
              if (selectedEstancia) {
                const newPage = page + 1;
                setPage(newPage);
                fetchVideos(selectedEstancia, newPage);
              }
            }}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Siguiente
          </Button>
        </div>
      )}

      <AnimatePresence>
        {selectedEstancia && (
          <motion.div
            key="video-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-slate-100 flex items-center justify-start gap-5">
                  <div className="flex items-center">
                    <Video className="mr-2 h-5 w-5 text-emerald-400" />
                    Resumen de la{" "}
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-sm ml-3"
                    >
                      {
                        estancias.find(
                          (e) => e.id.toString() === selectedEstancia
                        )?.nombre
                      }
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        ease: "linear",
                      }}
                    >
                      <RefreshCw className="h-10 w-10 text-slate-500" />
                    </motion.div>
                    <p className="mt-4 text-slate-400">Cargando videos...</p>
                  </div>
                  ) : videos.length > 0 ? (
                <div className="space-y-3">
                  <AnimatePresence>
                    {videos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                          <div className="flex gap-2">
                            {index + 1}
                            <p>Video: </p>
                            <h3 className="font-medium text-slate-100">
                              {video.video_name}
                            </h3>
                            <div className="flex items-center mt-1 text-sm text-slate-400">
                              <span className="mx-2">•</span>
                              <p>Estado:</p>
                              <Badge
                                className={`ml-3 ${"bg-amber-500/20 text-amber-400 border-amber-500/30"}`}
                                variant="outline"
                              >
                                Procesado
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => {
                                setSelectedVideo(video);
                                openModal();
                              }}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400 hover:text-slate-100 hover:bg-slate-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 className="h-4 w-4" />
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
                                      <AlertDialogTitle>
                                        Eliminar operación
                                      </AlertDialogTitle>
                                      <AlertDialogDescription className="text-balance">
                                        ¿Estás seguro de que deseas eliminar
                                        esta operación? Esta acción no se puede
                                        deshacer.
                                      </AlertDialogDescription>
                                    </div>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter className="sm:justify-between">
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className={buttonVariants({
                                        variant: "destructive",
                                      })}
                                      onClick={() =>
                                        handleDeleteVideo(video.id)
                                      }
                                    >
                                      Continuar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* 👇 MODAL FUERA DEL MAP */}
                  {selectedVideo && (
                    <VideoPreviewModal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      videoData={selectedVideo}
                      videoName={selectedVideo.video_name}
                      ganadoData={{
                        videoUrl: selectedVideo.video_url,
                        totalAnimales: selectedVideo.total_animales,
                        pesoPromedio: selectedVideo.peso_promedio,
                        pesoTotal: selectedVideo.peso_total,
                        createdAt: selectedVideo.created_at,
                        conteoPorTipo: [
                          {
                            tipo: "Vaca",
                            cantidad: selectedVideo.conteo_por_tipo["Vaca"] ?? 0,
                            porcentaje: calcularPorcentaje(
                              selectedVideo.conteo_por_tipo["Vaca"],
                              selectedVideo.total_animales
                            ),
                          },
                        ],
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                  <p>No hay videos disponibles para esta estancia.</p>
                </div>
              )}
            </CardContent>
              <CardFooter className="flex justify-between border-t border-slate-700 pt-4">
                <div className="text-sm text-slate-400">
                  Total: {completeData?.total} videos
                </div>
                <Button
                  onClick={() => {
                    window.location.href =
                      "https://api.whatsapp.com/send?phone=5491160047133&text=Hola%2C%20quiero%20consultar%20algo";
                  }}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                >
                  Contacto
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedEstancia && videos.length > 0 && (
          <motion.div
            key="actions-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-slate-100 flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-red-400" />
                  Gestión de Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Seleccione una acción para aplicar a los videos de esta
                    estancia:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar todos
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
                            <AlertDialogTitle>
                              ¡Eliminar operaciones!
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-balance">
                              ¿Estás seguro de que deseas eliminar{" "}
                              <span className="font-bold">
                                todas las operaciones
                              </span>{" "}
                              de esta estancia? Esta acción no se puede
                              deshacer.
                            </AlertDialogDescription>
                          </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="sm:justify-between">
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            className={buttonVariants({
                              variant: "destructive",
                            })}
                            onClick={handleEliminarTodos}
                          >
                            Continuar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button
                      onClick={() => (window.location.href = "/upload-video")}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Cargar + videos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
};

export default EstanciaVideoViewer;
