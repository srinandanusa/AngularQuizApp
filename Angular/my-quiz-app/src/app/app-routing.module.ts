import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizQuestionsComponent } from './components/quiz-questions/quiz-questions.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'questions', pathMatch: 'full'
  },
  {
    path: 'questions', component: QuizQuestionsComponent
  },
  {
    path: 'result', component: QuizResultComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
