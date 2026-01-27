export interface IDataYolo {
  id: number;
  conteo_por_tipo: {
    Vaca?: number;
  };
  peso_promedio: number;
  peso_total: number;
  total_animales: number;
  video_url: string;
  video_name: string;
  created_at: string;
}

export interface IDataYoloComplete {
  videos: IDataYolo[];
  total_pages: number;
  total: number;
  page: number;
  limit: number;
}
