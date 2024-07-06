// src/app/character.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/people/`);
  }

  getCharacter(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/people/${id}/`);
  }

  getFilms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/films/`);
  }

  getFilm(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getSpecies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/species/`);
  }

  getVehicles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vehicles/`);
  }

  getVehicle(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getStarships(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/starships/`);
  }

  getStarship(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
