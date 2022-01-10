export interface Movie {
    _id: string | null;
    imdbid: string;
    title: string;
    year: string;
    poster: string;
    watched: boolean;
    liked: boolean;
}