import { Component, effect, inject, Input, OnInit, signal } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-hero',
  imports: [ReactiveFormsModule, FormsModule, MatButtonModule, MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule],
  templateUrl: './update-heroe.component.html',
  styleUrl: './update-heroe.component.css',
})
export class UpdateHeroeComponent implements OnInit {
  private heroServices = inject(HeroeService);
  private router = inject(Router);

  @Input() id!: string;

  canSave = signal(true);

  genders = [
    {value: 'hombre', viewValue: 'Hombre'},
    {value: 'mujer', viewValue:'Mujer'},
  ];
  
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

  activeButton() {
       const validation = this.heroe()
     
      if(validation.name ==="" || validation.photo ==="" || validation.description ==="" || validation.gender ==="")
      {
        this.canSave.set(false)
      }
      else{
        this.canSave.set(true)
      }
  }

}
