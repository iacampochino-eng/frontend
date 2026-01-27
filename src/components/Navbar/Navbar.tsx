

import { CircleHelp, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { DropdownUserMenu } from "../DropdownNavbar/DropdownUserMenu";

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrollThreshold] = useState(200);

  // Updated useEffect for scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      if (currentScrollPos > scrollThreshold) {
        setVisible(!isScrollingDown);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, scrollThreshold]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
        method: "POST",
        credentials: "include", // 🔐 Esto es CLAVE para enviar cookies
      });

      if (res.ok) {
        console.log("Logout exitoso");
        // Acá redirigís al login o limpiás el estado global:
        window.location.href = "/login";
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  return (
    <div className="hidden  w-full md:flex justify-center  ">
      <section
        className={cn(
          "fixed z-50 w-full md:w-[80.9vw] transition-all duration-300 ease-in-out",
          visible ? "top-4" : "-top-full"
        )}
      >
        <div className="bg-[#242425] rounded-3xl  ">
          <nav className="h-[67px] pl-9  flex items-center justify-between sticky">
            <div className="w-full ">
              <div className="flex  justify-between h-full w-full">
                <div className="flex justify-center items-center ">
                  {/* Logo */}
                  <a href={"/"} className="flex-shrink-0 w-auto h-auto">
                    {/* Mobile Menu Button */}
                    {/* <MobileNav className="hidden dark:text-white text-white" /> */}
                    <div className="block 2xl:block relative w-[170px]  text-white text-xl">
                      IAgro
                    </div>
                  </a>
                  {/* DESK NAVIGATION LINKS */}
                  {/* TODO */}
                  <div className="hidden 2xl:flex flex-wrap ml-[82px] mt-4 justify-center flex-col items-center">
                    <NavigationMenu className="relative bottom-2">
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <>
                            <a
                              href={"/videos"}
                              className={cn(
                                "font-bold text-[14px] mr-11",

                                "hover:text-[#E7E3E3]"
                              )}
                            >
                              Videos
                            </a>
                            <a
                              href={"/programas"}
                              className={cn(
                                "font-bold text-[14px] mr-11 hover:text-[#E7E3E3]"
                              )}
                            >
                              Reportes
                            </a>
                            <a
                              href={"/programas"}
                              className={cn(
                                "font-bold text-[14px] mr-11 hover:text-[#E7E3E3]"
                              )}
                            >
                              Mi Perfil
                            </a>
                            <a
                              href={"/programas"}
                              className={cn(
                                "font-bold text-[14px] mr-11 hover:text-[#E7E3E3]"
                              )}
                            >
                              Planes
                            </a>
                            <a
                              href={"/programas"}
                              className={cn(
                                "font-bold text-[14px] mr-11 hover:text-[#E7E3E3]"
                              )}
                            >
                              Soporte
                            </a>
                          </>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>
                </div>

                <div className="flex md:items-center relative">
                  {/* Asegúrate de que el contenedor tenga relative */}
                  <div className="flex items-center space-x-4">
                    {/* Theme Switcher */}

                    <div className="flex space-x-8 items-center">
                      {/* Help Icon */}
                      <div className="lg:flex">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a href="/glosario" className="hidden lg:flex">
                                <CircleHelp className="h-5 w-5 lg:w-6 lg:h-6 cursor-pointer hover:text-[#E7E3E3] text-[#BCBCBC]" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>Soporte</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <button onClick={handleLogout}>Logout </button>

                      {/* User Profile */}
                      {status === "unauthenticated" ? (
                        <a href={"/login"}>
                          <User className="hidden h-4 w-4 md:w-6 md:h-6 cursor-pointer hover:text-gray-500 text-white xl:flex" />
                        </a>
                      ) : (
                        // <Avatar className="h-[38px] w-[38px] p-0 m-0">
                        //   <AvatarImage
                        //     // src={session?.user?.profileImage?.url || '/images/noImgProfile.png'}
                        //     src={"/images/farmer.png"}
                        //     alt="profile finanflix"
                        //   />
                        //   {/* <AvatarFallback>{session?.user?.firstName?.substring(0, 2) || 'CN'}</AvatarFallback> */}
                        //   <AvatarFallback>CN</AvatarFallback>
                        // </Avatar>

                        <DropdownUserMenu />
                      )}
                    </div>

                    <div className="pl-3 ">
                      {/* <MobileNav className="lg:flex 2xl:hidden text-white pr-9" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

{
  /* COMPONENTE LISTITEM */
}
export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <li className="h-full ">
        <a
          ref={ref}
          className={cn(
            "first-line:block select-none h-full  rounded-md leading-none no-underline outline-none transition-colors  ",
            className
          )}
          {...props}
        >
          <div className="text-[1.25rem] leading-none ">{title}</div>

          <div className="line-clamp relative h-full  flex items-center leading-snug text-muted-foreground flex-grow m-0 ">
            {children}
          </div>
        </a>
      </li>
    </NavigationMenuLink>
  );
});

ListItem.displayName = "ListItem";
