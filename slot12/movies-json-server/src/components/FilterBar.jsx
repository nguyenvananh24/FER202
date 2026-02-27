import React from 'react';
import { Row, Col, Form, InputGroup, Button, Badge } from 'react-bootstrap';

/**
 * FilterBar – Tìm kiếm, lọc thể loại, lọc thời lượng, sắp xếp tên phim.
 *
 * Props:
 *  - filters: { search, genreId, durationMin, durationMax, sortOrder }
 *  - genres: array of { id, name }
 *  - onChange: (newFilters) => void
 *  - resultCount: số phim sau khi lọc
 */
const FilterBar = ({ filters, genres = [], onChange, resultCount }) => {
    const handleChange = (field, value) => {
        onChange({ ...filters, [field]: value });
    };

    const handleReset = () => {
        onChange({
            search: '',
            genreId: '',
            durationMin: '',
            durationMax: '',
            sortOrder: '',
        });
    };

    const isFiltered =
        filters.search ||
        filters.genreId ||
        filters.durationMin ||
        filters.durationMax ||
        filters.sortOrder;

    return (
        <div
            className="p-3 mb-3 rounded border"
            style={{ background: '#f8f9fa' }}
        >
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="mb-0 fw-bold text-secondary">
                    🔍 Tìm kiếm &amp; Bộ lọc
                </h6>
                <div className="d-flex align-items-center gap-2">
                    {resultCount !== undefined && (
                        <Badge bg="primary" pill>
                            {resultCount} phim
                        </Badge>
                    )}
                    {isFiltered && (
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={handleReset}
                        >
                            ✕ Xoá bộ lọc
                        </Button>
                    )}
                </div>
            </div>

            <Row className="g-2 align-items-end">
                {/* Ô tìm kiếm tên phim */}
                <Col xs={12} md={4}>
                    <Form.Label className="small fw-semibold mb-1">Tên phim</Form.Label>
                    <InputGroup size="sm">
                        <InputGroup.Text>🔍</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm tên phim..."
                            value={filters.search}
                            onChange={(e) => handleChange('search', e.target.value)}
                        />
                        {filters.search && (
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleChange('search', '')}
                            >
                                ✕
                            </Button>
                        )}
                    </InputGroup>
                </Col>

                {/* Lọc theo thể loại */}
                <Col xs={6} md={2}>
                    <Form.Label className="small fw-semibold mb-1">Thể loại</Form.Label>
                    <Form.Select
                        size="sm"
                        value={filters.genreId}
                        onChange={(e) => handleChange('genreId', e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {genres.map((g) => (
                            <option key={g.id} value={String(g.id)}>
                                {g.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>

                {/* Lọc thời lượng min */}
                <Col xs={6} md={2}>
                    <Form.Label className="small fw-semibold mb-1">
                        Thời lượng từ (phút)
                    </Form.Label>
                    <Form.Control
                        size="sm"
                        type="number"
                        placeholder="0"
                        min="0"
                        value={filters.durationMin}
                        onChange={(e) => handleChange('durationMin', e.target.value)}
                    />
                </Col>

                {/* Lọc thời lượng max */}
                <Col xs={6} md={2}>
                    <Form.Label className="small fw-semibold mb-1">
                        đến (phút)
                    </Form.Label>
                    <Form.Control
                        size="sm"
                        type="number"
                        placeholder="600"
                        min="0"
                        value={filters.durationMax}
                        onChange={(e) => handleChange('durationMax', e.target.value)}
                    />
                </Col>

                {/* Sắp xếp theo tên */}
                <Col xs={6} md={2}>
                    <Form.Label className="small fw-semibold mb-1">Sắp xếp tên</Form.Label>
                    <Form.Select
                        size="sm"
                        value={filters.sortOrder}
                        onChange={(e) => handleChange('sortOrder', e.target.value)}
                    >
                        <option value="">Mặc định</option>
                        <option value="asc">🔤 A → Z (Tăng dần)</option>
                        <option value="desc">🔤 Z → A (Giảm dần)</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Tags bộ lọc đang active */}
            {isFiltered && (
                <div className="d-flex flex-wrap gap-1 mt-2">
                    {filters.search && (
                        <Badge bg="info" className="fw-normal">
                            🔍 &quot;{filters.search}&quot;
                        </Badge>
                    )}
                    {filters.genreId && (
                        <Badge bg="success" className="fw-normal">
                            🎭 {genres.find((g) => String(g.id) === filters.genreId)?.name}
                        </Badge>
                    )}
                    {(filters.durationMin || filters.durationMax) && (
                        <Badge bg="warning" text="dark" className="fw-normal">
                            ⏱ {filters.durationMin || 0} – {filters.durationMax || '∞'} phút
                        </Badge>
                    )}
                    {filters.sortOrder && (
                        <Badge bg="secondary" className="fw-normal">
                            {filters.sortOrder === 'asc' ? '🔤 A→Z' : '🔤 Z→A'}
                        </Badge>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterBar;
