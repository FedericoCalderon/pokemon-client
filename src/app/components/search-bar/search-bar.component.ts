import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon-api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  search: string;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.search = "";
  }

  onSearch(e: Event): void {
    this.pokemonService.searchLocalPokemon(this.search);
    }
  
    showPopUp() {
      this.pokemonService.setTitle("Crear Pokemon");
      this.pokemonService.setPokemon();
      this.pokemonService.showPupUpForm(true);
    }
}
