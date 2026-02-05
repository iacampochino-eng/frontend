import { AppSidebar } from "@/components/Dashboard/AppSidebar";
import { Button } from "../ui/button";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { DropdownUserMenu } from "../DropdownNavbar/DropdownUserMenu";

const MainLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="border-b border-gray-700 bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">

               <img
                        src="https://csrxjswvzmdwujsvmhar.supabase.co/storage/v1/object/public/avatar/aaaa-removebg-preview.png"
                        alt="IAgro"
                        className="w-20 h-20 object-cover"
                      />
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => window.location.href = "/crear-estancia"}
                className="bg-primary"
              >
                + Crear estancia
              </Button>

              {/* <Button
                onClick={() => navigate("/upload-video")}
                className="bg-primary"
              >
                + Peso Promedio
              </Button> */}

              {/* <Button variant="ghost" size="icon" className="text-gray-400">
                <Mail className="h-5 w-5" />
              </Button> */}


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
