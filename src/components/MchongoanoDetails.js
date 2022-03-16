import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useMchongoano from "../api/useMchongoano";
import { Spinner } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router";
import Like from "./Like";


var MchongoanoDetails = () => {
    const baseUrl = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL_LOCAL : process.env.REACT_APP_BASE_URL
    const history = useHistory()

    const goBack = (e) => {
        e.preventDefault()
        history.goBack()
    }

    let params = useParams()
    console.log(params)

    const {
        mchongoano,
        loading,
        error
    } = useMchongoano(baseUrl, params.id)

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
                    <div>
                        {mchongoano.text}
                    </div>
                    <Link onClick={goBack}>Go back</Link>
                </>
            }
            <div className="d-flex justify-content-center m-4">{error && 'Something went wrong.'}</div>
       <Like/>
        </Col>
        
    );
}

export default MchongoanoDetails;