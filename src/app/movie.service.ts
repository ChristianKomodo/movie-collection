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

  private nodeBaseUrl: string;
  constructor(private http: HttpClient) {
    this.nodeBaseUrl = 'http://localhost:3000';
  }

  getMovieList() {
    this.http
      .get<{ message: string; movies: Movie[] }>(
        `${this.nodeBaseUrl}/api/movies`
      )
      .subscribe((movieData) => {
        this.movies = movieData.movies;
        this.moviesUpdated.next([...this.movies]);
      });
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  isMovieAlreadyCollected(collectedMovie: MovieResult): boolean {
    return this.movies.some((movie) => movie.imdbid === collectedMovie.imdbid);
  }

  addMovie(movie: MovieResult) {
    if (this.isMovieAlreadyCollected(movie)) {
      return console.error(`Already collected the movie "${movie.title}".`);
    }
    this.http
      .post<any>(`${this.nodeBaseUrl}/api/movies`, movie)
      .subscribe((responseData) => {
        this.movies.push(responseData.addedMovie);
        this.moviesUpdated.next([...this.movies]);
      });
  }

  deleteMovie(movieId: string) {
    this.http
      .delete(`${this.nodeBaseUrl}/api/movies/${movieId}`)
      .subscribe(() => {
        this.movies = this.movies.filter((movie) => movie._id !== movieId);
        this.moviesUpdated.next([...this.movies]);
      });
  }

  searchMovie(term: string) {
    if (term == '') {
      console.error('no movie search term!');
      return of([]);
    }
    return this.http.get('/omdb/?s=' + term + '&apikey=' + APIKEY, {
      params: PARAMS.set('search', term),
    });
  }

  movieDetails(imdbid: string) {
    return this.http.get('/omdb/?i=' + imdbid + '&apikey=' + APIKEY, {
      params: PARAMS.set('search', imdbid),
    });
  }
}
