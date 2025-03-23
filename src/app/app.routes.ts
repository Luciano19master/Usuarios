import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InfoUserComponent } from './pages/info-user/info-user.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent},
    {path: 'info-user/:_idUser', component: InfoUserComponent},
    {path: 'new-user', component: FormularioComponent},
    {path: 'update-user/:idUser', component: FormularioComponent },
    {path: '**', redirectTo: 'home'}
];
