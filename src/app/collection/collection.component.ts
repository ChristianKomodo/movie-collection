import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { switchMap, pluck, map, tap, mergeMap, toArray } from 'rxjs/operators';

import { Movie } from '../models/movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  movieCollection: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getCollectedMovies();
  }

  getCollectedMovies() {
    this.movieService
      .getMovieList()
      .pipe(
        map((results) => {
          return results.movies.map((movie: Movie) => {
            return {
              id: movie._id,
              imdbid: movie.imdbid,
              title: movie.title,
              poster: movie.poster,
              watched: movie.watched,
              liked: movie.liked,
            };
          });
        })
      )
      .subscribe((collectedMovies) => {
        console.log('collectedMovies is', collectedMovies);
        this.movieCollection = collectedMovies;
      });
  }

  getCollectedAndTransformedMovies() {
    this.movieService
      .getMovieList()
      .pipe(
        map((response) =>
          response.movies.map((item: { imdbid: string }) => {
            this.movieService.movieDetails(item.imdbid);
          })
        )
      )
      .subscribe((data) => {
        console.log('data', data);
      });
  }
}
