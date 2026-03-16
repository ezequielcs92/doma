import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-doma-dark text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-doma-violet via-doma-accent to-doma-violet" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Image
              src="/images/logos/DOMA_LOGO-DOMA-VIOLETA.svg"
              alt="DOMA Sculpt Center"
              width={160}
              height={50}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Centro de cirugía estética de alta gama. Tecnología de
              vanguardia y profesionales excepcionales para resultados
              que transforman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-doma-accent mb-6 text-sm uppercase tracking-widest">
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Nosotros', href: '/nosotros' },
                { label: 'Tratamientos', href: '/tratamientos' },
                { label: 'Equipo Médico', href: '/equipo' },
                { label: 'Resultados', href: '/resultados' },
                { label: 'Blog', href: '/blog' },
                { label: 'Dashboard', href: '/dashboard' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-doma-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-doma-accent mb-6 text-sm uppercase tracking-widest">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-doma-accent" />
                <span>Consultorio médico, Buenos Aires, Argentina</span>
              </li>
              <li>
                <a
                  href="tel:+5491100000000"
                  className="flex items-center gap-3 text-white/60 hover:text-doma-accent transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+54 9 11 0000-0000</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@domasculpt.com"
                  className="flex items-center gap-3 text-white/60 hover:text-doma-accent transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>info@domasculpt.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-doma-accent mb-6 text-sm uppercase tracking-widest">
              Seguinos
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-white/5 hover:bg-doma-accent/20 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 leading-relaxed">
                DOMA Sculpt Center opera bajo las regulaciones del
                Ministerio de Salud de la Nación. Todos nuestros
                profesionales están debidamente matriculados.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} DOMA Sculpt Center. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-doma-violet/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-doma-accent/5 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  )
}
