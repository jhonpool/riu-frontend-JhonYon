import {
  Component,
  inject,
  OnInit,
  effect,
  signal,
  Input,
} from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { Heroe } from '../../models/hero';
import { Filter } from '../../models/filter';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-list-heroes',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './list-heroes.component.html',
  styleUrl: './list-heroes.component.css',
})
export class ListHeroesComponent implements OnInit {
  private heroServices = inject(HeroeService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  @Input() query! : string;

  //set table
  displayedColumns: string[] = [
    'name',
    'description',
    'photo',
    'createdDate',
    'updateDate',
    'options',
  ];

  setFilter = new Filter();
  
  searchValue = signal('');


  heroes = toSignal(this.heroServices.heroes$, {
    requireSync: true,
  });

  totalHeroes = toSignal(this.heroServices.totalheroes$, {
    requireSync: true,
  });

  dataSourceTable = new MatTableDataSource<Heroe>(this.heroes());


  constructor() {
    effect(() => {
      this.dataSourceTable = new MatTableDataSource<Heroe>(this.heroes());
    });

    effect(() => {
      this.setFilter.total = this.totalHeroes();
    });


  }


  ngOnInit(): void {
    if(this.query)
    {
      this.setFilter.filterValue = this.query;
    }

    this.heroServices.getHeroesByFilter(this.setFilter);
  }

 
  handlePageEvent(e: PageEvent) : void {
    this.setFilter.page = e.pageIndex
    this.heroServices.getHeroesByFilter(this.setFilter);
  }

  deleteHero(deleteHeroe: Heroe,enterAnimationDuration: string, exitAnimationDuration: string) : void {
   
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',enterAnimationDuration,
      exitAnimationDuration});

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.heroServices.deleteHero(deleteHeroe, this.setFilter);
      }
    });
  }

  redirectUpdate(updateHereo: Heroe) : void
  {
    this.router.navigate([`/update/${updateHereo.id}`]);
  }

  redirectAdd() : void
  {
    this.router.navigate([`/add`]);
  }

  searchHeroes(){
    this.setFilter.filterValue = this.searchValue()
    this.heroServices.getHeroesByFilter(this.setFilter);
  }
}
