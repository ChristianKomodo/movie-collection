import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from './models/movie.model';

const APIKEY = "8e27fb4f";

const PARAMS = new HttpParams({
  fromObject: {
    action: "opensearch",
    format: "json",
    origin: "*"
  }
});

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [];
  private moviesUpdated = new Subject<Movie[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getMovies() {
    this.http
      .get<{message: string, movies: any}>('http:localhost:3000/api/movies')
      .pipe(map(movieData => {
        return movieData.movies.map((movie: { _id: string, imdbid: string, watched: boolean, liked: boolean }) => {
          console.log({
            id: movie._id,
            indbid: movie.imdbid,
            watched: movie.watched,
            liked: movie.liked
          });
          return {
            id: movie._id,
            imdbid: movie.imdbid,
            watched: movie.watched,
            liked: movie.liked
          }
        })
      }))
      .subscribe((transformedMovies) => {
        this.movies = transformedMovies;
        this.moviesUpdated.next([...this.movies]);
      })
  }

  addMovie(imdbid: string) {
    console.log('addMovie imdbid is', imdbid);
  }

  searchMovie(term: string) {
    if (term == '') {
      return of([]);
    }

    return this.http.get('http://www.omdbapi.com/?s=' + term + '&apikey=' + APIKEY, { params: PARAMS.set('search', term) });
  }

}
