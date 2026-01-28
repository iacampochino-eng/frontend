import { LogOut, House, Video, Database } from "lucide-react";
import FloatingActionMenu from "./FloatingMenu";
import { useSession } from "@/context/useSession";

export const DropdownUserMenu = () => {
  const { logout } = useSession();
  const handleLogout = async () => {
    try {
      logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  return (
    <FloatingActionMenu
      className="relative"
      options={[
        {
          label: "Crear estancia",
          Icon: <House className="w-4 h-4" />,
          onClick: () => window.location.href = "/crear-estancia",
        },
        {
          label: "Cargar operación",
          Icon: <Video className="w-4 h-4" />,
          onClick: () => window.location.href = "/upload-video",
        },

        {
          label: "Resumen",
          Icon: <Database className="w-4 h-4" />,
          onClick: () => window.location.href = "/resumen",
        },
        {
          label: "Cerrar sesión",
          Icon: <LogOut className="w-4 h-4" />,
          onClick: handleLogout,
        },
      ]}
    />
  );
};
