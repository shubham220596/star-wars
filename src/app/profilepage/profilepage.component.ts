// src/app/profilepage/profilepage.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.scss'],
})
export class ProfilepageComponent implements OnInit {
  character: any = {};
  films: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacter(id).subscribe((character) => {
        this.character = character;
        this.character.films.forEach((filmUrl: string) => {
          // Explicitly typing filmUrl as string
          this.characterService
            .getFilm(filmUrl)
            .subscribe((film) => this.films.push(film));
        });
        this.character.vehicles.forEach((vehicleUrl: string) => {
          // Explicitly typing vehicleUrl as string
          this.characterService
            .getVehicle(vehicleUrl)
            .subscribe((vehicle) => this.vehicles.push(vehicle));
        });
        this.character.starships.forEach((starshipUrl: string) => {
          // Explicitly typing starshipUrl as string
          this.characterService
            .getStarship(starshipUrl)
            .subscribe((starship) => this.starships.push(starship));
        });
      });
    }
  }
}
