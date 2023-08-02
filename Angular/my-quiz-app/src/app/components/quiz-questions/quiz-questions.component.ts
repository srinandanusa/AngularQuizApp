import { QuizService } from './../../services/quiz.service';
import { Category } from 'src/app/Models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { QuestionsAPIResponse } from 'src/app/Models/questions-apiresponse';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Questions } from 'src/app/Models/questions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent implements OnInit {

  categoryOptions: { name: string; id: number }[] = [];
  selectedCategory: number = 0;

  selectedDifficulty: string = 'Select difficulty';
  difficultyOptions: string[] = ['Select difficulty', 'Easy', 'medium', 'hard'];

  quizQuestions: Questions[] = [];

  isAllQuestionsAnswered: boolean = false;

  constructor(private categoryService: CategoryService, private quizService: QuizService, private sharedDataService: SharedDataService, private router: Router) {
  }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((data: Category) => {
      this.categoryOptions = data.trivia_categories;
      this.categoryOptions.unshift({ id: 0, name: 'Select a Category' });
    })
  }

  getQuizQuestions() {
    this.quizService.getQuizQuestions(this.selectedDifficulty, this.selectedCategory).subscribe((data: QuestionsAPIResponse) => {
      this.sharedDataService.setQuizData(data);
      this.quizQuestions = this.sharedDataService.getQuizQuestions();
    })
  }

  selectedAnswer(index: number, option: string) {
    this.isAllQuestionsAnswered = this.sharedDataService.setSelectedQuestionAnswer(index, option);
  }

  submitQuiz(){
    this.router.navigate(['/result'])
  }

}
