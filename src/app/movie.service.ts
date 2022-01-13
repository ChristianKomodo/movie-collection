import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
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

  private movieIDs: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getMovieList() {
    return this.http.get<{ message: string; movies: any }>(
      'http://localhost:3000/api/movies'
    );
  }

  addMovie(movie: MovieResult) {
    console.log('addMovie:', movie);
    this.http
      .post<any>('http://localhost:3000/api/movies', movie)
      .subscribe((responseData) => {
        console.log('responseData is', responseData);
        const thisMovie = responseData.addedMovie;
        this.moviesUpdated.next([...this.movies, thisMovie]);
      });
    console.log('addMovie parameter in service imdbid is', movie.imdbid);
  }

  // addPost(title: string, content: string) {
  //   const post: Post = { id: null, title: title, content: content };
  //   this.http
  //     .post<{ message: string; postId: string }>(
  //       "http://localhost:3000/api/posts",
  //       post
  //     )
  //     .subscribe(responseData => {
  //       console.log('response data is', responseData);
  //       const id = responseData.postId;
  //       post.id = id;
  //       this.posts.push(post);
  //       this.postsUpdated.next([...this.posts]);
  //       this.router.navigate(["/"]);
  //     });
  // }

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
    console.log('movieDetails got passed', imdbid);
    return this.http.get(
      'http://www.omdbapi.com/?i=' + imdbid + '&apikey=' + APIKEY,
      { params: PARAMS.set('search', imdbid) }
    );
  }
}
