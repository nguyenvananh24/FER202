import {Form,Button,Row,Col,InputGroup,Alert,Card,} from "react-bootstrap";

export default function FlightBookingForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submit form (chưa xử lý dữ liệu)");
  };

  return (
    <Card style={{ maxWidth: 500 }} className="mx-auto mt-4">
      <Card.Body>


        <Alert variant="warning">
          Vui lòng nhập đầy đủ thông tin
        </Alert>

 
        <h4 className="mb-3">Form đặt vé máy bay</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>

            <InputGroup>
              <InputGroup.Text>👤</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Họ tên"
              />
              <InputGroup.Text>vnd</InputGroup.Text>
            </InputGroup>

            <Form.Text className="text-muted">
              Phải nhập 5 ký tự, in hoa...
            </Form.Text>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ"
            />
            <Form.Text className="text-muted">
              Phải nhập 5 ký tự, in hoa...
            </Form.Text>
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Đi từ</Form.Label>
                <Form.Select>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                  <option>TP.HCM</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Đến</Form.Label>
                <Form.Select>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                  <option>TP.HCM</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
            <Form.Check
              type="radio"
              label="Đi"
              name="trip"
              defaultChecked
            />
            <Form.Check
              type="radio"
              label="Về"
              name="trip"
            />
          </Form.Group>

          <Button type="submit" className="w-100">
            Đặt vé
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}