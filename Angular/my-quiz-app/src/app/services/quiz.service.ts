import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionsAPIResponse } from '../Models/questions-apiresponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  readonly quizAPIUrl: string = 'https://opentdb.com/api.php?amount=5&&type=multiple'; //category=11&difficulty=easy


  constructor(private http: HttpClient) { }

  getQuizQuestions(selectedDifficulty: string, selectedCategory: number): Observable<QuestionsAPIResponse> {
    let quizAPIUrlEndPoint = `${this.quizAPIUrl}&&difficulty=${selectedDifficulty}&&category=${selectedCategory}`;
    return this.http.get<QuestionsAPIResponse>(quizAPIUrlEndPoint);
  }
}
