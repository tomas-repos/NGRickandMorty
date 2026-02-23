/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RmApiService } from '../services/rm-api.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.html',
  styleUrls: ['./character-detail.css']
})
export class CharacterDetail {
  character: any;

  constructor(private route: ActivatedRoute, private rmApi: RmApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rmApi.getCharacterById(id).subscribe(data => {
        this.character = data;
      });
    }
  }
}
*/
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RmApiService } from '../services/rm-api.service';
import { SmallCharacter } from '../Models/SmallCharacters';
@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.html',
  styleUrls: ['./character-detail.css'],
})
export class CharacterDetail implements OnInit {
  character?: SmallCharacter;

  constructor(private route: ActivatedRoute, private api: RmApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Cargando detalle del personaje con ID', id);
    this.api.getCharacterById(id).subscribe({
      
      next: (res) => {
        console.log('Respuesta API detalle:', res);
        this.character = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando personaje', err);
      }
    });
  }
}
