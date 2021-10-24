import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useSheng from "../api/useSheng";
import { Spinner } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router";

var ShengDetails = () => {
    const baseUrl = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL_LOCAL : process.env.REACT_APP_BASE_URL
    const history = useHistory()

    const goBack = () => {
        history.goBack()
    }

    let params = useParams()
    console.log(params)

    const {
        sheng,
        loading,
        error
    } = useSheng(baseUrl, params.slug)

    return (
        <Col md={8}>
            {
                loading &&
                <div className="d-flex justify-content-center m-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
            {!error &&
                <>
                    <h5>{sheng.word}</h5>
                    <div>
                        {sheng.meaning}
                    </div>
                    <Link onClick={goBack}>Go back</Link>
                </>
            }
            <div className="d-flex justify-content-center m-4">{error && 'Something went wrong.'}</div>
        </Col>
    );
}

export default ShengDetails;