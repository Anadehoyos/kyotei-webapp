import { Link } from 'react-router-dom'
import { SignupForm } from '@/components/ui/signup-form'
import bannerSignup from '@/assets/banner-signup.webp'

export default function SignUp() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-baseline gap-1.5 no-underline">
            <span className="text-xl font-extrabold tracking-[-0.03em] text-foreground">
              Kyōtei
            </span>
            <span className="text-[11px] text-primary font-medium">協定</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <img
          src={bannerSignup}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 backdrop-blur-[2px]" />
        <div className="absolute bottom-12 left-10 right-10">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-extrabold tracking-[-0.03em] text-white">Kyōtei</span>
            <span className="text-base text-ky-accent">協定</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-[340px]">
            Cada organización merece tener el control total de sus proveedores y contratos — sin hojas de cálculo, sin recordatorios manuales, sin sorpresas al vencimiento.
          </p>
        </div>
      </div>
    </div>
  )
}
