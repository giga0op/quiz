
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {QuizCategory, QuizQuestion} from '../models/quiz.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {


  constructor(private http: HttpClient ) {

  }

  getQuiz(quiz: QuizConfig): Observable<QuizQuestion[]> {
    return this.http.get<{results:QuizQuestion[]}>(`${environment.apiUrl}/api.php?amount=10&category=${quiz.category}&difficulty=${quiz.difficulty}`).pipe(map((res => res.results)));
  }

  getCategories(): Observable<QuizCategory[]> {
    return this.http.get<{trivia_categories:QuizCategory[]}>(`${environment.apiUrl}/api_category.php`).pipe(map((res=>res.trivia_categories)));
  }

}

interface QuizConfig {
    category: string;
    difficulty: string;
}
