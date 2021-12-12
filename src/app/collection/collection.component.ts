import { Component, OnInit } from '@angular/core';

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
    const someMovies = this.movieService.getMovies();
    console.log('someMovies is', someMovies);
  }
}
