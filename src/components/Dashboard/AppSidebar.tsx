import { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { menuItems } from "./Menu";
import { useSession } from "@/context/useSession";
import { useLocation } from "react-router-dom";

export function AppSidebar() {
  const { user } = useSession();
  const location = useLocation();

  const userId = Number(user?.id);

  const obtenerEstancia = async (usuarioId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/info_estancia/${usuarioId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.detail || "Error al crear estancia",
        };
      }

      return { success: true, data };
    } catch (error: any) {
      return { success: false, message: error.message || "Error inesperado" };
    }
  };

  useEffect(() => {
    if (userId) obtenerEstancia(userId);
  }, []);

  // console.log("estancia info", infoEstancia);


  return (
    <Sidebar className="border-r border-gray-800 " data-slot="sidebar">
      <SidebarHeader className="border-b border-gray-700 p-[28px]">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://csrxjswvzmdwujsvmhar.supabase.co/storage/v1/object/public/avatar/chino.png" />
            <AvatarFallback className="bg-blue-600 text-white">
              {user?.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{user?.username}</p>
            <p className="text-xs text-yellow-400">Admin</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-gray-300 hover:text-white hover:bg-gray-700 data-[active=true]:bg-blue-600 data-[active=true]:text-white mb-1"
                    >
                      <a
                        href={item.url}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-white"
                      >
                        <item.icon className="h-4 w-4 text-white" />
                        <span className="text-sm text-white">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
