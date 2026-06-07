import { useOutletContext } from "react-router-dom";
import type { JwtPayload } from "@/modules/auth";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

export function Profile() {
  const { user } = useOutletContext<{ user: JwtPayload }>();

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Perfil</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-2xl">
        <Field label="Nombre" value={`${user.firstName} ${user.lastName}`} />
        <Field label="Email" value={user.email} />
        <Field label="Rol" value={user.role} />
        <Field label="Estado" value={user.isActive ? "Activo" : "Inactivo"} />
        <Field label="ID de usuario" value={user.userId} />
        <Field label="Organización" value={user.organizationId} />
      </div>
    </div>
  );
}
