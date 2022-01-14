import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Subject } from 'rxjs';

import { Movie } from './models/movie.model';
import { MovieResult } from './models/movie-result.model';

const APIKEY = '8e27fb4f';

const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  },
});

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: Movie[] = [];
  private moviesUpdated = new Subject<Movie[]>();

  constructor(private http: HttpClient) {}

  getMovieList() {
    this.http
      .get<{ message: string; movies: Movie[] }>(
        'http://localhost:3000/api/movies'
      )
      .subscribe((movieData) => {
        this.movies = movieData.movies;
        this.moviesUpdated.next([...this.movies]);
      });
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  addMovie(movie: MovieResult) {
    this.http
      .post<any>('http://localhost:3000/api/movies', movie)
      .subscribe((responseData) => {
        this.movies.push(responseData.addedMovie);
        this.moviesUpdated.next([...this.movies]);
      });
  }

  searchMovie(term: string) {
    if (term == '') {
      console.error('no movie search term!');
      return of([]);
    }
    return this.http.get(
      'http://www.omdbapi.com/?s=' + term + '&apikey=' + APIKEY,
      { params: PARAMS.set('search', term) }
    );
  }

  movieDetails(imdbid: string) {
    return this.http.get(
      'http://www.omdbapi.com/?i=' + imdbid + '&apikey=' + APIKEY,
      { params: PARAMS.set('search', imdbid) }
    );
  }
}
