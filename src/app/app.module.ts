import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainComponent} from './components/main/main.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BatteryComponent} from './components/battery/battery.component';
import {HttpClientModule} from "@angular/common/http";
import {LoaderComponent} from "./components/loader/loader.component";
import { QuizComponent } from './components/quiz/quiz.component';
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BatteryComponent,
    LoaderComponent,
    QuizComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
