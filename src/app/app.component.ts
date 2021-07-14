import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QuizServiceService} from './services/quiz-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz';

  category = [
    {id: 9, categoty: 'general knowledge'},
    {id: 10, categoty: 'entertainment: books'},
    {id: 11, categoty: 'general knowledge'},
    {id: 12, categoty: 'general knowledge'},
    {id: 14, categoty: 'general knowledge'},
  ];

  difficulties = [
    { difficulty: 'easy' },
    { difficulty: 'medium' },
    { difficulty: 'hard' },
  ];


constructor(private http: QuizServiceService) {
}

  start(i){
    console.log(i);
    this.http.getQuiz(i).subscribe(res => {
    });
  }
}
