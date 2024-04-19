export interface AnimeListResponse {
  data: Anime[];
  pagination: PaginationInfo;
}

export interface Anime {
  mal_id: number;
  title: string;
  images: AnimeImages;
  rating: string;
  score: string;
  year: string;
  synopsis: string;
}

interface AnimeImages {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
}

interface PaginationInfo {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}
