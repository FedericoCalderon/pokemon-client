import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { Pokemon } from '../app/interfaces/pokemon.interface'
import { PokemonService } from './services/pokemon/pokemon-api.service';
describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const fakePokemon1: Pokemon = {
    attack: 1,
    defense: 100,
    hp: 100,
    id: 11,
    id_author: 1,
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/011.png",
    name: "Metapod",
    type: "Unknown",
    idAuthor: '1'
  };
  
  const fakePokemon2: Pokemon = {
    attack: 32,
    defense: 23,
    hp: 42,
    id: 22,
    id_author: 1,
    image: "mock_img",
    name: "pikachu",
    type: "Unknown",
    idAuthor: '1'
  }
  let fakeData: Pokemon[] = [
    fakePokemon1,
    fakePokemon2
  ]
  
  beforeEach(async () => {
   
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = TestBed.createComponent(AppComponent).componentInstance;
    app.ngOnInit();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Listado de Pokemon'`, () => {
    expect(app.title).toEqual('Listado de Pokemon');
  });
  it(`should have not as title 'No Listado de Pokemon'`, () => {
    expect(app.title).not.toBe('No Listado de Pokemon');
  });
  it(`should have as titleFormCreate 'Nuevo Pokemon'`, () => {
    expect(app.titleFormCreate).toEqual('Nuevo Pokemon');
  });
  it(`should have not as titleFormCreate 'false title'`, () => {
    expect(app.titleFormCreate).not.toBe('false title');
  });
  it(`should have as id of '1'`, () => {
    app.id = 1;
    expect(app.id).toBe(1);
  });
  it(`should have not as id of '2'`, () => {
    app.id = 1;
    expect(app.id).not.toBe(2);
  });
  it(`should have as name of 'test nombre'`, () => {
    app.name = 'test nombre';
    expect(app.name).toBe('test nombre');
  });
  it(`should have not as name of 'no test nombre'`, () => {
    app.name = 'test nombre';
    expect(app.name).not.toBe('no test nombre');
  });
  it(`should have an image`, () => {
    app.image = 'https://i.pinimg.com/originals/9f/6e/fa/9f6efa277ddcc1e8cfd059f2c560ee53.jpg';
    expect(app.image).toContain('.jpg');
  });
  it(`should have as search of 'test busqueda'`, () => {
    app.search = 'test busqueda';
    expect(app.search).toBe('test busqueda');
  });
  it(`should have not as name of 'no test busqueda'`, () => {
    app.search = 'test busqueda';
    expect(app.search).not.toBe('no test busqueda');
  });
  it(`should have as editBoolean of true`, () => {
    app.editBoolean = true;
    expect(app.editBoolean).toBe(true);
  });
  it(`should have not as name of false`, () => {
    app.editBoolean = true;
    expect(app.editBoolean).not.toBe(false);
  });
  it(`should have as attack of '100'`, () => {
    app.attack = 100;
    expect(app.attack).toBe(100);
  });
  it(`should have not as attack of '20'`, () => {
    app.attack = 100;
    expect(app.attack).not.toBe(20);
  });
  it(`should have as defense of '50'`, () => {
    app.attack = 50;
    expect(app.attack).toBe(50);
  });
  it(`should have not as defense of 80'`, () => {
    app.attack = 50;
    expect(app.attack).not.toBe(80);
  });
  it(`should call clear`, () => {
    const appSpy = spyOn(app, 'clear').and.returnValue();
    app.clear();
    expect(appSpy).toHaveBeenCalled();
  });
  it(`should clear data`, () => {
    app.id = 32; 
    app.attack = 45;
    app.defense = 23;
    app.name = 'pikachu';
    app.editBoolean = true;
    app.image = 'mock_image.png'
    app.clear();
    expect(app.attack).toBe(50);
    expect(app.defense).toBe(50);
    expect(app.name).toBe('');
    expect(app.id).toBe(0);
    expect(app.image).toBe('');
    expect(app.editBoolean).toBe(false);
  });
  it(`should change values`, () => {
    app.id = 32; 
    app.attack = 45;
    app.defense = 23;
    app.name = 'pikachu';
    app.editBoolean = true;
    app.image = 'mock_image.png';
    
    app.editPokemon(2,'nameTest','img_mock',90,80);

    expect(app.attack).toBe(90);
    expect(app.defense).toBe(80);
    expect(app.name).toBe('nameTest');
    expect(app.id).toBe(2);
    expect(app.image).toBe('img_mock');
  });

  it(`should call getAllPokemons`, () => {
    const appSpy = spyOn(app, 'getAllPokemons');
    app.getAllPokemons();
    expect(appSpy).toHaveBeenCalled();
  });
  it(`should getAllPokemons get correctly data`, () => {
    let callFakeGet = () =>  of(fakeData); 
    let service = fixture.debugElement.injector.get(PokemonService);
    spyOn(service, 'getPokemons').and.callFake(callFakeGet);
    app.getAllPokemons();
    expect(app.pokemons).toEqual(fakeData);
  });

  it(`should call savePokemon`, () => {
    const appSpy = spyOn(app, 'savePokemon');
    app.savePokemon();
    expect(appSpy).toHaveBeenCalled();
  });

  it(`should remove pokemon`, () => {
    const appSpy = spyOn(app, 'removePokemon');
    app.removePokemon(3);
    expect(appSpy).toHaveBeenCalled();
  });
  
 });
