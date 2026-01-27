import CowLoading from "@/components/Loading/CowLoading";
import { useSession } from "@/context/useSession";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useSession();

  if (loading) {
    return <CowLoading />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
