import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProgressBar } from "@/modules/auth/components/ProgressBar";
import {
  useForm,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";
import { authService } from "@/modules/auth/api/auth.service";
import type { RegisterRequest } from "@/modules/auth/types";
import { useNavigate } from "react-router-dom";

type StepFields = Array<keyof RegisterRequest>;

const STEP_1_FIELDS: StepFields = ["name", "ruc", "dv", "contact_email"];

interface StepProps {
  register: UseFormRegister<RegisterRequest>;
  errors: FieldErrors<RegisterRequest>;
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [step, setStep] = useState<number>(1);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({ mode: "onTouched" });

  const handleContinue = async () => {
    const valid = await trigger(STEP_1_FIELDS);
    if (valid) setStep(2);
  };

  const onSubmit = async (data: RegisterRequest) => {
    setServerError(null);
    try {
      await authService.signup(data);
      navigate("/dashboard");
    } catch {
      setServerError(
        "No se pudo crear la cuenta. Verifica los datos e intenta de nuevo.",
      );
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProgressBar step={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && (
            <StepOrganization register={register} errors={errors} />
          )}
          {step === 2 && <StepUsuario register={register} errors={errors} />}
        </motion.div>
      </AnimatePresence>

      {serverError && (
        <p className="text-xs text-ky-red text-center -mt-2">{serverError}</p>
      )}

      <Field>
        {step === 1 && (
          <Button
            type="button"
            onClick={handleContinue}
            className="rounded-lg h-8 text-xs font-medium bg-ky-accent/10 text-ky-accent border border-ky-accent/40 hover:bg-ky-accent/20"
          >
            Continuar
          </Button>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg h-9 font-semibold"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
            <Button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-lg h-8 text-xs font-medium bg-ky-accent/10 text-ky-accent border border-ky-accent/40 hover:bg-ky-accent/20"
            >
              Volver atrás
            </Button>
          </div>
        )}
      </Field>
    </form>
  );
}

function StepOrganization({ register, errors }: StepProps) {
  return (
    <FieldGroup>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Tu organización</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Ingresa los datos fiscales de tu empresa
        </p>
      </div>
      <Field>
        <FieldLabel htmlFor="name">Nombre de la organización</FieldLabel>
        <Input
          id="name"
          type="text"
          placeholder="Ej. Claro Panamá S.A."
          className="rounded-lg bg-ky-bg-alt"
          aria-invalid={!!errors.name}
          {...register("name", {
            required: "El nombre es requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
        />
        {errors.name && (
          <p className="text-xs text-ky-red mt-1">{errors.name.message}</p>
        )}
      </Field>
      <div className="grid grid-cols-[1fr_80px] gap-3">
        <Field>
          <FieldLabel htmlFor="ruc">RUC</FieldLabel>
          <Input
            id="ruc"
            type="text"
            placeholder="8-123-456789"
            className="rounded-lg bg-ky-bg-alt"
            aria-invalid={!!errors.ruc}
            {...register("ruc", {
              required: "El RUC es requerido",
              minLength: { value: 9, message: "RUC inválido" },
            })}
          />
          {errors.ruc && (
            <p className="text-xs text-ky-red mt-1">{errors.ruc.message}</p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="dv">DV</FieldLabel>
          <Input
            id="dv"
            type="text"
            placeholder="07"
            maxLength={2}
            className="rounded-lg bg-ky-bg-alt"
            aria-invalid={!!errors.dv}
            {...register("dv", {
              required: "Requerido",
              minLength: { value: 2, message: "DV inválido" },
              maxLength: { value: 2, message: "DV inválido" },
            })}
          />
          {errors.dv && (
            <p className="text-xs text-ky-red mt-1">{errors.dv.message}</p>
          )}
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="contact_email">Correo de contacto</FieldLabel>
        <Input
          id="contact_email"
          type="email"
          placeholder="contacto@empresa.com.pa"
          className="rounded-lg bg-ky-bg-alt"
          aria-invalid={!!errors.contact_email}
          {...register("contact_email", {
            required: "El correo de contacto es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido",
            },
          })}
        />
        {errors.contact_email ? (
          <p className="text-xs text-ky-red mt-1">
            {errors.contact_email.message}
          </p>
        ) : (
          <FieldDescription>
            Usado para notificaciones y comunicaciones oficiales.
          </FieldDescription>
        )}
      </Field>
    </FieldGroup>
  );
}

function StepUsuario({ register, errors }: StepProps) {
  return (
    <FieldGroup>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Tu cuenta</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Datos del administrador principal
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor="first_name">Nombre</FieldLabel>
          <Input
            id="first_name"
            type="text"
            placeholder="Juan"
            className="rounded-lg bg-ky-bg-alt"
            aria-invalid={!!errors.first_name}
            {...register("first_name", {
              required: "El nombre es requerido",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
          />
          {errors.first_name && (
            <p className="text-xs text-ky-red mt-1">
              {errors.first_name.message}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="last_name">Apellido</FieldLabel>
          <Input
            id="last_name"
            type="text"
            placeholder="Rodríguez"
            className="rounded-lg bg-ky-bg-alt"
            aria-invalid={!!errors.last_name}
            {...register("last_name", {
              required: "El apellido es requerido",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
          />
          {errors.last_name && (
            <p className="text-xs text-ky-red mt-1">
              {errors.last_name.message}
            </p>
          )}
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="juan@empresa.com.pa"
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
        <FieldLabel htmlFor="password">Contraseña</FieldLabel>
        <Input
          id="password"
          type="password"
          className="rounded-lg bg-ky-bg-alt"
          aria-invalid={!!errors.password}
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
            maxLength: { value: 50, message: "Máximo 50 caracteres" },
          })}
        />
        {errors.password ? (
          <p className="text-xs text-ky-red mt-1">{errors.password.message}</p>
        ) : (
          <FieldDescription>Mínimo 6 caracteres, máximo 50.</FieldDescription>
        )}
      </Field>
    </FieldGroup>
  );
}
