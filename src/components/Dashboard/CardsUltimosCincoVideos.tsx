import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { IDataYolo } from "@/interfaces/info-video";
import { Projector, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CardsUltimosCincoVideos = () => {
  const [videos, setVideos] = useState<IDataYolo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEstanciaChange = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/yolo/ultimos-videos`
      );
      const data = await res.json();

      setVideos(data);
    } catch (error) {
      console.error("Error al obtener videos:", error);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleEstanciaChange();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Cargando información...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Últimos videos</CardTitle>
            <div className="text-right">
              <p
                className="text-sm text-gray-400 cursor-pointer"
                onClick={() => navigate("/resumen")}
              >
                Ver todos
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {videos.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg`}
                >
                  <Projector />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">
                    {project.video_name || "Video sin nombre"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(project.created_at).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">#{project.id}</p>
                  <a
                    className="text-xs text-gray-500"
                    href={project.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Video className="inline-block w-4 h-4 hover:text-gray-400" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
