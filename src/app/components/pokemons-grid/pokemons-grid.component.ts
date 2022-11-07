import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon/pokemon-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemons-grid',
  templateUrl: './pokemons-grid.component.html',
  styleUrls: ['./pokemons-grid.component.css']
})
export class PokemonsGridComponent implements OnInit {

  pokemonsData: Pokemon[][];
  pokemons: Pokemon[];
  suscription: Subscription;
  isEditable: boolean;
  page: number;
  loading: boolean;

  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {

    this.loading = true;

    this.getAllPokemons();

    this.pokemonService.refresh$.subscribe( () => {
      this.getAllPokemons(true);
    });
    
    this.pokemonService.refreshPagination$.subscribe( () => {
      this.getAllPokemons();
    });

    this.pokemonService.eventSearch$.subscribe (() => {
      this.filterPokemonsBySerch(this.pokemonService.getSearch());
    });
  }

  getAllPokemons(getFromAPI: boolean = false): void {
    if (this.pokemonsData == undefined || getFromAPI) {
      this.pokemonService.getPokemons()
      .subscribe((pokemonsApi) => {
        
        this.pokemonsData = this.paginateData(pokemonsApi?.data.reverse());
        this.setCurrentPage();
      });
    }
    else {
    this.setCurrentPage();
    }

  };

  removePokemon(id: number): void {
    this.pokemonService.deletePokemon(id)
    .subscribe( response => {
      alert('Pokemon Eliminado!');
    });
  };

  setPokemon(id: number ,name: string,image: string,attack: number,defense: number,description: string) {
    this.pokemonService.setTitle("Editar Pokemon");
    this.pokemonService.setPokemon(id, name, image, attack, defense, description, true); 
    this.pokemonService.showPupUpForm(true);
  };

  paginateData(pokemonsInput: Pokemon[]): Pokemon[][] {
    const pokemonsOut: Pokemon[][] = [];

    let pokemonsAux: Pokemon[] = [];

    const range = environment.PAGINATION_RANGE;

    for (let i = 0; i < pokemonsInput.length; i+=range) {
      pokemonsAux = pokemonsInput.slice(i, i+range);
      
      pokemonsOut.push(pokemonsAux);
    }
    return pokemonsOut; // cambiar
  }

  setCurrentPage(): void {
    if (this.pokemonService.paginationParam >= this.pokemonsData.length ) {
      this.pokemonService.decrementParams();
      return;
    };
    if (this.pokemonService.paginationParam < 0 ) {
      this.pokemonService.incrementParams();
      return;
    };
    this.page = this.pokemonService.paginationParam;
    this.pokemons = this.pokemonsData[this.page];
  }

  parseName(name: string): string {
    let nameParsed = name[0].toUpperCase() + name.slice(1);
    return nameParsed;
  }

  onLoad() {
    this.loading = false;
  }

  

  filterPokemonsBySerch(searchWord: string): void {
    this.setCurrentPage();

    let keyWord: string = searchWord.toLocaleLowerCase();    
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.name.includes(keyWord));
  }
}
