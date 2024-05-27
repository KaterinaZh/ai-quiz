import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {QuizComponent} from "./components/quiz/quiz.component";

const routes: Routes = [
  {path: 'welcome', component: MainComponent},
  {path: 'quiz/:id', component: QuizComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
