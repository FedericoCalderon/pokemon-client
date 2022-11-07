import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon/pokemon-api.service';
import { Pokemon } from './interfaces/pokemon.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string;
  currentPage: number;

  constructor (private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.title = "Pokemons App";
    this.currentPage = this.pokemonService.paginationParam;
  }

  nextPage() {
    this.pokemonService.incrementParams();
    this.currentPage = this.pokemonService.paginationParam;
  }
  
  backPage() {
    this.pokemonService.decrementParams();
    this.currentPage = this.pokemonService.paginationParam;
  }

  parsePage(): string {
    let page = this.currentPage + 1;
    return page.toString();
  }

}
