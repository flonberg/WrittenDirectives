import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule, MatInput} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { MatGridListModule, MatListItem, MatListModule } from '@angular/material';


import { AppComponent } from './app.component';
import { DoseFxComponent } from './dose-fx/dose-fx.component';
import { AutocompleteFilterExample } from './autocomplete-filter-example/autocomplete-filter-example.component';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExpandRowsComponent } from './expand-rows/expand-rows.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DemogComponent } from './demog/demog.component';
import { PlansComponent } from './plans/plans.component';

@NgModule({
  declarations: [
    AppComponent,
    DoseFxComponent,
    AutocompleteFilterExample,
    ExpandRowsComponent,
    NavbarComponent,
    DemogComponent,
    PlansComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule,
    MatListModule,
    MatRadioModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    RouterModule.forRoot([
      { path: '', component: NavbarComponent },
      { path: '**', component: NavbarComponent },       // use for deployed .../index.html?planIdx=47948

 
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
