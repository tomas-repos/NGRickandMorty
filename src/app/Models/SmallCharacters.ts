/*export interface SmallCharacter {
  id: number;
  name: string;
  image: string;
  species?: string;
  status?: string;
  origin?: { name?: string };
  location?: { name?: string };
}
*/
export interface SmallCharacter {
  id: number;
  name: string;
  status: string;      // "Alive" | "Dead" | "unknown"
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
