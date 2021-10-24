import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

var ShengDetails = ({ id, sheng }) => {
    return (
        <Col md={8}>
            <h5>{sheng.word}</h5>
            <div>
                {sheng.meaning}
            </div>
        </Col>
    );
}

export default ShengDetails;