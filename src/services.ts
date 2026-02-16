import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RmApiService {
  private base = 'https://rickandmortyapi.com/api';
  constructor(private http: HttpClient) {}
  getCharacters(page = 1): Observable<any> {
    return this.http.get(`${this.base}/character?page=${page}`);
  }
  getCharacter(id: number) {
    return this.http.get(`${this.base}/character/${id}`);
  }
}
