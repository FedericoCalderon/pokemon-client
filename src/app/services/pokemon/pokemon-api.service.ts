import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ParamsGet, Pokemon, RequestAPI} from 'src/app/interfaces/pokemon.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  // urlGetPost = environment.urlGetPost + environment.authorId;
  urlApi = environment.URL_API;

  public titleForm: string = "";

  public getApiPokemons: boolean = false;

  public refresh$ = new Subject<void>();
  
  public refreshPagination$ = new Subject<void>;
  
  public formDataSet$ = new Subject<void>();

  public updatePopUpShow$ = new Subject<void>();

  public showPopUp:boolean = false;
  
  public paramsGet: ParamsGet = {start: 1, end: environment.GET_DATA_LIMIT};

  public paginationParam: number = 0;

  private search: string;

  public eventSearch$ = new Subject<void>();

  public pokemon: Pokemon = {
    id: -1,
    name: "",
    image: "",
    attack: 50,
    defense: 50,
    description: "",
  }
  public isEditable: boolean = false;

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<RequestAPI> {
    return this.http.get<RequestAPI>(`${this.urlApi}?start=${this.paramsGet.start}&end=${this.paramsGet.end}`);
  }

  
  postPokemon (name: string,
    image: string,
    attack: number,
    defense: number,
    description: string): Observable<RequestAPI> {
      
      let pokemon = {
        name, 
        image, 
        attack, 
        defense,
        description
      }

      return this.http.post<RequestAPI>(this.urlApi, pokemon)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      )
  }

  putPokemon(): Observable<RequestAPI> {
    
      let pokemon: Pokemon = {
        id: this.pokemon.id,
        name: this.pokemon.name,
        image: this.pokemon.image,
        attack: this.pokemon.attack,
        defense: this.pokemon.defense,
        description: this.pokemon.description
      };

    return this.http.put<RequestAPI>(this.urlApi + pokemon.id, pokemon)
    .pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  deletePokemon(id: number): Observable<RequestAPI> {
    return this.http.delete<RequestAPI>(this.urlApi + id)
    .pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  setPokemon(id: number =-1,name: string="",image: string="",attack: number=50,defense: number=50,description: string="", isEditable: boolean=false): void
  {
    this.pokemon.id = id
    this.pokemon.name = name;
    this.pokemon.image = image;
    this.pokemon.attack = attack;
    this.pokemon.defense = defense;
    this.pokemon.description = description;

    this.isEditable = isEditable;

    this.formDataSet$.next();
  };

  showPupUpForm(bool: boolean) {
    this.showPopUp = bool;
    this.updatePopUpShow$.next();
  }

  setTitle(title: string): void {
    this.titleForm = title;
  }

  incrementParams() {
    this.paginationParam +=1;
    this.refreshPagination$.next();
  }

  decrementParams() {
    this.paginationParam -=1;
    this.refreshPagination$.next();
  }

  // searchPokemon (id: number) {
  //   return this.http.get<Pokemon>(environment.urlPutDeleteSearch + id)
  // }

  searchLocalPokemon(searchString: string): void {
    this.search = searchString;
    this.eventSearch$.next();
  }

  getSearch(): string {
    return this.search;
  }

}
