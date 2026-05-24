import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
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
            required
            className="rounded-lg bg-ky-bg-alt"
          />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <a href="#" className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="rounded-lg bg-ky-bg-alt"
          />
        </Field>

        <Field>
          <Button type="submit" className="rounded-lg h-9 font-semibold">
            Acceder al dashboard
          </Button>
        </Field>

        <FieldDescription className="text-center">
          ¿No tienes acceso?{' '}
          <a href="/register" className="text-primary underline-offset-4 hover:underline">
            Solicitar cuenta
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
