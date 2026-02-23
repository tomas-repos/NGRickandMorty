import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RmApiService } from '../services/rm-api.service';

/*@Component({ 
  selector: 'app-characters', 
  standalone: true, 
  imports: [CommonModule, RouterModule,FormsModule], 
  templateUrl: './characters.html', 
  styleUrls: ['./characters.css'] 
}) 
export class CharactersComponent { 
  characters: any[] = []; 
  constructor(private rmApi: RmApiService) {} 
    ngOnInit() { 
      this.rmApi.getCharacters().subscribe(data => { this.characters = data.results; }); 
    } }
*/


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
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './characters.html',
  styleUrls: ['./characters.css']
})
export class CharactersComponent implements OnInit {
  characters: SmallCharacter[] = [];
  loading = false;
  error = '';
  page = 1;
  totalPages = 1;
  query = '';
  jumpPage: number | null = null;

  constructor(private api: RmApiService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page = 1) {
    console.log('Cargando página', page);
    this.loading = true;
    this.error = '';
    this.api.getCharacters(page).subscribe({
      next: (res: any) => {
        console.log('Respuesta API:', res);
        this.characters = res.results || [];
        this.page = page;
        this.totalPages = res.info.pages;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        if (err?.status === 404) {
          this.error = 'No se encontraron resultados';
        } else if (err?.status === 429) {
          this.error = 'Demasiadas peticiones, intenta de nuevo en unos segundos';
        } else {
          this.error = 'Error al cargar personajes';
        }
        this.characters = [];
        this.loading = false;
        this.cd.detectChanges();
      },
    });
  }

  onQueryChange(q: string) {
    this.query = q;
    console.log('Buscando:', q);
    if (!q) {
      this.loadPage(1);
      return;
    }

    this.loading = true;
    this.error = '';
    this.api.searchCharacters(q, 1).subscribe({
      next: (res: any) => {
        this.characters = res?.results || [];
        this.page = 1;
        this.totalPages = res?.info?.pages || 1;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        if (err?.status === 404) {
          this.error = 'No se encontraron resultados';
        } else if (err?.status === 429) {
          this.error = 'Demasiadas peticiones, intenta de nuevo en unos segundos';
        } else {
          this.error = 'Error al cargar personajes';
        }
        this.characters = [];
        this.loading = false;
        this.cd.detectChanges();
      },
    });
  }

  clearSearch() {
    this.query = '';
    this.loadPage(1);
  }

  next() {
    const targetPage = this.page + 1;
    if (targetPage > this.totalPages) return;

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
        this.cd.detectChanges(); // 👈 fuerza refresco
      },
      error: (err: any) => {
        if (err?.status === 404) {
          this.error = 'No se encontraron resultados';
        } else if (err?.status === 429) {
          this.error = 'Demasiadas peticiones, intenta de nuevo en unos segundos';
        } else {
          this.error = 'Error al cargar personajes';
        }
        this.characters = [];
        this.loading = false;
        this.cd.detectChanges();
      },
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
        this.cd.detectChanges(); // 👈 fuerza refresco
      },
      error: (err: any) => {
        if (err?.status === 404) {
          this.error = 'No se encontraron resultados';
        } else if (err?.status === 429) {
          this.error = 'Demasiadas peticiones, intenta de nuevo en unos segundos';
        } else {
          this.error = 'Error al cargar personajes';
        }
        this.characters = [];
        this.loading = false;
        this.cd.detectChanges();
      },
    });
  }
}
