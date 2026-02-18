import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, of } from 'rxjs';
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
  totalPages = 1;
  query = '';

  private search$ = new Subject<string>();
  private sub = new Subscription();

  constructor(private api: RmApiService) {}

  ngOnInit() {
    // Carga inicial
    this.loadPage(1);

    // Suscripción reactiva para búsqueda con debounce
    const s = this.search$.pipe(
      tap(() => { this.loading = true; this.error = ''; }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(q => {
        if (!q) return this.api.getCharacters(1);
        return this.api.searchCharacters(q, 1);
      }),
      catchError(err => {
        this.error = 'No se encontraron resultados';
        this.loading = false;
        return of({ results: [], info: { pages: 1 } }); // devolvemos vacío para no romper el stream
      })
    ).subscribe({
      next: (res: any) => {
        this.characters = res?.results || [];
        this.page = 1;
        this.totalPages = res?.info?.pages || 1;
        this.loading = false;
      }
    });

    this.sub.add(s);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Carga una página específica
  loadPage(page = 1) {
    this.loading = true;
    this.error = '';
    this.api.getCharacters(page).subscribe({
      next: (res: any) => {
        this.characters = res?.results || [];
        this.page = page;
        this.totalPages = res?.info?.pages || 1;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar personajes';
        this.characters = [];
        this.loading = false;
      }
    });
  }

  // Input de búsqueda
  onQueryChange(q: string) {
    this.query = q;
    this.search$.next(q);
  }

  clearSearch() {
    this.query = '';
    this.loadPage(1);
  }

  // Paginación
  next() {
    const targetPage = this.page + 1;
    if (targetPage > this.totalPages) {
      this.error = 'No hay más páginas';
      return;
    }

    this.loading = true;
    const obs = this.query
      ? this.api.searchCharacters(this.query, targetPage)
      : this.api.getCharacters(targetPage);

    obs.subscribe({
      next: (res: any) => {
        this.characters = res?.results || [];
        this.page = targetPage;
        this.totalPages = res?.info?.pages || this.totalPages;
        this.loading = false;
      },
      error: () => {
        this.error = 'No hay más resultados';
        this.loading = false;
      }
    });
  }

  prev() {
    const targetPage = this.page - 1;
    if (targetPage < 1) return;

    this.loading = true;
    const obs = this.query
      ? this.api.searchCharacters(this.query, targetPage)
      : this.api.getCharacters(targetPage);

    obs.subscribe({
      next: (res: any) => {
        this.characters = res?.results || [];
        this.page = targetPage;
        this.totalPages = res?.info?.pages || this.totalPages;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar página';
        this.loading = false;
      }
    });
  }
}
