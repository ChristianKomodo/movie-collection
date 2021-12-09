export interface Movie {
    id: string | null;
    imdbid: string;
    title: string;
    posterUrl: string;
    watched: boolean;
    liked: boolean;
}