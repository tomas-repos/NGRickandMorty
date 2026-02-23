export interface ApiResponse<T> {
  results: T[];
  info: { pages: number; count?: number; next?: string; prev?: string };
}