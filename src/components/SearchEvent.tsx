import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SearchEvent() {
  return (
    <Container 
      fluid 
      className="search-event-container text-center bg-light p-3 rounded mb-4" 
      style={{ zIndex: 10, maxWidth: '90%' }}>
      <Row className="g-2">
        <Col xs={12} sm={6} md={3}>
          <Form.Select aria-label="Looking for" className="border-warning">
            <option>Choose Evenet type </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </Form.Select>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Form.Select aria-label="Location" className="border-warning">
            <option>Choose Location...</option>
            <option value="1">Location 1</option>
            <option value="2">Location 2</option>
            <option value="3">Location 3</option>
          </Form.Select>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Form.Select aria-label="When" className="border-warning">
            <option>Choose date and time .</option>
            <option value="1">Today</option>
            <option value="2">Tomorrow</option>
            <option value="3">This week</option>
          </Form.Select>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Button variant="warning" type="submit" className="w-100">Search</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchEvent;

