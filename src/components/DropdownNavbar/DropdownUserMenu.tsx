import { LogOut, House, Video, Database } from "lucide-react";
import FloatingActionMenu from "./FloatingMenu";
import { useSession } from "@/context/useSession";
import { useNavigate } from "react-router-dom";

export const DropdownUserMenu = () => {
  const { logout } = useSession();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
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
          onClick: () => navigate("/crear-estancia"),
        },
        {
          label: "Cargar operación",
          Icon: <Video className="w-4 h-4" />,
          onClick: () => navigate("/upload-video"),
        },

        {
          label: "Resumen",
          Icon: <Database className="w-4 h-4" />,
          onClick: () => navigate("/resumen"),
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
