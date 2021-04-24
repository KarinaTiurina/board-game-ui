export interface Category {
  idCategories: string;
  name: string;
  gameList?: Game[];
}

export interface Game {
  idGame: string;
  name: string;
  description_preview?: string;
  image_url?: string;
  price?: number;
  year_published?: number;
  min_players?: number;
  max_players?: number;
  min_playtime?: number;
  max_playtime?: number;
  min_age?: number;
  discount?: number;
  average_user_rating?: number;
  categories?: Category[];
  mechanics?: Mechanics[];
}

export interface Mechanics {
  idMechanics: string;
  name: string;
}