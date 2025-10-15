import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  playerName = '';
  isPlayerNameConfirmed = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    //Nous verrons plus tard comment gérer cela avec des observables
    this.authService.isUserConnected();
    const username = this.authService.user?.username || '';

    if (username) {
      this.playerName = username;
      this.isPlayerNameConfirmed = true;

      // Enregistrer le nom du joueur dans le localStorage pour qu'il soit accessible dans d'autres composants
      localStorage.setItem('playerName', this.playerName);
    }
  }

  get isPlayerNameFill() {
    return this.playerName.length < 1;
  }

  confirmPseudo() {
    this.isPlayerNameConfirmed = true;
  }
}
