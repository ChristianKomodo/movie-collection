import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';

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

  private movieIDs: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getMovieList() {
    return this.http
      .get<{message: string, movies: any}>("http://localhost:3000/api/movies");
  }

  addMovie(imdbid: string) {
    const movieToAdd = {imdbid: imdbid};
    this.http
      .post<{imdbid: string}>(
        "http://localhost:3000/api/movies",
        movieToAdd
      )
      .subscribe(responseData => {
        console.log('responseData is', responseData);
        const movieID = responseData.imdbid;
        this.movieIDs.push(movieID);
        console.log('movieIDs is', this.movieIDs);
        // this.moviesUpdated.next([...this.movieIDs]);  // nope, gotta add "watched" and "liked"
      });
    console.log('addMovie parameter in service imdbid is', imdbid);
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
    return this.http.get('http://www.omdbapi.com/?s=' + term + '&apikey=' + APIKEY, { params: PARAMS.set('search', term) });
  }

  movieDetails(imdbid: string) {
    console.log('movieDetails got passed', imdbid);
    return this.http.get('http://www.omdbapi.com/?i=' + imdbid + '&apikey=' + APIKEY, { params: PARAMS.set('search', imdbid) });
  }

}
