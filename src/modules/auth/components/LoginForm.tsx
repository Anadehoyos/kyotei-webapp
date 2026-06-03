import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { authService } from "@/modules/auth/api/auth.service";
import type { LoginRequest } from "@/modules/auth/types";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    setServerError(null);
    try {
      await authService.login(data);
      navigate("/dashboard");
    } catch {
      setServerError(
        "Credenciales incorrectas. Verifica tu correo y contraseña.",
      );
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Ingresa tus credenciales para acceder a la plataforma
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="usuario@empresa.com.pa"
            className="rounded-lg bg-ky-bg-alt"
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "El correo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ingresa un correo válido",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-ky-red mt-1">{errors.email.message}</p>
          )}
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            className="rounded-lg bg-ky-bg-alt"
            aria-invalid={!!errors.password}
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
          />
          {errors.password && (
            <p className="text-xs text-ky-red mt-1">
              {errors.password.message}
            </p>
          )}
        </Field>

        {serverError && (
          <p className="text-xs text-ky-red text-center -mt-2">{serverError}</p>
        )}

        <Field>
          <Button
            type="submit"
            className="rounded-lg h-9 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verificando..." : "Acceder al dashboard"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          ¿No tienes acceso?{" "}
          <a
            href="/register"
            className="text-primary underline-offset-4 hover:underline"
          >
            Solicitar cuenta
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
