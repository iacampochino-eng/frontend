import {
  Upload,
  BarChart3,
  FileText,
  Database,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "/dashboard",
    isActive: true,
  },
  {
    title: "Cargar operación",
    icon: Upload,
    url: "/upload-video",
  },

  {
    title: "Resumen",
    icon: Database,
    url: "/resumen",
  },
  // {
  //   title: "Gráficos",
  //   icon: PieChart,
  //   url: "#",
  // },
  // {
  //   title: "Usuarios",
  //   icon: Users,
  //   url: "#",
  // },
  {
    title: "Documentación",
    icon: FileText,
    url: "/doc",
  },
];
