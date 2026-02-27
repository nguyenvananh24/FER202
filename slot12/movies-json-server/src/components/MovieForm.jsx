import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

// ── Các trường input dùng chung cho cả form thêm mới và modal sửa ──
const MovieFields = ({ movie, onChange, onFileChange, imagePreview, genres, errors = {}, validated = false }) => (
    <>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group>
                    <Form.Label>Ảnh Avatar Phim</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="mb-2"
                    />
                    <Form.Control
                        type="text"
                        name="avatar"
                        value={movie.avatar || ''}
                        onChange={onChange}
                        placeholder="Hoặc nhập URL hình ảnh"
                        isInvalid={validated && !!errors.avatar}
                    />
                    <Form.Control.Feedback type="invalid">{errors.avatar}</Form.Control.Feedback>
                    {(imagePreview || movie.avatar) && (
                        <Image
                            src={imagePreview || movie.avatar}
                            alt="Preview"
                            thumbnail
                            className="mt-2"
                            style={{ maxWidth: '150px', maxHeight: '120px', objectFit: 'cover' }}
                        />
                    )}
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group>
                    <Form.Label>Tên Phim <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={movie.title || ''}
                        onChange={onChange}
                        placeholder="Nhập tên phim"
                        isInvalid={validated && !!errors.title}
                        isValid={validated && !errors.title && !!movie.title}
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={12}>
                <Form.Group>
                    <Form.Label>Mô tả <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={movie.description || ''}
                        onChange={onChange}
                        placeholder="Nhập mô tả phim"
                        isInvalid={validated && !!errors.description}
                        isValid={validated && !errors.description && !!movie.description}
                    />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={3}>
                <Form.Group>
                    <Form.Label>Thể loại <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                        name="genreId"
                        value={movie.genreId || ''}
                        onChange={onChange}
                        isInvalid={validated && !!errors.genreId}
                        isValid={validated && !errors.genreId && !!movie.genreId}
                    >
                        <option value="">Chọn thể loại</option>
                        {genres.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.genreId}</Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group>
                    <Form.Label>Thời lượng (phút) <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        type="number"
                        name="duration"
                        value={movie.duration || ''}
                        onChange={onChange}
                        placeholder="Phút"
                        min="1"
                        max="600"
                        isInvalid={validated && !!errors.duration}
                        isValid={validated && !errors.duration && !!movie.duration}
                    />
                    <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group>
                    <Form.Label>Năm <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        type="number"
                        name="year"
                        value={movie.year || ''}
                        onChange={onChange}
                        placeholder="Năm"
                        min="1900"
                        max="2030"
                        isInvalid={validated && !!errors.year}
                        isValid={validated && !errors.year && !!movie.year}
                    />
                    <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group>
                    <Form.Label>Quốc gia <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        value={movie.country || ''}
                        onChange={onChange}
                        placeholder="Quốc gia"
                        isInvalid={validated && !!errors.country}
                        isValid={validated && !errors.country && !!movie.country}
                    />
                    <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
    </>
);

// ── Hàm validate dùng chung ──
const validate = (movie) => {
    const errors = {};
    if (!movie.title?.trim()) errors.title = 'Tên phim không được để trống';
    else if (movie.title.trim().length < 2) errors.title = 'Tên phim phải có ít nhất 2 ký tự';

    if (!movie.description?.trim()) errors.description = 'Mô tả không được để trống';
    else if (movie.description.trim().length < 10) errors.description = 'Mô tả phải có ít nhất 10 ký tự';

    if (!movie.genreId) errors.genreId = 'Vui lòng chọn thể loại';

    if (!movie.duration) errors.duration = 'Thời lượng không được để trống';
    else if (Number(movie.duration) < 1 || Number(movie.duration) > 600)
        errors.duration = 'Thời lượng phải từ 1 đến 600 phút';

    if (!movie.year) errors.year = 'Năm không được để trống';
    else if (Number(movie.year) < 1900 || Number(movie.year) > 2030)
        errors.year = 'Năm phải từ 1900 đến 2030';

    if (!movie.country?.trim()) errors.country = 'Quốc gia không được để trống';
    if (!movie.avatar?.trim()) errors.avatar = 'Vui lòng nhập URL hoặc chọn ảnh';

    return errors;
};

// ── Dữ liệu form trống ──
const emptyForm = { title: '', description: '', avatar: '', genreId: '', duration: '', year: '', country: '' };

