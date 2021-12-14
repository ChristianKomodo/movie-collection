export interface Movie {
    _id: string | null;
    imdbid: string;
    title: string;
    posterUrl: string;
    watched: boolean;
    liked: boolean;
}