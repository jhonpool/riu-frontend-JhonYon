import { Injectable } from '@angular/core';
import { BehaviorSubject, skip, take} from 'rxjs';
import { Filter } from '../models/filter';
import { Heroe } from '../models/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes: Array<Heroe> = new Array();
  private _heroesList: BehaviorSubject<Array<Heroe>> = new BehaviorSubject(new Array<Heroe>);

  public heroes$ = this._heroesList.asObservable();

  constructor() {
    this.initializeHeroes();
  }

  getHeroesByFilter(filter: Filter) {
    let heroesFilter = this.heroes.slice((filter.sizePage * filter.page), ((filter.sizePage * filter.page) + filter.sizePage))
    this._heroesList.next(heroesFilter);
  }

  getHeroesById(idHero: number) {
    let heroe = this.heroes.find((x) => x.id == idHero);
    this._heroesList.next([heroe as Heroe])
  }

  addHero(newHero: Heroe): void {
    this.heroes.push(newHero);
    this._heroesList.next(this.heroes)
  }

  deleteHero(heroe: Heroe) {
    let heroeDelete = this.heroes.find((x) => x.id == heroe.id) as Heroe;
    heroeDelete.isDeleted = true;
    this._heroesList.next(this.heroes)
  }

  updateHero(updateHeroe: Heroe) {
    let update = this.heroes.find((x) => x.id == updateHeroe.id) as Heroe;
    update.name = updateHeroe.name;
    update.photo = update.photo;
    update.updateDate = new Date().getUTCDate().toLocaleString();
    this._heroesList.next(this.heroes)
  }

  initializeHeroes(): void {
    this.heroes.push(new Heroe("Spiderman",1))
    this.heroes.push(new Heroe("Spiderman 2",2))
    this.heroes.push(new Heroe("Spiderman 3",3))
    this.heroes.push(new Heroe("Spiderman 4",4))
    this.heroes.push(new Heroe("Spiderman 5",5))
    this.heroes.push(new Heroe("Spiderman 6",6))
    this.heroes.push(new Heroe("Spiderman 7",7))
    this.heroes.push(new Heroe("Spiderman 8",8))
    this.heroes.push(new Heroe("Spiderman 9",9))
    this.heroes.push(new Heroe("Spiderman 10",10))
  }
}
