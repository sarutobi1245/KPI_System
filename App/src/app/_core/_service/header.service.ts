import { EnvService } from './env.service';
import { Injectable } from '@angular/core';
import { PaginatedResult } from '../_model/pagination';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IHeader } from '../_model/header.interface';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  baseUrl = environment.apiUrl;
  messageSource = new BehaviorSubject<IHeader>(null);
  currentMessage = this.messageSource.asObservable();
  imgSource = new BehaviorSubject<string>('');
  currentImage = this.imgSource.asObservable();
  constructor(
    private http: HttpClient,
    public env: EnvService
    ) {}
  // method này để change source message
  changeMessage(message) {
    this.messageSource.next(message);
  }
  changeImage(message) {
    this.imgSource.next(message);
  }
  getAllNotificationCurrentUser(page, pageSize, userid) {
    return this.http.get(`${this.env.apiUrl}Home/getAllNotificationCurrentUser/${page}/${pageSize}/${userid}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  seen(item) {
    return this.http.get(`${this.env.apiUrl}Home/Seen/${item.ID}`);
  }

  checkTask(userId = 0) {
    return this.http.get(`${this.env.apiUrl}Home/TaskListIsLate`);
  }
}
