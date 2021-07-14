import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../services/quiz-service.service';
import {Difficulty, QuizCategory, QuizQuestion} from '../models/quiz.model';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {


  get difficulties(){
    return Object.values((Difficulty))
  }

 categories: QuizCategory[] = [];
  questions = [];
  answer = false;
  num = 0;
  points = 0;
  correct = 0;
  incorrect = 0;
  answers = [];


  constructor(
    private service: QuizServiceService,
  ) {}

  ngOnInit() {
  this.loadCategories().subscribe();
    console.log(this.difficulties );
  }

  checkAnswer(correct_answer: string, your_answer: string) {
    this.answer = correct_answer === your_answer ? true : false;
    this.answer ? this.points += 5 : null;
    this.answer ? this.correct++ : this.incorrect++;
    this.num < this.questions.length ? this.num++ : null;
  }


  start(i) {
    this.service.getQuiz(i).pipe(tap(res => {
      const quiz = res;
      quiz.forEach(element => {
        element.incorrect_answers.push(element.correct_answer);
        element.incorrect_answers.sort(() => .5 - Math.random());
      });
      this.questions = quiz;
      this.num = 0;
      this.points = 0;
      this.correct = 0;
      this.incorrect = 0;
    })).subscribe();
  }

  loadCategories() {
   return this.service.getCategories().pipe(tap(res => {
      this.categories = res;
    }))
  }
}

