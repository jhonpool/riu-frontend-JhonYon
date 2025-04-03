import { Component, inject} from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Heroe } from '../../models/hero';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-hero',
  imports: [ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './add-hero.component.html',
  styleUrl: './add-hero.component.css'
})
export class AddHeroeComponent {
  private heroServices = inject(HeroeService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  heroeForm: FormGroup;

  constructor(){
    this.heroeForm = this.formBuilder.group({
      name: ['', Validators.required],
      photo: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitForm(event : any)
  {
    event.preventDefault();
    if(this.heroeForm.valid)
    {
      let newHeroe = new Heroe(this.heroeForm.controls["name"].value,this.heroeForm.controls["description"].value,this.heroeForm.controls["photo"].value)
      console.log(newHeroe)
      this.heroServices.addHeroe(newHeroe)
      this.router.navigate([`/main`]);
    }
  }

  cancel() {
    this.router.navigate([`/main`]);
  }
}
