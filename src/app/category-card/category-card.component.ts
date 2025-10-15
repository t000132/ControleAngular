import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../shared/services/category.service';

/**
 * Composant pour afficher une carte de catégorie
 * Utiluise @Input pour recevoir les donnéses de la catégorie depuis le parent
 */

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  standalone: false
})
export class CategoryCardComponent {
  @Input() category!: Category;

  constructor(private router: Router) { }

  onCategoryClick(): void {
    // Récupére le nom du joueur depuis localStorage ou utiliser un nom par défaut
    const playerName = localStorage.getItem('playerName') || 'Player';
    
    // Naviguer vers le quiz avec l'ID de la catégorie en paramètre
    this.router.navigate(['/quiz', playerName, this.category.id]);
  }
}
