import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UseraccountService {

  user: User = new User;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
   
  }

  public get userValue(): User {
    return this.user;
  }

  public setUser(user: User){
    this.user = user;
  }

  login(user: User ): Observable<User> {
    return this.http.post<any>(`${environment.baseUrl}/users/authenticate`, user);
  }

  logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('user');
    this.router.navigate(['/user/login']);
  }

  register(user: User): Observable<User> {
    console.log(user) 
    return this.http.post(`${environment.baseUrl}/users/register`, user);
  }

  // getAll(): Observable<User[]> {
  //   return this.http.get<any>(`${environment.baseUrl}/users`);
  // }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/users/${id}`);
  }

  update(id: string, user:User): Observable<User> {
    return this.http.put(`${environment.baseUrl}/users/${id}`, user)
      // .pipe(map(x => {
      //   // update stored user if the logged in user updated their own record
      //   if (id == this.userValue.id) {
      //     // update local storage
      //     const user = { ...this.userValue, ...params };
      //     localStorage.setItem('user', JSON.stringify(user));

      //     // publish updated user to subscribers
      //     this.userSubject.next(user);
      //   }
      //   return x;
      // }));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/users/${id}`)
      // .pipe(map(x => {
      //   // auto logout if the logged in user deleted their own record
      //   if (id == this.userValue.id) {
      //     this.logout();
      //   }
      //   return x;
      // }));
  }
}
