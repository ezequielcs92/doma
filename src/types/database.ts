export interface Medico {
  id: string;
  nombre: string;
  especialidad: string;
  matricula: string;
  foto_url: string;
  video_url?: string;
  curriculum: string[];
  trayectoria: string;
  slug: string;
}

export interface AntesDespues {
  id: string;
  medico_id: string;
  titulo: string;
  url_antes: string;
  url_despues: string;
  categoria: string;
}

export interface Lead {
  id?: string;
  created_at?: string;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  medico_id: string;
  status?: string;
}
