import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { Movie } from '../models/movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, OnDestroy {
  movieCollection: Movie[] = [];
  private movieSub = new Subscription();
  private authListenerSubs = new Subscription();
  userIsAuthenticated: boolean = false;

  constructor(private movieService: MovieService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.getCollectedMovies();
  }

  getCollectedMovies() {
    this.movieService.getMovieList();
    this.movieSub = this.movieService
      .getMovieUpdateListener()
      .subscribe((movies: Movie[]) => {
        this.movieCollection = movies;
      });
  }

  ngOnDestroy(): void {
    this.movieSub.unsubscribe();
  }
}
