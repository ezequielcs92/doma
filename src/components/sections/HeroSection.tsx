'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Award, Star } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/team/DOMA.jpg"
          alt="DOMA Sculpt Center"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-doma-dark/95 via-doma-dark/80 to-doma-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-doma-dark/60 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-doma-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-doma-violet/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-doma-accent animate-pulse" />
                Centro de Excelencia Médica
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
            >
              Resultados naturales,
              <br />
              <span className="relative">
                <span className="text-doma-accent">pensados para vos.</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 8C50 2 150 2 298 8"
                    stroke="#00C9AF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-lg lg:text-xl text-white/70 max-w-lg leading-relaxed"
            >
              Evaluamos tu caso para lograr el resultado que buscas,
              con tecnología y seguimiento profesional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a href="/contacto" className="btn-primary group text-base">
                Quiero saber si soy candidato/a
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/tratamientos" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 hover:!text-white">
                Ver Tratamientos
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-6 pt-6"
            >
              {[
                { icon: Shield, text: 'Clínica Habilitada' },
                { icon: Award, text: 'Profesionales Certificados' },
                { icon: Star, text: '+1000 Procedimientos' },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/50 text-sm"
                >
                  <badge.icon className="w-4 h-4 text-doma-accent" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side - floating stats card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative">
              {/* Stats Card */}
              <div className="glass-card p-8 space-y-6 animate-float bg-doma-dark/80 backdrop-blur-xl border-white/25 shadow-2xl shadow-doma-dark/40">
                <h3 className="text-white font-extrabold text-2xl leading-none">¿Por qué DOMA?</h3>
                <div className="space-y-4">
                  {[
                    { value: '98%', label: 'Satisfacción de pacientes' },
                    { value: '+1000', label: 'Procedimientos realizados' },
                    { value: '15+', label: 'Años de experiencia combinada' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-doma-violet/70 border border-doma-light/30"
                    >
                      <span className="text-3xl font-black text-doma-accent leading-none min-w-[96px]">
                        {stat.value}
                      </span>
                      <span className="text-white text-base font-semibold leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative ring */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full border-2 border-doma-accent/20 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border border-doma-violet/30 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
