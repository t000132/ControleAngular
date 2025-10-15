import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../shared/services/category.service';

/**
 * Composant qui affiche la liste complète des catégories
 * Pour naviguer vers les quizz par catégorie
 */
@Component({
  selector: 'app-category-list',
  styleUrls: ['./category-list.component.scss'],
  templateUrl: './category-list.component.html',
  standalone: false
})
export class CategoryListComponent implements OnInit {
  // List des catégories récupérées depuis l'API
  categories: Category[] = [];
  // liste filtrée selon la recherche
  filteredCategories: Category[] = [];
  // champ de recherche
  searchTerm: string = '';

  constructor(private categoryService: CategoryService) { }

    /**
   *Pour charger les categories oninit
   */
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.filteredCategories = categories;
    });
  }

  /**
   *Pour filtrer les categories
   */
  filterCategories(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(cat =>
        cat.name.toLowerCase().includes(term)
      );
    }
  }
}
