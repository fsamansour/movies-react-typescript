import { StoreAction, Category, AuthPayload, CategoryPayload, Movie, MoviePayload } from "../types";
import * as ActionTypes from "../constants/ActionTypes";

export const authenticate = (login: boolean, isAdmin = false): StoreAction<AuthPayload> => ({
    type: ActionTypes.AUTHENTICATE,
    payload: { login, isAdmin }
});

export const addCategory = (category: Category): StoreAction<CategoryPayload> => ({
    type: ActionTypes.ADD_CATEGORY,
    payload: { category }
});

export const editCategory = (category: Category): StoreAction<CategoryPayload> => ({
    type: ActionTypes.EDIT_CATEGORY,
    payload: { category }
});

export const addMovie = (catId: number, movie: Movie): StoreAction<MoviePayload> => ({
    type: ActionTypes.ADD_MOVIE,
    payload: { catId, movie }
});

export const editMovie = (catId: number, movie: Movie): StoreAction<MoviePayload> => ({
    type: ActionTypes.EDIT_MOVIE,
    payload: { catId, movie }
});

export const deleteMovie = (catId: number, movie: Movie): StoreAction<MoviePayload> => ({
    type: ActionTypes.DELETE_MOVIE,
    payload: { catId, movie }
});
