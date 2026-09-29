// Team photo used behind full-screen heroes. Phones and tablets get the
// vertical crop (their hero is taller than wide); desktops get the 4:3 one.
// A <picture> lets the browser download only the version it needs.
export default function HeroBackground({ alt = '' }: { alt?: string }) {
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet="/images/team/DOMA-h.webp" />
      <img
        src="/images/team/DOMA-v.webp"
        alt={alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  )
}
