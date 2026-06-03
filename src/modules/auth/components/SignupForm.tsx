import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ProgressBar } from '@/modules/auth/components/ProgressBar'

interface RegisterFormData {
  // Step 1 — Organización
  name: string
  ruc: string
  dv: string
  contact_email: string
  // Step 2 — Usuario
  first_name: string
  last_name: string
  email: string
  password: string
}

const INITIAL_DATA: RegisterFormData = {
  name: '',
  ruc: '',
  dv: '',
  contact_email: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
}

interface StepProps {
  data: RegisterFormData
  onChange: (field: keyof RegisterFormData, value: string) => void
}

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [step, setStep] = useState<number>(1)
  const [data, setData] = useState<RegisterFormData>(INITIAL_DATA)

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <ProgressBar step={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && <StepOrganization data={data} onChange={handleChange} />}
          {step === 2 && <StepUsuario data={data} onChange={handleChange} />}
        </motion.div>
      </AnimatePresence>

      <Field>
        {step === 1 && (
          <Button
            onClick={() => setStep(2)}
            className="rounded-lg h-8 text-xs font-medium bg-ky-accent/10 text-ky-accent border border-ky-accent/40 hover:bg-ky-accent/20"
          >
            Continuar
          </Button>
        )}
        {step === 2 && (
          <Button
            onClick={() => setStep(1)}
            className="rounded-lg h-8 text-xs font-medium bg-ky-accent/10 text-ky-accent border border-ky-accent/40 hover:bg-ky-accent/20"
          >
            Volver atrás
          </Button>
        )}
      </Field>
    </form>
  )
}

function StepOrganization({ data, onChange }: StepProps) {
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
          required
          minLength={3}
          value={data.name}
          onChange={e => onChange('name', e.target.value)}
          className="rounded-lg bg-ky-bg-alt"
        />
      </Field>
      <div className="grid grid-cols-[1fr_80px] gap-3">
        <Field>
          <FieldLabel htmlFor="ruc">RUC</FieldLabel>
          <Input
            id="ruc"
            type="text"
            placeholder="8-123-456789"
            required
            minLength={9}
            value={data.ruc}
            onChange={e => onChange('ruc', e.target.value)}
            className="rounded-lg bg-ky-bg-alt"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="dv">DV</FieldLabel>
          <Input
            id="dv"
            type="text"
            placeholder="07"
            required
            minLength={2}
            maxLength={2}
            value={data.dv}
            onChange={e => onChange('dv', e.target.value)}
            className="rounded-lg bg-ky-bg-alt"
          />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="contact_email">Correo de contacto</FieldLabel>
        <Input
          id="contact_email"
          type="email"
          placeholder="contacto@empresa.com.pa"
          required
          value={data.contact_email}
          onChange={e => onChange('contact_email', e.target.value)}
          className="rounded-lg bg-ky-bg-alt"
        />
        <FieldDescription>
          Usado para notificaciones y comunicaciones oficiales.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}

function StepUsuario({ data, onChange }: StepProps) {
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
            required
            minLength={2}
            value={data.first_name}
            onChange={e => onChange('first_name', e.target.value)}
            className="rounded-lg bg-ky-bg-alt"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="last_name">Apellido</FieldLabel>
          <Input
            id="last_name"
            type="text"
            placeholder="Rodríguez"
            required
            minLength={2}
            value={data.last_name}
            onChange={e => onChange('last_name', e.target.value)}
            className="rounded-lg bg-ky-bg-alt"
          />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="juan@empresa.com.pa"
          required
          value={data.email}
          onChange={e => onChange('email', e.target.value)}
          className="rounded-lg bg-ky-bg-alt"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Contraseña</FieldLabel>
        <Input
          id="password"
          type="password"
          required
          minLength={6}
          value={data.password}
          onChange={e => onChange('password', e.target.value)}
          className="rounded-lg bg-ky-bg-alt"
        />
        <FieldDescription>Mínimo 6 caracteres, máximo 50.</FieldDescription>
      </Field>
      <Field>
        <Button type="submit" className="rounded-lg h-9 font-semibold">
          Crear cuenta
        </Button>
      </Field>
    </FieldGroup>
  )
}
