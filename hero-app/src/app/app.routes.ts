import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./components/list-heroes/list-hereos.routes').then(
        (x) => x.routesList
      ),
    pathMatch: 'full'
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./components/add-hero/add-hero.routes').then(
        (x) => x.routesAdd
      )
  },
  {
    path: 'update/:id',
    loadChildren: () =>
      import('./components/update-heroe/update-heroe.routes').then(
        (x) => x.routesUpdate
      )
  },
  { path: '**', redirectTo: 'main' },
];
