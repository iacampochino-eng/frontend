import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Database, NotepadTextIcon, User, Video } from "lucide-react";

export const GridCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 * 0.1 }}
      >
        <Card
          className="bg-gray-800 border-gray-700 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.009] hover:shadow-lg"
          onClick={() => (window.location.href = "/upload-video")}
        >
          <CardContent className="px-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Video className="h-7 w-7" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white mb-3">
                Cargar Video
              </h3>
              <p className="text-sm text-gray-400">
                Acá podras cargar los videos para analizar tus datos
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {/* Card 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 * 0.1 }}
      >
        <Card
          className="bg-gray-800 border-gray-700 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.009] hover:shadow-lg"
          onClick={() => (window.location.href = "/resumen")}
        >
          <CardContent className="px-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="h-7 w-7" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white mb-3">Resumen</h3>
              <p className="text-sm text-gray-400">
                Acá podras ver todos los resultados de tus analisis.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {/* Card 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 * 0.1 }}
      >
        <Card
          className="bg-gray-800 border-gray-700 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.009] hover:shadow-lg"
          onClick={() => (window.location.href = "#/upload-video")}
        >
          <CardContent className="px-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="h-7 w-7" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white mb-3">Mi cuenta</h3>
              <p className="text-sm text-gray-400">
                Acá podras configurar tu cuenta
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {/* Card 4 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 * 0.1 }}
      >
        <Card
          className="bg-gray-800 border-gray-700 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.009] hover:shadow-lg"
          onClick={() => (window.location.href = "/doc")} 
        >
          <CardContent className="px-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <NotepadTextIcon className="h-7 w-7" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white mb-3">
                Documentación
              </h3>
              <p className="text-sm text-gray-400">
                Acá esta la guia instructiva para usar la app.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
