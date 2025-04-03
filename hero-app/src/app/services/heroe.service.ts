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
    let filterHero = new Heroe(heroe?.name,heroe?.description,heroe?.photo,heroe?.gender)
    filterHero.id = heroe!.id 
    filterHero.createdDate = heroe!.id 
    this._heroesUpdate.next(filterHero)
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
  }

  initializeHeroes(): void {
    this.heroes.push(new Heroe("Spiderman","superheroe de marvel"))
    this.heroes.push(new Heroe("Thor","superheroe de marvel"))
    this.heroes.push(new Heroe("Irom 3","superheroe de marvel"))
    this.heroes.push(new Heroe("mrRobot","serie"))
    this.heroes.push(new Heroe("Goku","manga"))
    this.heroes.push(new Heroe("Spiderman 2","tsuperheroe de marvelest"))
    this.heroes.push(new Heroe("Spiderman 3","superheroe de marvel"))
    this.heroes.push(new Heroe("xmen 1","superheroe de marvel"))
    this.heroes.push(new Heroe("batman","DC"))
    this.heroes.push(new Heroe("megaman","superheroe de marvel"))
  }
}
