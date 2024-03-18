import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }

  public get currentUser(): User {
    return this.currentUser.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('api/login', { username, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser.next(user);
        return user;
      }));
  }


}
