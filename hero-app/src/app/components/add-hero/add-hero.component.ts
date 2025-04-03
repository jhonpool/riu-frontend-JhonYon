import { Component, inject, signal } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Heroe } from '../../models/hero';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-hero',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-hero.component.html',
  styleUrl: './add-hero.component.css',
})
export class AddHeroeComponent {
  private heroServices = inject(HeroeService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  heroeForm: FormGroup;

  errorName = signal('');
  errorPhoto = signal('');
  errorDescription = signal('');

  genders = [
    {value: 'hombre', viewValue: 'Hombre'},
    {value: 'mujer', viewValue:'Mujer'},
  ];

  constructor() {
    this.heroeForm = this.formBuilder.group({
      name: ['', Validators.required],
      photo: ['', Validators.required],
      description: ['', Validators.required],
      gender: ['hombre', Validators.required]
    });
  }

  submitForm(event: any) {
    event.preventDefault();
    if (this.heroeForm.valid) {
      let newHeroe = new Heroe(
        this.heroeForm.controls['name'].value,
        this.heroeForm.controls['description'].value,
        this.heroeForm.controls['photo'].value,
        this.heroeForm.controls['gender'].value
      );
      this.heroServices.addHeroe(newHeroe)
      this.router.navigate([`/main`]);
    }
  }

  cancel() {
    this.router.navigate([`/main`]);
  }

  updateErrorMessage() {
    if (this.heroeForm.controls['name'].hasError('required')) {
      this.errorName.set('El nombre es requerido');
    }

    if (this.heroeForm.controls['photo'].hasError('required')) {
      this.errorPhoto.set('La url de la foto es requerido');
    }

    if (this.heroeForm.controls['description'].hasError('required')) {
      this.errorDescription.set('El campo descripcion es requerido');
    }
  }
}
