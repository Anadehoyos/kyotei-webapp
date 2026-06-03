import { Link, useNavigate } from "react-router-dom";
import { SignOutIcon } from "@phosphor-icons/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authService, type JwtPayload } from "@/modules/auth";

export function NavUser({ user }: { user: JwtPayload }) {
  const navigate = useNavigate();
  const initials =
    `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col gap-3 p-2">
      <Link
        to="/perfil"
        className="flex items-center gap-3 rounded-md p-1 -m-1 hover:bg-sidebar-accent"
      >
        <Avatar className="size-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium leading-none">{fullName}</span>
          <Badge
            variant="secondary"
            className="w-fit bg-primary/15 text-primary"
          >
            {user.role}
          </Badge>
        </div>
      </Link>
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={handleLogout}
      >
        <SignOutIcon className="size-4" />
        Cerrar sesión
      </Button>
    </div>
  );
}
