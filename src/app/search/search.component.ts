import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  fromEvent,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { Movie } from '../models/movie.model';
import { MovieResult } from '../models/movie-result.model';
import { MovieDetails } from '../models/movie-details.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  movieResults: MovieResult[] = [];
  movieDetails: any;
  // movieDetails: MovieDetails | undefined; // why is this not valid?
  @ViewChild('movieSearchInput', { static: false })
  movieSearchInput!: ElementRef;
  hasTerm = false;
  hasDetails = false;
  isSearching = false;
  noResults = false;

  constructor(private movieService: MovieService) {}

  ngAfterViewInit(): void {
    // build the search term
    fromEvent(this.movieSearchInput.nativeElement, 'keyup')
      .pipe(
        // get the value of the input as we go
        map((event: any) => {
          return event.target.value;
        }),
        // only allow search strings of 2 or more characters
        filter((res) => res.length > 1),
        // pause to allow the user to finish typing
        debounceTime(1000),
        // ensure query is different than last time it was debounced
        distinctUntilChanged()
        // subscribe to the result
      )
      .subscribe((term: string) => {
        this.movieResults = [];
        this.hasTerm = true;
        this.isSearching = true;

        this.movieService.searchMovie(term).subscribe((data: any) => {
          this.isSearching = false;
          this.noResults = false;
          if (data.Response == 'True') {
            data.Search.forEach((movieDataItem: any) => {
              this.movieResults.push({
                poster: movieDataItem.Poster !== 'N/A' ? movieDataItem.Poster : 'http://fpoimg.com/300x430?text=No%20Poster',
                title: movieDataItem.Title,
                type: movieDataItem.Type,
                year: movieDataItem.Year,
                imdbid: movieDataItem.imdbID
              });
            });
            console.log('this.movieResults is', this.movieResults);
          } else if (data.Response == 'False') {
            this.noResults = true;
          }
        });
      });
  }

  returnToSearchResults() {
    this.hasDetails = false;
  }

  // reset() {
  //   this.movieSearchInput.nativeElement.value = '';
  //   this.hasTerm = false;
  //   this.hasDetails = false;
  //   this.isSearching = false;
  // }

  searchMovieDetails(movie: MovieResult) {
    if (!movie) {
      return;
    }
    this.movieService.movieDetails(movie.imdbid).subscribe(res => {
      this.movieDetails = res;
      this.hasDetails = true;
    });
  }

  addMovie(movie: MovieResult) {
    this.movieService.addMovie(movie);
  }

}
