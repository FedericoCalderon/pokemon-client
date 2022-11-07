import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonService } from './services/pokemon/pokemon-api.service';
import { FormsModule } from '@angular/forms';
import { PokemonsGridComponent } from './components/pokemons-grid/pokemons-grid.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormPopupComponent } from './components/form-popup/form-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonsGridComponent,
    SearchBarComponent,
    FormPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
