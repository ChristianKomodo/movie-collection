import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { Movie } from '../models/movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class CollectionComponent implements OnInit, OnDestroy {
  movieCollection: Movie[] = [];
  private movieSub = new Subscription();
  private authListenerSubs = new Subscription();
  userIsAuthenticated: boolean = false;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    /* 
      Question: how can this below work if the above subscription hasn't 
      returned in time for this.userIsAuthenticated to be true?
      ngOnInit() should only run when the page loads and the collection 
      component is instantiated, and at that point, the getAuthStatusListener()
      probably wouldn't have had time to come back yet with whether the user
      is logged in via the getAuthStatusListener() subscription.
    */
    if (this.userIsAuthenticated) {
      this.getCollectedMovies();
    }
  }

  getCollectedMovies() {
    this.movieService.getMovieList();
    this.movieSub = this.movieService
      .getMovieUpdateListener()
      .subscribe((movies: Movie[]) => {
        this.movieCollection = movies;
      });
  }

  deleteMovie(movieId: any) {
    this.movieService.deleteMovie(movieId);
  }

  ngOnDestroy(): void {
    this.movieSub.unsubscribe();
  }
}
