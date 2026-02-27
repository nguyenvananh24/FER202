import React, { useState, useMemo } from 'react';
import { Table, Button, Image, Modal, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import FilterBar from './FilterBar';

const defaultFilters = {
    search: '',
    genreId: '',
    durationMin: '',
    durationMax: '',
    sortOrder: '',
};

const MovieTable = () => {
    const { movies, genres, loading, movieToDelete, showDeleteModal } = useMovieState();
    const { dispatch, deleteMovie } = useMovieDispatch();

    const [filters, setFilters] = useState(defaultFilters);

    // Map genreId -> tên thể loại
    const genreMap = genres.reduce((map, g) => { map[g.id] = g.name; return map; }, {});

    // Lọc + sắp xếp phim
    const filteredMovies = useMemo(() => {
        let result = [...movies];

        if (filters.search.trim()) {
            const kw = filters.search.trim().toLowerCase();
            result = result.filter((m) => m.title.toLowerCase().includes(kw));
        }
        if (filters.genreId) {
            result = result.filter((m) => String(m.genreId) === filters.genreId);
        }
        if (filters.durationMin !== '') {
            result = result.filter((m) => Number(m.duration) >= Number(filters.durationMin));
        }
        if (filters.durationMax !== '') {
            result = result.filter((m) => Number(m.duration) <= Number(filters.durationMax));
        }
        if (filters.sortOrder === 'asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (filters.sortOrder === 'desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }
        return result;
    }, [movies, filters]);

    const getBadgeVariant = (genreName) => {
        const colors = {
            'Sci-Fi': 'primary', 'Comedy': 'warning', 'Drama': 'info',
            'Horror': 'dark', 'Romance': 'danger', 'Action': 'success', 'Thriller': 'secondary',
        };
        return colors[genreName] || 'secondary';
    };

    const handleEditClick = (movie) => {
        dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
    };

    const handleDeleteClick = (movie) => {
        dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
    };

    const handleConfirmDelete = () => {
        // Lưu id vào biến local trước khi đóng modal để tránh null
        const id = movieToDelete?.id;
        if (id !== undefined && id !== null) {
            deleteMovie(id);
        }
    };

    return (
        <>
            {/* FilterBar */}
            <FilterBar
                filters={filters}
                genres={genres}
                onChange={setFilters}
                resultCount={filteredMovies.length}
            />

            {loading && movies.length === 0 ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Đang tải dữ liệu phim...</p>
                </div>
            ) : (
                <Table striped bordered hover responsive className="mt-4">
                    <thead className="table-dark">
                        <tr>
                            <th>Avatar</th>
                            <th>ID</th>
                            <th>Tên Phim</th>
                            <th>Thể loại</th>
                            <th>Thời lượng</th>
                            <th>Năm</th>
                            <th>Quốc gia</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center text-muted py-4">
                                    Chưa có phim nào. Hãy thêm phim mới!
                                </td>
                            </tr>
                        ) : filteredMovies.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center text-muted py-4">
                                    🔍 Không tìm thấy phim phù hợp với bộ lọc.
                                </td>
                            </tr>
                        ) : (
                            filteredMovies.map(movie => {
                                const genreName = genreMap[movie.genreId] || 'Không rõ';
                                return (
                                    <tr key={movie.id}>
                                        <td>
                                            <Image
                                                src={movie.avatar}
                                                alt={movie.title}
                                                style={{ width: '55px', height: '55px', objectFit: 'cover' }}
                                                rounded
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/55'; }}
                                            />
                                        </td>
                                        <td><strong>#{movie.id}</strong></td>
                                        <td>
                                            <strong>{movie.title}</strong>
                                            <br />
                                            <small className="text-muted">({movie.year})</small>
                                        </td>
                                        <td>
                                            <Badge bg={getBadgeVariant(genreName)}>{genreName}</Badge>
                                        </td>
                                        <td>{movie.duration} phút</td>
                                        <td>{movie.year}</td>
                                        <td>{movie.country}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleEditClick(movie)}
                                            >
                                                ✏️ Sửa
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteClick(movie)}
                                            >
                                                🗑 Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </Table>
            )}

            {/* ── MODAL XÁC NHẬN XÓA ── */}
            <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })} centered>
                <Modal.Header closeButton>
                    <Modal.Title>🗑 Xác nhận Xóa Phim</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa phim{' '}
                    <strong>"{movieToDelete?.title}"</strong>{' '}
                    (ID: #{movieToDelete?.id}) không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
                        Hủy bỏ
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Xác nhận Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MovieTable;