import MainLayout from "@/components/Layout/MainLayout";
import {
  CheckCircle,
  AlertTriangle,
  Video,
  MapPin,
  FileText,
  Trash2,
  Download,
} from "lucide-react";

const DocumentacionPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold mb-4">Documentación de Uso</h1>

        <section>
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <MapPin size={24} /> Crear Estancia
          </h2>
          <p>
            Lo primero que debes hacer es crear una <strong>estancia</strong> en
            la página{" "}
            <a
              href="/crear-estancia"
              className="bg-gray-800 px-1 rounded text-blue-400 hover:underline"
            >
              /crear-estancia
            </a>
            . La estancia representa un lugar con un nombre y una locación
            específicos donde se harán las grabaciones.
          </p>
          <p>
            Una vez creada la estancia, estarás listo para subir videos
            asociados a esa estancia.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <Video size={24} /> Subir Videos
          </h2>
          <p>
            Para subir videos, ve a la página{" "}
            <a
              href="/upload-video"
              className="bg-gray-800 px-1 rounded text-blue-400 hover:underline"
            >
              /subir-video
            </a>
            . Allí encontrarás un paso a paso bien especificado para cargar y
            completar todos los campos necesarios.
          </p>
          <p className="font-semibold mt-2">Requisitos para los videos:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>El video debe ser grabado con un dron.</li>
            <li>
              El dron debe estar a <strong>10 metros</strong> de altura respecto
              al suelo, ni más ni menos, cuando se desee obtener el peso
              estimado.
            </li>
            <li>
              La duración del video no debe superar los{" "}
              <strong>2 minutos</strong>.
            </li>
            <li>
              Para contabilizar el peso y detectar cada vaca, las vacas deben
              pasar por un "pasillo imaginario" para evitar dispersión y
              permitir una detección óptima.
            </li>
            <li>
              Si solo deseas contabilizar la cantidad de vacas sin el peso, no
              es necesario el pasillo ni respetar la altura estricta; el dron
              puede estar a mayor altura.
            </li>
          </ul>
          <AlertTriangle
            color="orange"
            size={20}
            className="inline-block mr-1"
          />
          <span className="text-orange-700 font-medium">
            Importante: el "pasillo imaginario" es clave para una detección
            precisa del peso.
          </span>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <FileText size={24} /> Resumen y Gestión de Videos
          </h2>
          <p>
            En{" "}
            <a
              href="/resumen"
              className="bg-gray-800 px-1 rounded text-blue-400 hover:underline"
            >
              /resumen
            </a>{" "}
            podrás:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Seleccionar una estancia para ver todos los videos subidos
              asociados a ella.
            </li>
            <li>Visualizar la información detallada de cada video.</li>
            <li>Descargar la información en formato Excel.</li>
            <li>Eliminar videos que ya no necesites.</li>
          </ul>
          <div className="mt-3 flex gap-4 text-gray-700">
            <Download size={20} /> <Trash2 size={20} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <CheckCircle size={24} color="green" /> Consejos y Buenas Prácticas
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Revisa que el dron mantenga la altura correcta para garantizar la
              precisión del peso.
            </li>
            <li>
              Asegúrate de que las vacas pasen por el pasillo imaginario para
              mejores resultados.
            </li>
            <li>
              Verifica la duración del video para no superar los 2 minutos.
            </li>
            <li>
              Utiliza la sección resumen para mantener organizados tus videos y
              datos.
            </li>
          </ul>
        </section>
      </div>
    </MainLayout>
  );
};

export default DocumentacionPage;
