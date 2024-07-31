import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Datas, User } from '../interfaces/user.interface';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private arrayUsers: User[] = [];

  private url: string = 'https://peticiones.online/api/users/';
  constructor() {}

  getAll(page: number) {
    return this.httpClient.get<Datas>(`${this.url}?page=${page}`);
  }
  getById(id:string){
    return this.httpClient.get<User>(`${this.url}${id}`)
  }

  deleteById(iduser:string):Promise<any>{
    return lastValueFrom(this.httpClient.delete(`${this.url}${iduser}`))
  }
}
