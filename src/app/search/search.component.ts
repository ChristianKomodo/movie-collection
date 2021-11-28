import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  fromEvent,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { Movie } from '../models/movie.model';
import { MovieResult } from '../models/movie-result.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  movieResults: MovieResult[] = [];
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;
  hasTerm = false;
  isSearching = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
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
          if (data.Response == 'True') {
            data.Search.forEach((movieDataItem: any) => {
              this.movieResults.push({
                poster: movieDataItem.Poster,
                title: movieDataItem.Title,
                type: movieDataItem.Type,
                year: movieDataItem.Year,
                imdbid: movieDataItem.imdbID
              });
            });
            console.log('this.movieResults is', this.movieResults);
          }
        });
      });
  }

  // onAddMovie(imdbid: string) {
  //   console.log('onAddMovie clicked');
  //   this.movieService.addMovie(imdbid);
  // }
}
