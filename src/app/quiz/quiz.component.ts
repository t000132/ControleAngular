import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../shared/services/quiz.service";
import { CategoryService, Category } from "../shared/services/category.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: false
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName?: string;
  categoryId?: number;
  selectedCategory?: Category;

  constructor(
    private quizService: QuizService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = parseInt(params['categoryId']);
      this.categoryId = categoryId;

      // Load the selected category
      this.categoryService.getCategoryById(categoryId).subscribe({
        next: (category) => {
          this.selectedCategory = category;
        },
        error: (error) => {
          console.error('Error loading category:', error);
        }
      });

      // Reset quiz and load questions for this category
      this.quizService.resetQuiz();
      this.quizService.getQuizContent(categoryId);

      // Retrieve player name from localStorage
      this.playerName = localStorage.getItem('playerName') || '';
    });
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }

  goBackToCategories() {
    this.router.navigate(['/categories']);
  }
}
