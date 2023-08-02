import { Injectable } from '@angular/core';
import { QuestionsAPIResponse } from '../Models/questions-apiresponse';
import { Questions } from '../Models/questions';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private quizData: QuestionsAPIResponse = {} as QuestionsAPIResponse;

  constructor() { }

  getQuizQuestions(): Questions[] {
    return this.quizData.results;
  }

  setQuizData(data: QuestionsAPIResponse) {
    this.quizData = data;
    this.quizData.results.forEach((data) => {
      data.questionOptions = this.suffleAnswer(data);
      data.selectedAnswer = '';
    });
  }

  suffleAnswer(question: Questions): string[] {
    let options: string[] = [];
    options = [question.correct_answer, ...question.incorrect_answers];
    options.sort(() => Math.random() - 0.5);
    return options;
  }

  setSelectedQuestionAnswer(index: number, option: string): boolean {
    this.quizData.results[index].selectedAnswer = option;
    return this.quizData.results.filter((quiz) => quiz.selectedAnswer === '').length == 0;
  }
  resetData() {
    this.quizData = {} as QuestionsAPIResponse;
  }
}
