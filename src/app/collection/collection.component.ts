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
        console.log(
          'collection component: userIsAuthenticated is now',
          this.userIsAuthenticated
        );
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
    console.log('getCollectedMovies()');
    this.movieService.getMovieList();
    this.movieSub = this.movieService
      .getMovieUpdateListener()
      .subscribe((movies: Movie[]) => {
        console.log(
          'movies from subscription in collection component:',
          movies
        );
        this.movieCollection = movies;
      });
  }

  ngOnDestroy(): void {
    this.movieSub.unsubscribe();
  }
}
