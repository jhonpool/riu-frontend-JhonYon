import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Filter } from '../models/filter';
import { Heroe } from '../models/hero';


@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private heroes: Array<Heroe> = new Array();
  private _heroesList: BehaviorSubject<Array<Heroe>> = new BehaviorSubject(new Array<Heroe>());
  private _heroesUpdate: BehaviorSubject<Heroe> = new BehaviorSubject(new Heroe());
  private _total: BehaviorSubject<number> = new BehaviorSubject(0);

  public heroes$ = this._heroesList.asObservable();
  public heroeUpdate$ = this._heroesUpdate.asObservable();
  public totalheroes$ = this._total.asObservable();

  constructor() {
    this.initializeHeroes();
  }

  getAllActive(filter?: Filter) : Array<Heroe>{
    let filterList = new Array<Heroe>();
    if(filter && filter.filterValue !=="" )
    {
       filterList = this.heroes.filter(x => !x.isDeleted &&  x.name.toLocaleLowerCase().includes(filter.filterValue.toLocaleLowerCase()));
    }
    else
    {
       filterList = this.heroes.filter(x => !x.isDeleted);
    }
   
    this._total.next(filterList.length)
    return filterList;
  }

  getHeroesByFilter(filter: Filter) {
    let list = this.getAllActive(filter);
    let heroesFilter = list.slice((filter.pageSize * filter.page), ((filter.pageSize * filter.page) + filter.pageSize))
    this._heroesList.next(heroesFilter);
  }

  getHeroesById(idHero: string) {
    let heroe = this.heroes.find((x) => x.id == idHero);
    this._heroesUpdate.next(heroe as Heroe)
  }

  addHeroe(newHero: Heroe): void {
    this.heroes.push(newHero);
    let filterList = this.getAllActive();
    this._heroesList.next(filterList)
  }

  deleteHero(heroe: Heroe, filter: Filter) {
    let heroeDelete = this.heroes.find((x) => x.id == heroe.id) as Heroe;
    heroeDelete.isDeleted = true;

    let refreshList = this.getAllActive(filter);

    refreshList = refreshList.slice((filter.pageSize * filter.page), ((filter.pageSize * filter.page) + filter.pageSize))
    this._heroesList.next(refreshList)
  }

  updateHero(updateHeroe: Heroe) {
    let update = this.heroes.find((x) => x.id == updateHeroe.id) as Heroe;
    update.name = updateHeroe.name;
    update.description = updateHeroe.description;
    update.photo = update.photo;
    update.updateDate = new Date().toLocaleString();
    //this._heroesList.next(this.heroes.filter(x => !x.isDeleted))
  }

  initializeHeroes(): void {
    this.heroes.push(new Heroe("Spiderman","test"))
    this.heroes.push(new Heroe("Spiderman 2","test"))
    this.heroes.push(new Heroe("Spiderman 3","test"))
    this.heroes.push(new Heroe("Spiderman 4","test"))
    this.heroes.push(new Heroe("Spiderman 5","test"))
    this.heroes.push(new Heroe("Spiderman 6","test"))
    this.heroes.push(new Heroe("Spiderman 7","test"))
    this.heroes.push(new Heroe("Spiderman 8","test"))
    this.heroes.push(new Heroe("Spiderman 9","test"))
    this.heroes.push(new Heroe("Spiderman 10","test"))

    // this.heroes.push(new Heroe("Thor","test",11))
    // this.heroes.push(new Heroe("Thor 2","test",20))
    // this.heroes.push(new Heroe("Thor 3","test",21))
    // this.heroes.push(new Heroe("Thor 4","test",22))
    // this.heroes.push(new Heroe("Thor 5","test",23))
    // this.heroes.push(new Heroe("Thor 6","test",24))
    // this.heroes.push(new Heroe("Thor 7","test",25))
    // this.heroes.push(new Heroe("Thor 8","test",26))
    // this.heroes.push(new Heroe("Thor 9","test",27))
    // this.heroes.push(new Heroe("Thor 10","test",28))
  }
}
