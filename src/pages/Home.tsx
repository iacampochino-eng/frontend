import LoginPage from "@/components/Auth/Login/Login";
import { useSession } from "@/context/useSession";
import { useEffect } from "react";

export default function Home() {
  
  const { user } = useSession();
  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://backend-cowntdown-1.onrender.com/ping").catch(() => { });
    }, 1000 * 60 * 3); // cada 3 minutos

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="w-full overflow-x-hidden">
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-12">
        <LoginPage.VideoBackground />

        <div className="relative z-20 w-full max-w-[700px] animate-fadeIn flex items-center justify-center">
          <LoginPage.LoginForm />
        </div>

        <footer className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm z-20">
          © 2026 IAgro. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}
