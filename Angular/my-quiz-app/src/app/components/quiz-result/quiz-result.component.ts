import { SharedDataService } from 'src/app/services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { Questions } from 'src/app/Models/questions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  quizData: Questions[] = [];
  correctAnswerCount: number = 0;
  resultClass: string = '';

  constructor(private sharedDataService: SharedDataService, private router: Router) { }
  ngOnInit(): void {
    this.quizData = this.sharedDataService.getQuizQuestions();
    this.correctAnswerCount = this.quizData.filter(
      (data) => data.correct_answer === data.selectedAnswer
    ).length;
    this.setResultClass();
  }

  setResultClass() {
    if (this.correctAnswerCount < 2) this.resultClass = 'red';
    else if (this.correctAnswerCount < 4) this.resultClass = 'yellow';
    else this.resultClass = 'green';
  }

  createNewQuiz() {
    this.sharedDataService.resetData();
    this.router.navigate(['']);
  }

}
