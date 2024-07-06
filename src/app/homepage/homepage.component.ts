import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  filter: any = {
    movie: '',
    species: '',
    vehicle: '',
    starship: '',
    birthYear: '',
  };
  films: any[] = [];
  species: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  displayedColumns: string[] = ['index', 'name', 'species', 'birth_year'];
  loading: boolean = true;

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data.results;
      this.filteredCharacters = data.results;
      this.loading = false;
    });
    this.characterService
      .getFilms()
      .subscribe((data) => (this.films = data.results));
    this.characterService
      .getSpecies()
      .subscribe((data) => (this.species = data.results));
    this.characterService
      .getVehicles()
      .subscribe((data) => (this.vehicles = data.results));
    this.characterService
      .getStarships()
      .subscribe((data) => (this.starships = data.results));
  }

  applyFilter(): void {
    this.filteredCharacters = this.characters.filter((character) => {
      const matchMovie =
        !this.filter.movie || character.films.includes(this.filter.movie);
      const matchSpecies =
        !this.filter.species || character.species.includes(this.filter.species);
      const matchVehicle =
        !this.filter.vehicle ||
        character.vehicles.includes(this.filter.vehicle);
      const matchStarship =
        !this.filter.starship ||
        character.starships.includes(this.filter.starship);
      const matchBirthYear =
        !this.filter.birthYear ||
        character.birth_year === this.filter.birthYear.split(' ').join('');
      return (
        matchMovie &&
        matchSpecies &&
        matchVehicle &&
        matchStarship &&
        matchBirthYear
      );
    });
  }

  getBirthYears(): string[] {
    const years: string[] = [];
    for (let i = 0; i <= 100; i++) {
      years.push(`${i} BBY`);
    }
    for (let i = 1; i <= 100; i++) {
      years.push(`${i} ABY`);
    }
    return years;
  }

  navigateToProfile(character: any): void {
    const characterId = character.url.split('/')[5];
    this.router.navigate(['/profile', characterId]);
  }
}
