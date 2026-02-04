
import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart2, Calendar, Scale, Video } from "lucide-react";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoData: {
    id: number;
    fecha: string;
  };
  videoName: string;
  ganadoData: GanadoData; // <-- Agrega esta línea
}

interface GanadoData {
  videoUrl: string;
  totalAnimales: number;
  pesoPromedio: number;
  pesoTotal: number;
  conteoPorTipo: {
    tipo: string;
    cantidad: number;
    porcentaje: number;
  }[];
  createdAt: string;
}

const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  isOpen,
  onClose,
  videoName,
  ganadoData,
}) => {
  // Variantes para las animaciones
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleDownloadExcel = () => {
    const resumen = [
      {
        "Título del video": videoName,
        "Fecha de análisis": ganadoData.createdAt,
        "Total de animales": ganadoData.totalAnimales,
        "Peso total (kg)": ganadoData.pesoTotal,
        "Peso promedio (kg)": ganadoData.pesoPromedio,
      },
    ];

    const detalle = ganadoData.conteoPorTipo.map((item) => ({
      Tipo: item.tipo,
      Cantidad: item.cantidad,
      "% del Total": `${item.porcentaje.toFixed(1)}%`,
    }));

    const wb = XLSX.utils.book_new();

    const resumenSheet = XLSX.utils.json_to_sheet(resumen);

    XLSX.utils.book_append_sheet(wb, resumenSheet, "Resumen");

    const detalleSheet = XLSX.utils.json_to_sheet(detalle);
    XLSX.utils.book_append_sheet(wb, detalleSheet, "Detalle");

    const filename = `informe_${videoName.replace(/\s+/g, "_")}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className="bg-slate-800 rounded-xl shadow-xl w-full max-w-3xl overflow-hidden border border-slate-700"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-100 flex items-center">
                <BarChart2 className="mr-2 h-5 w-5 text-emerald-400" />
                Análisis de Video: {videoName}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-700"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div
                  className="bg-slate-700/50 p-4 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4">
                    {/* <Cow className="h-6 w-6 text-emerald-400" /> */}
                    <img src="/cow.svg" alt="" className="bg" />
                  </div>
                  <div className="flex">
                    <p className="text-slate-400 text-sm">Cabezas de Ganado</p>
                    <p className="text-slate-100 text-2xl font-bold">
                      {ganadoData.totalAnimales}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-slate-700/50 p-4 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4">
                    <Scale className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Peso Total</p>
                    <p className="text-slate-100 text-2xl font-bold">
                      {ganadoData.pesoTotal.toLocaleString()} kg
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-slate-700/50 p-4 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4">
                    <Scale className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Peso Promedio</p>
                    <p className="text-slate-100 text-2xl font-bold">
                      {ganadoData.pesoPromedio} kg
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mb-6 flex items-center text-slate-300 bg-slate-700/30 p-3 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Calendar className="h-5 w-5 mr-2 text-slate-400" />
                <span className="text-sm">
                  Fecha de análisis:{" "}
                  {new Date(ganadoData.createdAt).toLocaleString("es-AR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </motion.div>
              <motion.div
                className="mb-6 flex items-center text-slate-300 bg-slate-700/30 p-3 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Video className="h-5 w-5 mr-2 text-slate-400" />
                <span className="text-sm">
                  <a href={ganadoData.videoUrl} target="_blank">
                    Ver video procesado
                  </a>
                </span>
              </motion.div>

              <motion.div
                className="overflow-hidden rounded-lg border border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900">
                      <th className="px-4 py-3 text-left font-medium text-slate-300">
                        Tipo
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-slate-300">
                        Cantidad
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-slate-300">
                        % del Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ganadoData.conteoPorTipo.map((item, index) => (
                      <motion.tr
                        key={item.tipo}
                        className="border-t border-slate-700 bg-slate-800/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <td className="px-4 py-3 text-slate-200">
                          {item.tipo}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-200">
                          {item.cantidad}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-200">
                          {item.porcentaje.toFixed(1)}%
                        </td>
                      </motion.tr>
                    ))}

                    <motion.tr
                      className="border-t border-slate-600 bg-slate-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <td className="px-4 py-3 font-medium text-slate-100">
                        Total
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-slate-100">
                        {ganadoData.totalAnimales}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-slate-100">
                        100%
                      </td>
                    </motion.tr>
                  </tbody>
                </table>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              className="flex justify-end p-4 border-t border-slate-700 bg-slate-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <Button
                variant="outline"
                className="mr-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                onClick={onClose}
              >
                Cerrar
              </Button>
              <Button
                onClick={handleDownloadExcel}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Descargar Informe
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPreviewModal;
