import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import Translations from './compendium/data/translations.json';
import FusionTools from './compendium/data/fusion-tools.json';

const LANGS = Translations.Languages.Languages;
const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'p3',     loadChildren: () => import('./p3/compendium.module').then(m => m.CompendiumModule) },
  { path: 'p3f',    loadChildren: () => import('./p3/compendium.module').then(m => m.CompendiumModule) },
  { path: 'p3n',     loadChildren: () => import('./p3/compendium.module').then(m => m.CompendiumModule) },
  { path: 'p3a',    loadChildren: () => import('./p3/compendium.module').then(m => m.CompendiumModule) },
  { path: 'p3na',     loadChildren: () => import('./p3/compendium.module').then(m => m.CompendiumModule) },
  { path: 'p3p',    loadChildren: () => import('./p3/compendium.module').then(m => m.CompendiumModule) },
  { path: 'p4',    loadChildren: () => import('./p4/compendium.module').then(m => m.CompendiumModule) },
  { path: 'p4g',    loadChildren: () => import('./p4/compendium.module').then(m => m.CompendiumModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

for (let i = 0; i < FusionTools.length; i++) {
  appRoutes[i + 2].data = { appName: FusionTools[i].titles[0], lang: LANGS[0] };
}

for (let i = 1; i < LANGS.length; i++) {
  const lang = LANGS[i];
  const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
  ];

  for (const tool of FusionTools) {
    if (tool.titles[i] && tool.titles[i] !== '-') {
      routes.push({
        path: tool.game,
        loadChildren: () => import(`./${tool.module}/compendium.module`).then(m => m.CompendiumModule),
        data: { appName: tool.titles[i], lang }
      });
    }
  }

  routes.push({ path: '**', redirectTo: 'home', pathMatch: 'full' });
  appRoutes.splice(2, 0, {
    path: lang,
    data: { lang },
    children: routes
  });
}

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
