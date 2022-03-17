import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import useMchongoano from "../api/useMchongoano";
<<<<<<< HEAD
import { Spinner } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router";
import Like from "./Like";

=======
import { Spinner, Col } from "react-bootstrap";
import Comments from "./Comments"
import Form from "./Form";
>>>>>>> 7c97c087b7d5866fe8301ebb391dc70d2bf66a34

var MchongoanoDetails = () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL
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
                    <div>
                    <Comments commentable={mchongoano} />
                    </div>
                    <Form/>
                    <Link onClick={goBack}>Go back</Link>
                </>
            }
            <div className="d-flex justify-content-center m-4">{error && 'Something went wrong.'}</div>
       <Like/>
        </Col>
        
    );
}

export default MchongoanoDetails;