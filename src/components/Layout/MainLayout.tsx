import { AppSidebar } from "@/components/Dashboard/AppSidebar";
import { Button } from "../ui/button";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownUserMenu } from "../DropdownNavbar/DropdownUserMenu";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="border-b border-gray-700 bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold text-white">IAgro</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/crear-estancia")}
                className="bg-primary"
              >
                + Crear estancia
              </Button>

              <Button
                onClick={() => navigate("/upload-video")}
                className="bg-primary"
              >
                + Peso Promedio
              </Button>

              <Button variant="ghost" size="icon" className="text-gray-400">
                <Mail className="h-5 w-5" />
              </Button>
              <DropdownUserMenu />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
