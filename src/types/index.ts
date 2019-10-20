export interface Category {
    id?: number;
    name: string;
    description?: string;
    movies?: Movie[]
}

export interface Movie {
    id?: number;
    name: string;
    description?: string;
    rate?: string;
}

export interface StoreState {
    categories: Category[],
    isAdmin: boolean,
    isLoggedIn: boolean
}

export interface StoreAction<T = { [key: string]: any; }> {
    type: string;
    payload?: T;
}

export interface AuthPayload {
    login: boolean;
    isAdmin: boolean;
}

export interface CategoryPayload {
    category: Category;
}

export interface MoviePayload {
    catId: number;
    movie: Movie;
}
