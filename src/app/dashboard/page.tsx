'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import { Lead, Medico } from '@/types/database'
import { Session } from '@supabase/supabase-js'
import {
  Eye,
  EyeOff,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Save,
  FileText,
  Stethoscope,
  BarChart3,
  Users,
  MousePointerClick,
} from 'lucide-react'

type CmsBlogPost = {
  id?: string
  slug: string
  title: string
  excerpt: string
  cover: string
  date: string
  author: string
  category: string
  content: string
}

type NavigationMetric = {
  path: string
  views: number
  unique_users: number | null
}

const ADMIN_EMAIL = 'admin@doma.com'

const emptyBlogForm: CmsBlogPost = {
  slug: '',
  title: '',
  excerpt: '',
  cover: '/images/team/DOMA.jpg',
  date: new Date().toISOString().slice(0, 10),
  author: 'Equipo DOMA',
  category: 'Guia',
  content: '',
}

const emptyMedicoForm = {
  id: '',
  nombre: '',
  especialidad: '',
  matricula: '',
  foto_url: '/images/team/DOMA_Personal-9.jpg',
  video_url: '',
  slug: '',
  trayectoria: '',
  curriculumText: '',
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [cmsLoading, setCmsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'blog' | 'medicos' | 'estadisticas'>('blog')

  const [posts, setPosts] = useState<CmsBlogPost[]>([])
  const [blogForm, setBlogForm] = useState<CmsBlogPost>(emptyBlogForm)
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)

  const [medicos, setMedicos] = useState<Medico[]>([])
  const [medicoForm, setMedicoForm] = useState(emptyMedicoForm)
  const [editingMedicoId, setEditingMedicoId] = useState<string | null>(null)

  const [leads, setLeads] = useState<Lead[]>([])
  const [navigationMetrics, setNavigationMetrics] = useState<NavigationMetric[]>([])
  const [navigationWarning, setNavigationWarning] = useState<string | null>(null)

  useEffect(() => {
    async function initSession() {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession()
      setSession(currentSession)
      setAuthLoading(false)
    }

    initSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setAuthLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!session || session.user.email !== ADMIN_EMAIL) return

    async function loadCmsData() {
      setCmsLoading(true)
      setError(null)

      try {
        const [postsResponse, medicosResponse, leadsResponse, navigationResponse] = await Promise.all([
          supabase
            .from('blog_posts')
            .select('*')
            .order('date', { ascending: false }),
          supabase.from('medicos').select('*').order('nombre', { ascending: true }),
          supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(500),
          supabase.from('page_views').select('path,views,unique_users').order('views', { ascending: false }).limit(20),
        ])

        if (postsResponse.error) throw postsResponse.error
        if (medicosResponse.error) throw medicosResponse.error
        if (leadsResponse.error) throw leadsResponse.error

        const normalizedPosts: CmsBlogPost[] = (postsResponse.data || []).map((item: any) => ({
          id: item.id,
          slug: item.slug || '',
          title: item.title || '',
          excerpt: item.excerpt || '',
          cover: item.cover || '/images/team/DOMA.jpg',
          date: item.date || new Date().toISOString().slice(0, 10),
          author: item.author || 'Equipo DOMA',
          category: item.category || 'Guia',
          content: Array.isArray(item.content)
            ? item.content.join('\n\n')
            : (item.content as string) || '',
        }))

        setPosts(normalizedPosts)
        setMedicos((medicosResponse.data || []) as Medico[])
        setLeads((leadsResponse.data || []) as Lead[])

        if (navigationResponse.error) {
          setNavigationMetrics([])
          setNavigationWarning(
            'No se encontraron datos de navegacion. Crea la tabla page_views o conecta tu fuente de analytics.'
          )
        } else {
          setNavigationWarning(null)
          setNavigationMetrics((navigationResponse.data || []) as NavigationMetric[])
        }
      } catch (e: any) {
        const maybeBlogTableMissing =
          String(e?.message || '').toLowerCase().includes('blog_posts')
        setError(
          maybeBlogTableMissing
            ? 'No se encontro la tabla blog_posts en Supabase. Creala para gestionar articulos desde el CMS.'
            : 'No se pudieron cargar los datos del CMS. Revisa permisos RLS y sesion de administrador.'
        )
      } finally {
        setCmsLoading(false)
      }
    }

    loadCmsData()
  }, [session])

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError('Credenciales invalidas. Verifica email y contrasena.')
      return
    }

    if (data.user.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut()
      setError('Este usuario no tiene permisos de administrador CMS.')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setPosts([])
    setMedicos([])
    setEditingBlogId(null)
    setEditingMedicoId(null)
    setBlogForm(emptyBlogForm)
    setMedicoForm(emptyMedicoForm)
    setLeads([])
    setNavigationMetrics([])
  }

  function startEditBlog(post: CmsBlogPost) {
    setEditingBlogId(post.id || null)
    setBlogForm(post)
  }

  function resetBlogForm() {
    setEditingBlogId(null)
    setBlogForm({
      ...emptyBlogForm,
      date: new Date().toISOString().slice(0, 10),
    })
  }

  async function saveBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!blogForm.slug || !blogForm.title) {
      setError('Completa al menos titulo y slug del articulo.')
      return
    }

    const payload = {
      slug: blogForm.slug,
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      cover: blogForm.cover,
      date: blogForm.date,
      author: blogForm.author,
      category: blogForm.category,
      content: blogForm.content,
    }

    const response = editingBlogId
      ? await supabase.from('blog_posts').update(payload).eq('id', editingBlogId)
      : await supabase.from('blog_posts').insert([payload])

    if (response.error) {
      setError(`No se pudo guardar el articulo: ${response.error.message}`)
      return
    }

    resetBlogForm()

    const { data, error: reloadError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false })

    if (!reloadError) {
      const normalized: CmsBlogPost[] = (data || []).map((item: any) => ({
        id: item.id,
        slug: item.slug || '',
        title: item.title || '',
        excerpt: item.excerpt || '',
        cover: item.cover || '/images/team/DOMA.jpg',
        date: item.date || new Date().toISOString().slice(0, 10),
        author: item.author || 'Equipo DOMA',
        category: item.category || 'Guia',
        content: Array.isArray(item.content)
          ? item.content.join('\n\n')
          : (item.content as string) || '',
      }))
      setPosts(normalized)
    }
  }

  async function deleteBlog(id?: string) {
    if (!id) return
    const { error: deleteError } = await supabase.from('blog_posts').delete().eq('id', id)
    if (deleteError) {
      setError(`No se pudo eliminar el articulo: ${deleteError.message}`)
      return
    }
    setPosts((prev) => prev.filter((post) => post.id !== id))
    if (editingBlogId === id) resetBlogForm()
  }

  function startEditMedico(medico: Medico) {
    setEditingMedicoId(medico.id)
    setMedicoForm({
      id: medico.id,
      nombre: medico.nombre,
      especialidad: medico.especialidad,
      matricula: medico.matricula,
      foto_url: medico.foto_url,
      video_url: medico.video_url || '',
      slug: medico.slug,
      trayectoria: medico.trayectoria,
      curriculumText: (medico.curriculum || []).join('\n'),
    })
  }

  function resetMedicoForm() {
    setEditingMedicoId(null)
    setMedicoForm(emptyMedicoForm)
  }

  async function saveMedico(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!medicoForm.nombre || !medicoForm.slug) {
      setError('Completa al menos nombre y slug del profesional.')
      return
    }

    const payload = {
      nombre: medicoForm.nombre,
      especialidad: medicoForm.especialidad,
      matricula: medicoForm.matricula,
      foto_url: medicoForm.foto_url,
      video_url: medicoForm.video_url || null,
      slug: medicoForm.slug,
      trayectoria: medicoForm.trayectoria,
      curriculum: medicoForm.curriculumText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    }

    const response = editingMedicoId
      ? await supabase.from('medicos').update(payload).eq('id', editingMedicoId)
      : await supabase.from('medicos').insert([payload])

    if (response.error) {
      setError(`No se pudo guardar el profesional: ${response.error.message}`)
      return
    }

    resetMedicoForm()

    const { data, error: reloadError } = await supabase
      .from('medicos')
      .select('*')
      .order('nombre', { ascending: true })
    if (!reloadError) setMedicos((data || []) as Medico[])
  }

  async function deleteMedico(id: string) {
    const { error: deleteError } = await supabase.from('medicos').delete().eq('id', id)
    if (deleteError) {
      setError(`No se pudo eliminar el profesional: ${deleteError.message}`)
      return
    }
    setMedicos((prev) => prev.filter((m) => m.id !== id))
    if (editingMedicoId === id) resetMedicoForm()
  }

  const isAdmin = session?.user?.email === ADMIN_EMAIL

  const now = new Date()
  const leadsLast30 = leads.filter((lead) => {
    if (!lead.created_at) return false
    const created = new Date(lead.created_at)
    const diff = now.getTime() - created.getTime()
    return diff <= 30 * 24 * 60 * 60 * 1000
  }).length

  const statusStats = leads.reduce<Record<string, number>>((acc, lead) => {
    const status = (lead.status || 'pendiente').toLowerCase()
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  const totalPageViews = navigationMetrics.reduce((sum, item) => sum + (item.views || 0), 0)
  const totalUniqueUsers = navigationMetrics.reduce(
    (sum, item) => sum + (item.unique_users || 0),
    0
  )

  if (authLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-28 min-h-screen bg-surface px-6">
          <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-doma-light/40 p-10 text-center text-doma-muted font-semibold">
            Cargando acceso al CMS...
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen bg-surface">
        <section className="max-w-7xl mx-auto px-6">
          {!session && (
            <div className="max-w-md mx-auto rounded-3xl bg-white border border-doma-light/40 shadow-sm p-8">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-doma-violet/10 text-doma-violet text-xs font-bold uppercase tracking-widest mb-5">
                Admin Login
              </p>
              <h1 className="text-3xl font-black text-doma-dark mb-2">CMS DOMA</h1>
              <p className="text-sm text-doma-muted mb-6">
                Ingresa con tu cuenta de administrador para gestionar contenidos.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-doma-dark">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-doma-light/50 focus:outline-none focus:ring-2 focus:ring-doma-accent/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-doma-dark">Contrasena</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-doma-light/50 focus:outline-none focus:ring-2 focus:ring-doma-accent/40 pr-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-doma-muted"
                      aria-label="Mostrar u ocultar contrasena"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-semibold">
                    {error}
                  </div>
                )}
                <button type="submit" className="btn-primary w-full">
                  Ingresar al CMS
                </button>
              </form>
            </div>
          )}

          {session && !isAdmin && (
            <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-doma-light/40 shadow-sm p-8">
              <h2 className="text-2xl font-black text-doma-dark mb-2">Acceso denegado</h2>
              <p className="text-doma-muted mb-5">
                Esta cuenta no tiene permisos de administrador para acceder al CMS.
              </p>
              <button className="btn-secondary" onClick={handleLogout}>
                Cerrar sesion
              </button>
            </div>
          )}

          {session && isAdmin && (
            <>
              <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-doma-violet/10 text-doma-violet text-xs font-bold uppercase tracking-widest">
                    CMS Administracion
                  </p>
                  <h1 className="mt-4 text-4xl font-black text-doma-dark">
                    Gestion de Contenidos DOMA
                  </h1>
                  <p className="mt-2 text-doma-muted">
                    Administra articulos del blog y perfiles medicos desde un solo panel.
                  </p>
                </div>

                <button onClick={handleLogout} className="btn-secondary !py-2.5 !px-5 !text-sm inline-flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Cerrar sesion
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
                <aside className="rounded-3xl bg-white border border-doma-light/40 shadow-sm p-4 h-fit sticky top-28">
                  <p className="text-xs font-bold uppercase tracking-widest text-doma-muted px-3 py-2">Secciones CMS</p>
                  <div className="space-y-1.5 mt-2">
                    {[
                      { key: 'blog', label: 'Blog', icon: FileText },
                      { key: 'medicos', label: 'Profesionales', icon: Stethoscope },
                      { key: 'estadisticas', label: 'Estadisticas', icon: BarChart3 },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as 'blog' | 'medicos' | 'estadisticas')}
                        className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-bold transition-colors inline-flex items-center gap-2.5 ${
                          activeTab === tab.key
                            ? 'bg-doma-violet text-white'
                            : 'text-doma-violet hover:bg-doma-light/30'
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </aside>

                <div>
                  {activeTab === 'blog' && (
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                      <section className="xl:col-span-3 rounded-3xl bg-white border border-doma-light/40 shadow-sm overflow-hidden">
                        <header className="px-6 py-5 border-b border-doma-light/30 flex items-center justify-between">
                          <h2 className="text-lg font-black text-doma-dark">Articulos del blog</h2>
                          <span className="text-xs font-semibold text-doma-muted">{posts.length} items</span>
                        </header>
                        <div className="divide-y divide-doma-light/20">
                          {!cmsLoading && posts.length === 0 && (
                            <div className="p-6 text-sm text-doma-muted">No hay articulos todavia.</div>
                          )}
                          {posts.map((post) => (
                            <article key={post.id} className="p-6 flex items-start justify-between gap-4">
                              <div>
                                <p className="text-xs uppercase tracking-widest text-doma-accent font-bold mb-2">{post.category}</p>
                                <h3 className="text-xl font-black text-doma-dark">{post.title}</h3>
                                <p className="text-sm text-doma-muted mt-2">/{post.slug}</p>
                                <p className="text-sm text-doma-muted mt-1">{post.author} • {post.date}</p>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => startEditBlog(post)} className="w-9 h-9 rounded-xl border border-doma-light/60 text-doma-violet inline-flex items-center justify-center hover:bg-doma-light/30 transition-colors">
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteBlog(post.id)} className="w-9 h-9 rounded-xl border border-red-200 text-red-600 inline-flex items-center justify-center hover:bg-red-50 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>

                      <section className="xl:col-span-2 rounded-3xl bg-white border border-doma-light/40 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                          <h2 className="text-lg font-black text-doma-dark">
                            {editingBlogId ? 'Editar articulo' : 'Nuevo articulo'}
                          </h2>
                          <button onClick={resetBlogForm} type="button" className="text-xs font-bold uppercase tracking-widest text-doma-violet hover:text-doma-accent transition-colors">
                            Limpiar
                          </button>
                        </div>
                        <form onSubmit={saveBlog} className="space-y-3">
                          <input value={blogForm.title} onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Titulo" className="w-full px-4 py-3 rounded-xl border border-doma-light/60" required />
                          <div className="flex gap-2">
                            <input value={blogForm.slug} onChange={(e) => setBlogForm((prev) => ({ ...prev, slug: e.target.value }))} placeholder="slug-articulo" className="flex-1 px-4 py-3 rounded-xl border border-doma-light/60" required />
                            <button type="button" onClick={() => setBlogForm((prev) => ({ ...prev, slug: slugify(prev.title) }))} className="px-3 rounded-xl border border-doma-light/60 text-xs font-bold text-doma-violet hover:bg-doma-light/30">
                              Auto
                            </button>
                          </div>
                          <input value={blogForm.excerpt} onChange={(e) => setBlogForm((prev) => ({ ...prev, excerpt: e.target.value }))} placeholder="Extracto" className="w-full px-4 py-3 rounded-xl border border-doma-light/60" />
                          <input value={blogForm.cover} onChange={(e) => setBlogForm((prev) => ({ ...prev, cover: e.target.value }))} placeholder="/images/..." className="w-full px-4 py-3 rounded-xl border border-doma-light/60" />
                          <div className="grid grid-cols-2 gap-2">
                            <input value={blogForm.author} onChange={(e) => setBlogForm((prev) => ({ ...prev, author: e.target.value }))} placeholder="Autor" className="w-full px-4 py-3 rounded-xl border border-doma-light/60" />
                            <input value={blogForm.category} onChange={(e) => setBlogForm((prev) => ({ ...prev, category: e.target.value }))} placeholder="Categoria" className="w-full px-4 py-3 rounded-xl border border-doma-light/60" />
                          </div>
                          <input type="date" value={blogForm.date} onChange={(e) => setBlogForm((prev) => ({ ...prev, date: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-doma-light/60" />
                          <textarea value={blogForm.content} onChange={(e) => setBlogForm((prev) => ({ ...prev, content: e.target.value }))} rows={8} placeholder="Contenido del articulo..." className="w-full px-4 py-3 rounded-xl border border-doma-light/60 resize-none" />
                          <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                            {editingBlogId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            {editingBlogId ? 'Guardar cambios' : 'Crear articulo'}
                          </button>
                        </form>
                      </section>
                    </div>
                  )}

                  {activeTab === 'medicos' && (
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                      <section className="xl:col-span-3 rounded-3xl bg-white border border-doma-light/40 shadow-sm overflow-hidden">
                        <header className="px-6 py-5 border-b border-doma-light/30 flex items-center justify-between">
                          <h2 className="text-lg font-black text-doma-dark">Profesionales medicos</h2>
                          <span className="text-xs font-semibold text-doma-muted">{medicos.length} items</span>
                        </header>
                        <div className="divide-y divide-doma-light/20">
                          {!cmsLoading && medicos.length === 0 && (
                            <div className="p-6 text-sm text-doma-muted">No hay medicos cargados.</div>
                          )}
                          {medicos.map((medico) => (
                            <article key={medico.id} className="p-6 flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-xl font-black text-doma-dark">{medico.nombre}</h3>
                                <p className="text-sm text-doma-muted mt-1">{medico.especialidad}</p>
                                <p className="text-sm text-doma-muted mt-1">/{medico.slug} • {medico.matricula}</p>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => startEditMedico(medico)} className="w-9 h-9 rounded-xl border border-doma-light/60 text-doma-violet inline-flex items-center justify-center hover:bg-doma-light/30 transition-colors">
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteMedico(medico.id)} className="w-9 h-9 rounded-xl border border-red-200 text-red-600 inline-flex items-center justify-center hover:bg-red-50 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>

                      <section className="xl:col-span-2 rounded-3xl bg-white border border-doma-light/40 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                          <h2 className="text-lg font-black text-doma-dark">
                            {editingMedicoId ? 'Editar profesional' : 'Nuevo profesional'}
                          </h2>
                          <button onClick={resetMedicoForm} type="button" className="text-xs font-bold uppercase tracking-widest text-doma-violet hover:text-doma-accent transition-colors">
                            Limpiar
                          </button>
                        </div>
                        <form onSubmit={saveMedico} className="space-y-3">
                          <input value={medicoForm.nombre} onChange={(e) => setMedicoForm((prev) => ({ ...prev, nombre: e.target.value }))} placeholder="Nombre completo" className="w-full px-4 py-3 rounded-xl border border-doma-light/60" required />
                          <div className="flex gap-2">
                            <input value={medicoForm.slug} onChange={(e) => setMedicoForm((prev) => ({ ...prev, slug: e.target.value }))} placeholder="slug" className="flex-1 px-4 py-3 rounded-xl border border-doma-light/60" required />
                            <button type="button" onClick={() => setMedicoForm((prev) => ({ ...prev, slug: slugify(prev.nombre) }))} className="px-3 rounded-xl border border-doma-light/60 text-xs font-bold text-doma-violet hover:bg-doma-light/30">
                              Auto
                            </button>
                          </div>
                          <input value={medicoForm.especialidad} onChange={(e) => setMedicoForm((prev) => ({ ...prev, especialidad: e.target.value }))} placeholder="Especialidad" className="w-full px-4 py-3 rounded-xl border border-doma-light/60" />
                          <input value={medicoForm.matricula} onChange={(e) => setMedicoForm((prev) => ({ ...prev, matricula: e.target.value }))} placeholder="Matricula" className="w-full px-4 py-3 rounded-xl border border-doma-light/60" />
                          <input value={medicoForm.foto_url} onChange={(e) => setMedicoForm((prev) => ({ ...prev, foto_url: e.target.value }))} placeholder="URL foto" className="w-full px-4 py-3 rounded-xl border border-doma-light/60" />
                          <input value={medicoForm.video_url} onChange={(e) => setMedicoForm((prev) => ({ ...prev, video_url: e.target.value }))} placeholder="URL video (opcional)" className="w-full px-4 py-3 rounded-xl border border-doma-light/60" />
                          <textarea value={medicoForm.trayectoria} onChange={(e) => setMedicoForm((prev) => ({ ...prev, trayectoria: e.target.value }))} rows={4} placeholder="Trayectoria" className="w-full px-4 py-3 rounded-xl border border-doma-light/60 resize-none" />
                          <textarea value={medicoForm.curriculumText} onChange={(e) => setMedicoForm((prev) => ({ ...prev, curriculumText: e.target.value }))} rows={5} placeholder="Curriculum (una linea por item)" className="w-full px-4 py-3 rounded-xl border border-doma-light/60 resize-none" />
                          <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                            {editingMedicoId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            {editingMedicoId ? 'Guardar cambios' : 'Crear profesional'}
                          </button>
                        </form>
                      </section>
                    </div>
                  )}

                  {activeTab === 'estadisticas' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <article className="rounded-2xl p-5 bg-doma-dark text-white shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs uppercase tracking-widest font-bold opacity-80">Total leads</p>
                            <Users className="w-4 h-4 opacity-80" />
                          </div>
                          <p className="text-3xl font-black">{leads.length}</p>
                        </article>
                        <article className="rounded-2xl p-5 bg-white border border-doma-light/50 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs uppercase tracking-widest font-bold text-doma-muted">Leads ultimos 30 dias</p>
                            <BarChart3 className="w-4 h-4 text-doma-muted" />
                          </div>
                          <p className="text-3xl font-black text-doma-dark">{leadsLast30}</p>
                        </article>
                        <article className="rounded-2xl p-5 bg-white border border-doma-light/50 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs uppercase tracking-widest font-bold text-doma-muted">Page views</p>
                            <MousePointerClick className="w-4 h-4 text-doma-muted" />
                          </div>
                          <p className="text-3xl font-black text-doma-dark">{totalPageViews}</p>
                        </article>
                        <article className="rounded-2xl p-5 bg-doma-accent text-white shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs uppercase tracking-widest font-bold opacity-80">Usuarios unicos</p>
                            <Users className="w-4 h-4 opacity-80" />
                          </div>
                          <p className="text-3xl font-black">{totalUniqueUsers}</p>
                        </article>
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <section className="xl:col-span-2 rounded-3xl bg-white border border-doma-light/40 shadow-sm overflow-hidden">
                          <header className="px-6 py-5 border-b border-doma-light/30 flex items-center justify-between">
                            <h2 className="text-lg font-black text-doma-dark">Leads recientes</h2>
                            <span className="text-xs font-semibold text-doma-muted">Top 20</span>
                          </header>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[760px]">
                              <thead>
                                <tr className="text-left text-xs uppercase tracking-wider text-doma-muted border-b border-doma-light/30">
                                  <th className="px-6 py-3">Fecha</th>
                                  <th className="px-6 py-3">Nombre</th>
                                  <th className="px-6 py-3">Email</th>
                                  <th className="px-6 py-3">Telefono</th>
                                  <th className="px-6 py-3">Estado</th>
                                </tr>
                              </thead>
                              <tbody>
                                {leads.slice(0, 20).map((lead, index) => (
                                  <tr key={`${lead.id || lead.email}-${index}`} className="border-b last:border-b-0 border-doma-light/20 text-sm">
                                    <td className="px-6 py-4 text-doma-muted">
                                      {lead.created_at
                                        ? new Date(lead.created_at).toLocaleDateString('es-AR')
                                        : '-'}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-doma-dark">{lead.nombre}</td>
                                    <td className="px-6 py-4 text-doma-muted">{lead.email}</td>
                                    <td className="px-6 py-4 text-doma-muted">{lead.telefono}</td>
                                    <td className="px-6 py-4">
                                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-doma-light/40 text-doma-violet">
                                        {lead.status || 'pendiente'}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                                {leads.length === 0 && (
                                  <tr>
                                    <td className="px-6 py-6 text-sm text-doma-muted" colSpan={5}>
                                      No hay leads para mostrar.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </section>

                        <section className="rounded-3xl bg-white border border-doma-light/40 shadow-sm p-6">
                          <h2 className="text-lg font-black text-doma-dark mb-4">Navegacion del sitio</h2>
                          {navigationWarning && (
                            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                              {navigationWarning}
                            </p>
                          )}
                          <div className="space-y-3">
                            {navigationMetrics.slice(0, 10).map((item) => (
                              <div key={item.path} className="p-3 rounded-xl bg-surface border border-doma-light/30">
                                <p className="text-sm font-bold text-doma-dark truncate">{item.path}</p>
                                <p className="text-xs text-doma-muted mt-1">
                                  Views: {item.views} {item.unique_users !== null ? `• Unicos: ${item.unique_users}` : ''}
                                </p>
                              </div>
                            ))}
                            {!navigationWarning && navigationMetrics.length === 0 && (
                              <p className="text-sm text-doma-muted">No hay datos de navegacion cargados.</p>
                            )}
                          </div>

                          <div className="mt-6 pt-4 border-t border-doma-light/40">
                            <p className="text-sm font-bold text-doma-dark mb-2">Leads por estado</p>
                            <div className="space-y-2 text-sm">
                              {Object.entries(statusStats).map(([status, value]) => (
                                <div key={status} className="flex items-center justify-between">
                                  <span className="text-doma-muted capitalize">{status}</span>
                                  <span className="font-black text-doma-dark">{value}</span>
                                </div>
                              ))}
                              {Object.keys(statusStats).length === 0 && (
                                <p className="text-doma-muted">Sin datos de estado.</p>
                              )}
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
