/*import { Injectable } from '@angular/core';
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
*/
// src/app/services/rm-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RmApiService {
  private readonly base = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  /** Obtiene la lista de personajes (paginada) */
  getCharacters(page = 1): Observable<any> {
    const params = new HttpParams().set('page', String(page));
    return this.http.get(`${this.base}/character`, { params })
      .pipe(
        catchError(err => {
          console.error('RM API getCharacters error', err);
          return throwError(() => err);
        })
      );
  }

  /** Busca personajes por nombre (usa el endpoint con query) */
  searchCharacters(name: string, page = 1): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('page', String(page));
    return this.http.get(`${this.base}/character`, { params })
      .pipe(
        catchError(err => {
          console.error('RM API searchCharacters error', err);
          return throwError(() => err);
        })
      );
  }

  /** Opcional: obtener un personaje por id */
  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.base}/character/${id}`)
      .pipe(
        catchError(err => {
          console.error('RM API getCharacterById error', err);
          return throwError(() => err);
        })
      );
  }
}
