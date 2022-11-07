import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon-api.service';


@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.css']
})
export class FormPopupComponent implements OnInit {

  titleForm: string;

  id: number;
  name: string;
  image: string;
  attack: number;
  defense: number;
  description: string;

  isEditable: boolean;
  
  search: string;

  showPopup: boolean = false;
  

  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
    
    this.setGlobalPokemonData();
    
    this.pokemonService.formDataSet$.subscribe( () => {
      this.titleForm = this.pokemonService.titleForm;
      this.setGlobalPokemonData();
    });
    
    this.pokemonService.updatePopUpShow$.subscribe(() => {
      this.showPopup = this.pokemonService.showPopUp;
    });
  }


  savePokemonData(): void {
    
    //   // check if, in boolean, these values are false; 
    if ((!this.name.trim() && !this.image.trim())) {
      alert("Debe asignar un nombre y una imagen");
      throw new Error("Debe asignar un nombre y una imagen");
    };
    
    if (this.attack > 100 || this.attack < 0) {
      alert("Debe asignar un ataque correcto");
      throw new Error("Ataque fuera de rango (entre 0 y 100)");
    }
    if (this.defense > 100 || this.defense < 0) {
      alert("Debe asignar una defensa correcta");
      throw new Error("Defensa fuera de rango (entre 0 y 100)");
    }

    if (this.isEditable == false) {
      this.pokemonService.postPokemon(
        this.name,
        this.image,
        this.attack,
        this.defense,
        this.description
      )
      .subscribe((response) => {
        console.log("Pokemon Added ("+response.info+")");
      });
    }
    else {
      this.pokemonService.setPokemon(this.id, this.name, this.image, this.attack, this.defense, this.description, this.isEditable);
      this.pokemonService.putPokemon().subscribe((response) => {
        console.log("Pokemon Modified ("+response.info+")");
      });
    }
    this.closeModal();
    return;
  }

  setGlobalPokemonData(): void {
    this.id = this.pokemonService.pokemon.id;
    this.name = this.pokemonService.pokemon.name;
    this.image = this.pokemonService.pokemon.image;
    this.attack = this.pokemonService.pokemon.attack;
    this.defense = this.pokemonService.pokemon.defense;
    this.description = this.pokemonService.pokemon.description;
    this.isEditable = this.pokemonService.isEditable;
  }

  closeModal() {
    this.pokemonService.setPokemon();
    this.pokemonService.showPupUpForm(false);
    this.pokemonService.refreshPagination$.next();
  }
}