// ── Component chính ──
const MovieForm = () => {
    const { genres, isEditing, editMovie, showEditModal } = useMovieState();
    const { dispatch, createMovie, updateMovie } = useMovieDispatch();

    // State riêng cho Form Thêm mới (không liên quan reducer)
    const [createForm, setCreateForm] = useState(emptyForm);
    const [createPreview, setCreatePreview] = useState('');
    const [createErrors, setCreateErrors] = useState({});
    const [createValidated, setCreateValidated] = useState(false);

    // State Modal thông báo thêm thành công
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [addedMovie, setAddedMovie] = useState(null);

    // State riêng cho ảnh preview của Modal Sửa
    const [editPreview, setEditPreview] = useState('');
    const [editErrors, setEditErrors] = useState({});
    const [editValidated, setEditValidated] = useState(false);

    // ── Xử lý Form Thêm mới ──
    const handleCreateChange = (e) => {
        const { name, value } = e.target;
        setCreateForm(prev => ({ ...prev, [name]: value }));
        if (createErrors[name]) setCreateErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleCreateFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setCreatePreview(ev.target.result);
            setCreateForm(prev => ({ ...prev, avatar: ev.target.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        setCreateValidated(true);
        const errs = validate(createForm);
        setCreateErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const data = {
            ...createForm,
            genreId: parseInt(createForm.genreId),
            duration: parseInt(createForm.duration),
            year: parseInt(createForm.year),
        };

        const ok = await createMovie(data);
        if (ok) {
            setAddedMovie({ ...data, title: createForm.title, avatar: createForm.avatar });
            setCreateForm(emptyForm);
            setCreatePreview('');
            setCreateErrors({});
            setCreateValidated(false);
            setShowSuccessModal(true);
        }
    };

    // ── Xử lý Modal Sửa ──
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'UPDATE_EDIT_FIELD', payload: { name, value } });
        if (editErrors[name]) setEditErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleEditFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setEditPreview(ev.target.result);
            dispatch({ type: 'UPDATE_EDIT_FIELD', payload: { name: 'avatar', value: ev.target.result } });
        };
        reader.readAsDataURL(file);
    };

    const handleCloseEditModal = () => {
        dispatch({ type: 'CLOSE_EDIT_MODAL' });
        setEditPreview('');
        setEditErrors({});
        setEditValidated(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditValidated(true);
        const errs = validate(editMovie);
        setEditErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const data = {
            ...editMovie,
            genreId: parseInt(editMovie.genreId),
            duration: parseInt(editMovie.duration),
            year: parseInt(editMovie.year),
        };

        const ok = await updateMovie(isEditing, data);
        if (ok) {
            handleCloseEditModal();
        }
    };

    return (
        <>
            {/* ── FORM THÊM MỚI ── */}
            <Container className="p-4 mb-4 border rounded shadow-sm">
                <h4 className="mb-3">➕ Thêm Phim Mới</h4>
                <Form noValidate validated={createValidated} onSubmit={handleCreateSubmit}>
                    <MovieFields
                        movie={createForm}
                        onChange={handleCreateChange}
                        onFileChange={handleCreateFileChange}
                        imagePreview={createPreview}
                        genres={genres}
                        errors={createErrors}
                        validated={createValidated}
                    />
                    <Button variant="success" type="submit">➕ Thêm Phim</Button>
                </Form>
            </Container>

            {/* ── MODAL THÊM THÀNH CÔNG ── */}
            <Modal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
                centered
                size="sm"
            >
                <Modal.Header
                    closeButton
                    style={{ background: '#d1fae5', borderBottom: '1px solid #a7f3d0' }}
                >
                    <Modal.Title style={{ color: '#065f46', fontSize: 18 }}>
                        ✅ Thêm phim thành công!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    {addedMovie?.avatar && (
                        <Image
                            src={addedMovie.avatar}
                            alt={addedMovie.title}
                            rounded
                            style={{
                                width: 90,
                                height: 90,
                                objectFit: 'cover',
                                marginBottom: 12,
                                border: '3px solid #10b981',
                            }}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/90'; }}
                        />
                    )}
                    <p className="mb-1 text-muted small">Phim đã được thêm vào danh sách:</p>
                    <h5 className="fw-bold text-success mb-0">🎬 {addedMovie?.title}</h5>
                </Modal.Body>
                <Modal.Footer className="justify-content-center pb-3 pt-0 border-0">
                    <Button
                        variant="success"
                        onClick={() => setShowSuccessModal(false)}
                        className="px-4"
                    >
                        OK, tiếp tục
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ── MODAL CHỈNH SỬA ── */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>✏️ Chỉnh sửa Phim #{isEditing}</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={editValidated} onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        {editMovie && (
                            <MovieFields
                                movie={editMovie}
                                onChange={handleEditChange}
                                onFileChange={handleEditFileChange}
                                imagePreview={editPreview}
                                genres={genres}
                                errors={editErrors}
                                validated={editValidated}
                            />
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>Hủy</Button>
                        <Button variant="warning" type="submit">💾 Lưu Thay Đổi</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default MovieForm;