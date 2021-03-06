import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useMchongoano from "../api/useMchongoano";
import { Spinner, Col } from "react-bootstrap";
import Comments from "./Comments"
import CommentForm from "./CommentForm";

var MchongoanoDetails = () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL
    const history = useHistory()

    const goBack = (e) => {
        e.preventDefault()
        history.goBack()
    }

    let { id } = useParams()

    const {
        mchongoano,
        loading,
        error
    } = useMchongoano(baseUrl, id)

    const mchongoanoParams = {
        id: mchongoano.id, 
        baseUrl: baseUrl, 
        commentableType: "Mchongoano"
    }
    const commentsParams = {
        commentable: mchongoano, 
        commentableType: "Mchongoano"
    }

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
                        <Comments params={commentsParams} />
                    </div>
                    <CommentForm params={mchongoanoParams} />
                    <a onClick={goBack}>Go back</a>
                </>
            }
            <div className="d-flex justify-content-center m-4">{error && 'Something went wrong.'}</div>
        </Col>
    );
}

export default MchongoanoDetails;