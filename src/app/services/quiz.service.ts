import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private url = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  getQuestions(): Observable<Question[]>{
    return this.http.get<Question[]>(`${this.url}questions`)
  }  

}
