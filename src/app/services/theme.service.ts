import {effect, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode = signal<boolean>(
    JSON.parse(localStorage.getItem('darkMode') ?? 'false') as boolean
  );
  setTheme(){
    this.darkMode.update(t => !t);
  }
  constructor() {
    effect(() => {
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode()))
    });
  }
}

