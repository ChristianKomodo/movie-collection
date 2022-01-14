import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
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
