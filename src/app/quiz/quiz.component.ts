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
      // Récupere le playerName depuis la route
      this.playerName = params['playerName'] || localStorage.getItem('playerName') || 'Player';
      
      // Saver le playerName dans localStorage
      if (this.playerName) {
        localStorage.setItem('playerName', this.playerName);
      }

      // pour recuperer l'ID de la catégorie depuis la route (optionnel)
      const categoryIdParam = params['categoryId'];
      
      if (categoryIdParam) {
        const categoryId = parseInt(categoryIdParam);
        this.categoryId = categoryId;

        this.categoryService.getCategoryById(categoryId).subscribe({
          next: (category) => {
            this.selectedCategory = category;
          },
          error: (error) => {
            console.error('Error loading category:', error);
          }
        });

        this.quizService.resetQuiz();
        this.quizService.getQuizContent(categoryId);
      } else {
        this.quizService.resetQuiz();
        this.quizService.getQuizContent();
      }
    });
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }

  goBackToCategories() {
    this.router.navigate(['/categories']);
  }
}
