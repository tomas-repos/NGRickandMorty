/*import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RmApiService {
  private http = inject(HttpClient);
  private apiUrl = inject<string>('API_URL'); // token que definiste en main.ts

  getCharacters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character`);
  }

  getCharacterById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/${id}`);
  }
}
*/
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { SmallCharacter } from '../Models/SmallCharacters';
@Injectable({ providedIn: 'root' })
export class RmApiService {
  characters: SmallCharacter[] = [];//declaracion sugerida

  private baseUrl = 'https://rickandmortyapi.com/api';
  constructor(private http: HttpClient) {}
  
getCharacters(page: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/character?page=${page}`);
}



  searchCharacters(query: string, page: number): Observable<ApiResponse<SmallCharacter>> {
    return this.http.get<ApiResponse<SmallCharacter>>(
      `${this.baseUrl}/character?name=${query}&page=${page}`,
    );
  }
  getCharacterById(id: number): Observable<SmallCharacter> {
    console.log('API getCharacterById llamado con ID', id);
    return this.http.get<SmallCharacter>(`${this.baseUrl}/character/${id}`).pipe(
      catchError((err) => {
        console.error('getCharacterById error', err);
        return throwError(() => err);
      }),
    );
  }
}