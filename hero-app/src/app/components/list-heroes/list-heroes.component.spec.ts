import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeroesComponent } from './list-heroes.component';
import { Router } from '@angular/router';
import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../models/hero';
import { PageEvent } from '@angular/material/paginator';

describe('ListHeroesComponent', () => {
  let component: ListHeroesComponent;
  let fixture: ComponentFixture<ListHeroesComponent>;
  let router: Router;
  let service: HeroeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHeroesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHeroesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(HeroeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.query ="spiderman";
    let spy = spyOn(service, 'getHeroesByFilter');
    component.ngOnInit()
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.setFilter.filterValue).toEqual("spiderman");
  });

  
  it('handlePageEvent', () => {
    const page = {
      pageIndex : 1
    }

    let spy = spyOn(service, 'getHeroesByFilter');
    component.handlePageEvent(page as PageEvent);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.setFilter.page).toEqual(page.pageIndex);
  });

  it('redirectUpdate', () => {
    let heroe = new Heroe();
    let spy = spyOn(router, 'navigate');
    component.redirectUpdate(heroe);
    expect(spy).toHaveBeenCalledWith([`/update/${heroe.id}`]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('redirectAdd', () => {
    let spy = spyOn(router, 'navigate');

    component.redirectAdd();
    expect(spy).toHaveBeenCalledWith([`/add`]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('searchHeroes', () => {
    component.searchValue.set("busqueda")
    let spy = spyOn(service, 'getHeroesByFilter');
    component.searchHeroes();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.setFilter.filterValue).toEqual("busqueda");
  });

  it('handlePageEvent', () => {
    const page = {
      pageIndex : 1
    }

    let spy = spyOn(service, 'getHeroesByFilter');
    component.handlePageEvent(page as PageEvent);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.setFilter.page).toEqual(page.pageIndex);
  });
});
