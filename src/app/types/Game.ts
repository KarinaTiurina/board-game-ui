export interface Category {
  idCategories: string;
  name: string;
  gameList?: Game[];
}

export interface Game {
  name: string;
  description?: string;
  image_url?: string;
  price?: number;
  year_published?: number;
}