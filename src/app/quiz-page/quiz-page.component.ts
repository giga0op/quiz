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
  questions:ViewQuizQuestion[] = [];
  answer: boolean = false;
  num: number = 0;
  points: number = 0;
  correct: number = 0;
  incorrect: number = 0;



  constructor(
    private service: QuizServiceService,
  ) {}

  ngOnInit() {
  this.loadCategories().subscribe();
  }

  checkAnswer(correct_answer: string, your_answer: string) {
    this.answer = correct_answer === your_answer ? true : false;
    this.answer ? this.points += 5 : null;
    this.answer ? this.correct++ : this.incorrect++;
    this.num < this.questions.length ? this.num++ : null;
  }


  start(i) {
    this.service.getQuiz(i).subscribe(res => {
      this.questions = res.filter(x=>!!x).map<ViewQuizQuestion>(element => {
        const answers = [...element.incorrect_answers,element.correct_answer];
        answers.sort(() => .5 - Math.random());
        return <ViewQuizQuestion>{...element, answers:answers }
      });

      this.num = 0;
      this.points = 0;
      this.correct = 0;
      this.incorrect = 0;
    });
  }

  loadCategories() {
   return this.service.getCategories().pipe(tap(res => {
      this.categories = res.filter(x=>!!x);
    }));
  }
}

export interface ViewQuizQuestion extends QuizQuestion {
  answers: string[];
}

