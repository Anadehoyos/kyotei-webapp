import { useEffect, useState } from "react";
import { authService, type JwtPayload } from "@/modules/auth";

export function Dashboard() {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authService
      .me()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>Error al cargar usuario</div>;

  return (
    <div className="bg-black text-amber-50">
      <h1>
        Welcome {user.firstName} {user.lastName}
      </h1>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>
    </div>
  );
}
