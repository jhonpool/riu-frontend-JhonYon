import { Component, inject, Input, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-hero',
  imports: [ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './update-heroe.component.html',
  styleUrl: './update-heroe.component.css',
})
export class UpdateHeroeComponent implements OnInit {
  private heroServices = inject(HeroeService);
  private router = inject(Router);

  @Input() id!: string;
  
  heroe = toSignal(this.heroServices.heroeUpdate$, {
    requireSync: true,
  });

  ngOnInit(): void {
    if (this.id) {
      this.heroServices.getHeroesById(this.id);
    }
  }

  submitForm() {
    this.heroServices.updateHero(this.heroe());
    this.router.navigate([`/main`]);
  }

  cancel() {
    this.router.navigate([`/main`]);
  }
}
