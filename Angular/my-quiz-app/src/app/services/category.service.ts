import { Observable, map } from 'rxjs';
import { Category } from '../Models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly categoryUrl: string = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(this.categoryUrl);
  }
}
