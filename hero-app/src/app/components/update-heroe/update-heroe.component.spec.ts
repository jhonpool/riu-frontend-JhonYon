import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateHeroeComponent } from './update-heroe.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../models/hero';
import { of } from 'rxjs';

describe('AddHeroComponent', () => {
  let component: UpdateHeroeComponent;
  let fixture: ComponentFixture<UpdateHeroeComponent>;
  let router: Router;
  let service: HeroeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHeroeComponent],
      providers:[Router,HeroeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHeroeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(HeroeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.id ="123";
    let spy = spyOn(service, 'getHeroesById');
    component.ngOnInit()
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("123");
  });

  it('submitForm', () => {
    let spyService = spyOn(service, 'updateHero');
    let spy = spyOn(router, 'navigate');

    component.submitForm();
    expect(spy).toHaveBeenCalledWith([`/main`]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyService).toHaveBeenCalledTimes(1);
  });

  it('cancel', () => {
    let spy = spyOn(router, 'navigate');
    component.cancel();
    expect(spy).toHaveBeenCalledWith([`/main`]);
  });
});
