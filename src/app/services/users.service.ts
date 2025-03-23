import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse, IUser } from '../interfaces/i-response.interface';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint: string = "https://peticiones.online/api/users";
  private httpClient = inject(HttpClient);
  page: number = 1;

  getAllObservable(page: number = 1): Observable<IResponse>{
    return this.httpClient.get<IResponse>(`${this.endpoint}?page=${page}`);}

  getById(_id:string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.endpoint}/${_id}`))
  }

  deleteUser(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.endpoint}/${_id}`))
  }

  update(user: IUser): Promise<IUser> {
    let {_id, ...userBody} = user;
    return lastValueFrom(this.httpClient.put<IUser>(`${this.endpoint}/${_id}`, userBody))
  }

  insert(user: IUser): Promise<IUser> {
    let {_id, ...userBody} = user;
    return lastValueFrom(this.httpClient.post<IUser>(`${this.endpoint}`, userBody))
  }

}


  