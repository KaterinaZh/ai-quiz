import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly THEME = 'main-user-theme';

  getTheme(): string | null {
    return localStorage.getItem(this.THEME);
  }

  setTheme(isLight: boolean) {
    localStorage.setItem(this.THEME, isLight ? 'light' : 'dark');
  }
}
