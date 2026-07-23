import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default function MedicalFooter() {
  return (
    <footer className="bg-white border-t border-doma-light/40">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-doma-violet mb-4">
              DOMA Sculpt Center
            </h4>
            <p className="text-sm text-doma-muted leading-relaxed">
              Medicina y cirugia estetica avanzada con estandares de excelencia
              medica y acompanamiento personalizado.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-doma-violet mb-4">
              Direccion
            </h4>
            <div className="flex items-start gap-3 text-sm text-doma-muted">
              <MapPin className="w-4 h-4 mt-0.5 text-doma-accent" />
              <span>Av. del Libertador 5990, Belgrano</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-doma-violet mb-4">
              Contacto
            </h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+5491130253305" className="flex items-center gap-3 text-doma-muted hover:text-doma-violet transition-colors">
                <Phone className="w-4 h-4 text-doma-accent" />
                <span>+54 9 11 3025-3305</span>
              </a>
              <a href="mailto:info@domasculpt.com" className="flex items-center gap-3 text-doma-muted hover:text-doma-violet transition-colors">
                <Mail className="w-4 h-4 text-doma-accent" />
                <span>info@domasculpt.com</span>
              </a>
              <div className="flex items-center gap-3 text-doma-muted">
                <Clock className="w-4 h-4 text-doma-accent" />
                <span>Lun-Vie 11:00 a 19:00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-doma-violet mb-4">
              Redes
            </h4>
            <p className="text-sm leading-relaxed text-doma-muted">
              Consultas y turnos por los canales de contacto publicados.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-doma-light/50 flex flex-col md:flex-row gap-3 justify-between text-xs text-doma-muted">
          <p>© {new Date().getFullYear()} DOMA Sculpt Center. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <Link href="/privacidad" className="hover:text-doma-violet transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-doma-violet transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
