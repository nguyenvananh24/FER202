import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialMovieState);

    // READ: Lấy danh sách phim
    const fetchMovies = useCallback(async () => {
        dispatch({ type: 'START_LOADING' });
        try {
            const res = await movieApi.get('/movies');
            dispatch({ type: 'SET_MOVIES', payload: res.data });
        } catch (err) {
            console.error('Lỗi fetchMovies:', err);
            dispatch({ type: 'STOP_LOADING' });
        }
    }, []);

    // READ: Lấy danh sách thể loại
    const fetchGenres = useCallback(async () => {
        try {
            const res = await movieApi.get('/genres');
            dispatch({ type: 'SET_GENRES', payload: res.data });
        } catch (err) {
            console.error('Lỗi fetchGenres:', err);
        }
    }, []);

    // CREATE: Thêm phim mới
    const createMovie = useCallback(async (data) => {
        dispatch({ type: 'START_LOADING' });
        try {
            // Tính id = max(id hiện tại) + 1
            const res = await movieApi.get('/movies');
            const existing = res.data;
            const maxId = existing.length > 0
                ? Math.max(...existing.map(m => Number(m.id) || 0))
                : 0;
            await movieApi.post('/movies', { id: maxId + 1, ...data });
            await fetchMovies();
            return true;
        } catch (err) {
            console.error('Lỗi createMovie:', err);
            dispatch({ type: 'STOP_LOADING' });
            return false;
        }
    }, [fetchMovies]);

    // UPDATE: Sửa phim
    const updateMovie = useCallback(async (id, data) => {
        dispatch({ type: 'START_LOADING' });
        try {
            await movieApi.put(`/movies/${id}`, data);
            dispatch({ type: 'CLOSE_EDIT_MODAL' });
            await fetchMovies();
            return true;
        } catch (err) {
            console.error('Lỗi updateMovie:', err);
            dispatch({ type: 'STOP_LOADING' });
            return false;
        }
    }, [fetchMovies]);

    // DELETE: Xóa phim
    const deleteMovie = useCallback(async (id) => {
        dispatch({ type: 'START_LOADING' });
        dispatch({ type: 'CLOSE_DELETE_MODAL' });
        try {
            await movieApi.delete(`/movies/${id}`);
            await fetchMovies();
        } catch (err) {
            console.error('Lỗi deleteMovie:', err);
            dispatch({ type: 'STOP_LOADING' });
        }
    }, [fetchMovies]);

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, [fetchMovies, fetchGenres]);

    const dispatchValue = {
        dispatch,
        fetchMovies,
        fetchGenres,
        createMovie,
        updateMovie,
        deleteMovie,
    };

    return (
        <MovieStateContext.Provider value={state}>
            <MovieDispatchContext.Provider value={dispatchValue}>
                {children}
            </MovieDispatchContext.Provider>
        </MovieStateContext.Provider>
    );
};