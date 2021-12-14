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
        map((response) =>
          response.movies.map((item: { imdbid: string }) => {
            this.movieService.movieDetails(item.imdbid);
          })
        )
      )
      .subscribe((data) => {
        console.log('data', data);
      });

    // .pipe(
    //   map((response) =>
    //     response.movies.map((item: { imdbid: string }) => {
    //       this.movieService.movieDetails(item.imdbid);
    //     })
    //   )
    // )

    // .pipe(
    //   map((data) => data.movies),
    //   map((movie) => {return this.movieService.movieDetails(movie.imdbid)})
    // )

    // map((movies) =>
    //     movies.movies
    //       .map((thisMovie: { imdbid: string }) => {
    //         return this.movieService.movieDetails(thisMovie.imdbid)
    //       })
    //   )

    // getCollectedMovies() {
    //   this.movieService.getMovieList()
    //     .pipe(
    //       map(movieIDs => {
    //         return movieIDs.movies.map((movie: Movie) => {
    //           return {
    //             id: movie.id,
    //             imdbid: movie.imdbid,
    //             title: movie.title,
    //             posterUrl: movie.posterUrl,
    //             watched: movie.watched,
    //             liked: movie.liked
    //           }
    //         })
    //       })
    //     )
    //     .subscribe(movieData => {
    //       console.log('movieData is', movieData);
    //   });

    // console.log('someMovies is', someMovies);

    // pipe(map(movieData => {
    //   return movieData.movies.map((movie: { _id: string, imdbid: string, watched: boolean, liked: boolean }) => {
    //     console.log({
    //       id: movie._id,
    //       indbid: movie.imdbid,
    //       watched: movie.watched,
    //       liked: movie.liked
    //     });
    //     return {
    //       id: movie._id,
    //       imdbid: movie.imdbid,
    //       watched: movie.watched,
    //       liked: movie.liked
    //     }
    //   })
    // }))
    // .subscribe((transformedMovies) => {
    //   this.movies = transformedMovies;
    //   this.moviesUpdated.next([...this.movies]);
    // })
  }
}
