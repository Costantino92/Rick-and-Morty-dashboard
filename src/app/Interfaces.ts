export interface character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: location;
  name: string;
  origin: origin;
  species: string;
  status: string;
  type: string;
  url: string;
  disabled?: boolean;
}

export interface apiResponse {
  info: info;
  results: character[];
}

interface info {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

interface origin {
  name: string;
  url: string;
}

interface location {
  name: string;
  url: string;
}
