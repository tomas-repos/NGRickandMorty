import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { RmApiService } from '../services/rm-api.service';

type SmallCharacter = {
  id?: number;
  name: string;
  image: string;
  species?: string;
  status?: string;
  origin?: { name?: string };
  location?: { name?: string };
};

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './characters.html',
  styleUrls: ['./characters.css']
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: SmallCharacter[] = [];
  loading = false;
  error = '';
  page = 1;
  query = '';

  private search$ = new Subject<string>();
  private sub = new Subscription();

  constructor(private api: RmApiService) {}

  ngOnInit() {
    // Carga por defecto la primera página
    this.loadPage(1);

    // Suscripción reactiva para la búsqueda con debounce
    const s = this.search$.pipe(
      tap(() => { this.loading = true; this.error = ''; }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(q => {
        if (!q) return this.api.getCharacters(1);
        return this.api.searchCharacters(q, 1);
      }),
      catchError(err => {
        // catchError aquí para que el stream no se complete; devolvemos un observable vacío
        this.error = 'Error en la búsqueda';
        this.loading = false;
        throw err;
      })
    ).subscribe({
      next: (res: any) => {
        this.characters = res?.results || [];
        this.page = 1;
        this.loading = false;
      },
      error: () => {
        // ya seteado en catchError; aseguramos estado
        this.characters = [];
        this.loading = false;
      }
    });

    this.sub.add(s);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Carga una página específica (paginación normal)
  loadPage(page = 1) {
    this.loading = true;
    this.error = '';
    this.api.getCharacters(page).subscribe({
      next: (res: any) => {
        this.characters = res?.results || [];
        this.page = page;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar personajes';
        this.characters = [];
        this.loading = false;
      }
    });
  }

  // Llamada desde el input para emitir cambios de búsqueda
  onQueryChange(q: string) {
    this.query = q;
    this.search$.next(q);
  }

  // Botón limpiar: vacía query y recarga la página 1
  clearSearch() {
    this.query = '';
    this.loadPage(1);
  }

  // Paginación simple
  next() {
    // Si hay query activo, la API de búsqueda también soporta page; aquí simplificamos recargando siguiente página
    if (this.query) {
      this.loading = true;
      this.api.searchCharacters(this.query, this.page + 1).subscribe({
        next: (res: any) => {
          this.characters = res?.results || [];
          this.page++;
          this.loading = false;
        },
        error: () => {
          this.error = 'No hay más resultados';
          this.loading = false;
        }
      });
      return;
    }
    this.loadPage(this.page + 1);
  }

  prev() {
    if (this.page <= 1) return;
    if (this.query) {
      this.loading = true;
      this.api.searchCharacters(this.query, this.page - 1).subscribe({
        next: (res: any) => {
          this.characters = res?.results || [];
          this.page--;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar página';
          this.loading = false;
        }
      });
      return;
    }
    this.loadPage(this.page - 1);
  }
}
