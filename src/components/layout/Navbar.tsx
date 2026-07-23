'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Tratamientos', href: '/tratamientos' },
  { label: 'Equipo', href: '/equipo' },
  { label: 'Resultados', href: '/resultados' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
]

function NavbarContent({ pathname }: { pathname: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  const useSolidStyle = scrolled || pathname !== '/'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          useSolidStyle
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-doma-light/20 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-3">
            <Image
              src="/images/logos/DOMA_LOGO-DOMA-VIOLETA.svg"
              alt="DOMA Sculpt Center"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                  useSolidStyle
                    ? 'text-doma-dark hover:text-doma-violet hover:bg-doma-light/30'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contacto"
              className="hidden md:inline-flex btn-primary !py-2.5 !px-6 !text-sm"
            >
              Agendar Consulta
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden p-2 rounded-xl transition-colors',
                useSolidStyle ? 'text-doma-dark' : 'text-white'
              )}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden"
        >
          <div className="pt-24 px-8 flex-1 flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-bold text-doma-dark py-4 border-b border-doma-light/40 hover:text-doma-violet transition-colors"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8">
              <Link
                href="/contacto"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-center"
              >
                Agendar Consulta
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  return <NavbarContent key={pathname} pathname={pathname} />
}
