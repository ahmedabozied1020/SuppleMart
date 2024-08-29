import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationRequestsService {

  constructor(private httpClient: HttpClient) { }

  register(user:{name:string,email:string,password:string}): Observable<{success:string, error:string}>{
    return this.httpClient.post<{success:string, error:string}>('http://localhost:5000/users/signup', user);
  }
}
