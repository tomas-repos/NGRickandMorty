import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RmApiService {
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private base: string
  ) {}

  getCharacters(page = 1) {
    const params = new HttpParams().set('page', String(page));
    return this.http.get(`${this.base}/character`, { params })
      .pipe(
        catchError(err => {
          console.error('getCharacters error', err);
          return of({ results: [], info: { pages: 1 } });
        })
      );
  }

  searchCharacters(name: string, page = 1) {
    const params = new HttpParams()
      .set('name', name)
      .set('page', String(page));
    return this.http.get(`${this.base}/character`, { params })
      .pipe(
        catchError(err => {
          console.error('searchCharacters error', err);
          return of({ results: [], info: { pages: 1 } });
        })
      );
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.base}/character/${id}`)
      .pipe(
        catchError(err => {
          console.error('getCharacterById error', err);
          return throwError(() => err);
        })
      );
  }
}

/*import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RmApiService {
  private readonly base = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}


  getCharacters(page = 1) {
  const params = new HttpParams().set('page', String(page));
  return this.http.get(`${this.base}/character`, { params })
    .pipe(
      catchError(err => {
        console.error('getCharacters error', err);
        return of({ results: [], info: { pages: 1 } });
      })
    );
}

 searchCharacters(name: string, page = 1) {
  const params = new HttpParams()
    .set('name', name)
    .set('page', String(page));
  return this.http.get(`${this.base}/character`, { params })
    .pipe(
      catchError(err => {
        console.error('searchCharacters error', err);
        return of({ results: [], info: { pages: 1 } });
      })
    );
}


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
*/