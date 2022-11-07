import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsGridComponent } from './pokemons-grid.component';

describe('PokemonsGridComponent', () => {
  let component: PokemonsGridComponent;
  let fixture: ComponentFixture<PokemonsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
