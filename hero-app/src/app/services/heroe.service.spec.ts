import { TestBed } from '@angular/core/testing';

import { HeroeService } from './heroe.service';
import { Filter } from '../models/filter';
import { Heroe } from '../models/hero';

describe('HeroeService', () => {
  let service: HeroeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getHeroesByFilter', () => {
    const filter = new Filter();
    filter.page = 0;
    filter.pageSize = 2;

    expect(service).toBeTruthy();
    service.getHeroesByFilter(filter);
    service.heroes$.subscribe( hereos => {
      expect(hereos.length).toBe(2);
      expect(hereos[0]).toBeInstanceOf(Heroe);
    })
  });

  it('getHeroesByFilter with filterValue', () => {
    const filter = new Filter();
    filter.page = 0;
    filter.pageSize = 2;
    filter.filterValue = "spider"

    expect(service).toBeTruthy();
    service.getHeroesByFilter(filter);
    service.heroes$.subscribe( hereos => {
      expect(hereos.length).toBe(2);
      expect(hereos[0]).toBeInstanceOf(Heroe);
      expect(hereos[0].name.toLocaleLowerCase()).toContain("spider");
    })
  });

  it('getHeroesByFilter with filterValue not exist', () => {
    const filter = new Filter();
    filter.page = 0;
    filter.pageSize = 2;
    filter.filterValue = "Pepito"

    expect(service).toBeTruthy();
    service.getHeroesByFilter(filter);
    service.heroes$.subscribe( hereos => {
      expect(hereos.length).toBe(0);
    })
  });

  it('getAllActive', () => {
    const filter = new Filter();
    filter.page = 0;
    filter.pageSize = 2;

    expect(service).toBeTruthy();
    const lista = service.getAllActive(filter);
    service.totalheroes$.subscribe( count => {
      expect(count).toBeDefined();
      expect(count).toBeGreaterThan(0);
    })

    expect(lista).toBeDefined();
    expect(lista[0]).toBeInstanceOf(Heroe);
  });

  it('getHeroesById', () => {
    const filter = new Filter();
    filter.page = 0;
    filter.pageSize = 2;

    expect(service).toBeTruthy();
    const lista = service.getAllActive(filter);
    expect(lista).toBeDefined();
    expect(lista[0]).toBeInstanceOf(Heroe);

    const first = lista[0];

    service.getHeroesById(first.id)
    
    service.heroeUpdate$.subscribe(heroe =>
      {
        expect(heroe).toBeDefined();
        expect(heroe).toBeInstanceOf(Heroe);
        expect(heroe.id).toEqual(first.id);
      }
    )
  });

  it('addHeroe', () => {
    const newHeroe = new Heroe("heroeTest","test","imagen")

    service.addHeroe(newHeroe)
    
    const filter = new Filter();
    filter.page = 0;
    filter.pageSize = 2;
    filter.filterValue = "heroeTest"

    expect(service).toBeTruthy();
    service.getHeroesByFilter(filter);
    service.heroes$.subscribe( hereos => {
      expect(hereos.length).toBe(1);
      expect(hereos[0]).toBeDefined();
      expect(hereos[0].name).toEqual("heroeTest");
    })
  });


  it('updateHero', () => {
    const filter = new Filter();
    filter.page = 0;
    filter.pageSize = 2;

    expect(service).toBeTruthy();
    const lista = service.getAllActive(filter);
    expect(lista).toBeDefined();
    expect(lista[0]).toBeInstanceOf(Heroe);

    const first = lista[0];

    //update
    first.name = "update name";
    first.photo = "update photo";
    first.description = "update description";
    service.updateHero(first)

    //find
    service.getHeroesById(first.id)
    service.heroeUpdate$.subscribe(heroe =>
      {
        expect(heroe).toBeDefined();
        expect(heroe).toBeInstanceOf(Heroe);
        expect(heroe.name).toEqual("update name");
        expect(heroe.photo).toEqual("update photo");
        expect(heroe.description).toEqual("update description");
      }
    )
  });

  it('deleteHero', () => {
    const filter = new Filter();
    filter.page = 0;
    filter.pageSize = 100;

    expect(service).toBeTruthy();
    const lista = service.getAllActive(filter);
    const countBeforeDelete = lista.length
    const first = lista[0];

    //find
    service.deleteHero(first, filter)
    service.heroes$.subscribe(heroes =>
      {
        expect(heroes).toBeDefined();
        expect(heroes.length).toBeLessThan(countBeforeDelete);
      }
    )
  });

});
