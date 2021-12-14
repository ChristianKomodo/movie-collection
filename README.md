# Movie Collection
## Movie Search and Watch-List Manager

### Completed:

- Search for a movie title using OMDB API
- RxJS-assisted search happens after a debounce of one second
- Displays the first 10 movie responses along with a movie poster image
- If there is no movie poster available, subtitute with an FPO image (Poster image not available)
- Click on a movie in the list to initiate call for movie details
  - Display view features a larger poster, actors, plot, awards, release date and ratings

### Coming Soon:

- MongoDB connectivity - Create Account, Log In
- Functionality to save movies to your personal watch list
- Ability to click "Watched" after you have seen it
- "Like" button functionality for favorite movies

### Possible Features

- **Movie Chooser** - Enter a friend's user code to compare your list to theirs and see which movie you both want to see

### Inspiration and Helpful References
- [The Open Movie Database(OMDb) for fetch movie data](https://medium.com/nerd-for-tech/the-open-movie-database-omdb-for-fetch-movie-data-bc5ff46bec8) - Medium.com article - VERY helpful
- [OMDB API](http://www.omdbapi.com/) - Movie database based on IMDB
- [5 helpful RxJS solutions](https://medium.com/grensesnittet/5-helpful-rxjs-solutions-d34f7c2f1cd9) - Medium.com article

### Tech

MEAN Stack - Mongo (and Mongoose), Express, Angular, NodeJS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Development server

Run `npm run start:server` in one terminal, and `npm start` in another, both off the root.  Then navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
