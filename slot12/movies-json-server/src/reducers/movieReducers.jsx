export const initialMovieState = {
    movies: [],
    genres: [],
    loading: false,
    // State dành riêng cho Modal Sửa
    isEditing: null,       // id của phim đang sửa, null = không sửa
    editMovie: null,       // dữ liệu phim đang sửa (chỉ dùng trong modal)
    showEditModal: false,
    // State dành riêng cho Modal Xóa
    movieToDelete: null,
    showDeleteModal: false,
};

export const movieReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.payload, loading: false };

        case 'SET_GENRES':
            return { ...state, genres: action.payload };

        case 'START_LOADING':
            return { ...state, loading: true };

        case 'STOP_LOADING':
            return { ...state, loading: false };

        // --- EDIT MODAL ---
        case 'OPEN_EDIT_MODAL':
            return {
                ...state,
                isEditing: action.payload.id,
                editMovie: {
                    id: action.payload.id,
                    title: action.payload.title || '',
                    description: action.payload.description || '',
                    avatar: action.payload.avatar || action.payload.poster || '',
                    genreId: action.payload.genreId || '',
                    duration: action.payload.duration || '',
                    year: action.payload.year || '',
                    country: action.payload.country || '',
                },
                showEditModal: true,
            };

        case 'UPDATE_EDIT_FIELD':
            return {
                ...state,
                editMovie: { ...state.editMovie, [action.payload.name]: action.payload.value },
            };

        case 'CLOSE_EDIT_MODAL':
            return {
                ...state,
                isEditing: null,
                editMovie: null,
                showEditModal: false,
            };

        // --- DELETE MODAL ---
        case 'OPEN_DELETE_MODAL':
            return { ...state, movieToDelete: action.payload, showDeleteModal: true };

        case 'CLOSE_DELETE_MODAL':
            return { ...state, movieToDelete: null, showDeleteModal: false };

        default:
            return state;
    }
};