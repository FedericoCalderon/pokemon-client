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

    //   if (this.search.trim() == "") {
    //     this.getAllPokemons();
    //     return undefined;
    //   }
  
    //   const idSearch = this.pokemons.filter(pokemon => pokemon.name.toLowerCase() == this.search.toLowerCase())[0].id;
    //   if (!idSearch) return undefined
    //   this.pokemonService.searchPokemon(idSearch)
    //   .subscribe(pokemon => {
    //     this.pokemons = [pokemon];
    //   })
    //   return undefined;
    }
  
    showPopUp() {
      this.pokemonService.setTitle("Crear Pokemon");
      this.pokemonService.setPokemon();
      this.pokemonService.showPupUpForm(true);
    }
}
