import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User | null>
  public user: Observable<User | null>

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') ?? ''))
    this.user = this.userSubject.asObservable()
  }

  /**
   * Get User value
   */
  public get userValue(): User | null {
    return this.userSubject.value;
  }

  /**
   * Sign In
   * @param username 
   * @param password 
   * @returns Observable<User>
   */
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
        this.userSubject.next(user)

        return user
      }))
  }

  /**
   * Sign Out
   */
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user')
    this.userSubject.next(null)
    this.router.navigate(['/account/login'])
  }

  /**
   * Sign Up
   * @param user 
   * @returns 
   */
  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user)
  }

  /**
   * Get Users
   * @returns Observable<User[]>
   */
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
  }

  /**
   * Get User by Id
   * @param id 
   * @returns Observable<User>
   */
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`)
  }

  /**
   * Update User, Update authenticated user if this operation concerns their own record
   * @param id 
   * @param params 
   * @returns 
   */
  update(id: string, params: string[]) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue?.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  /**
   * Delete User by Id, Perform logout if the Authenticated user delete their own record
   * @param id 
   * @returns 
   */
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(
        map(x => {
          // Auto logout if the logged in user deleted their own record
          if (id == this.userValue?.id) this.logout()

          return x
        })
      )
  }
}
