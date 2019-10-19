export interface Category {
    id: number;
    name: string;
    movies: Movie[]
}

export interface Movie {
    id: number;
    name: string;
    description: string;
    rate: string;
}

export interface StoreState {
    categories: Category[]
}

export interface StoreAction {
    type: string;
    payload?: { [key: string]: any; }
}