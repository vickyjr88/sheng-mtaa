import { useHistory } from "react-router";
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import useSheng from "../api/useSheng";
import { Spinner, Col } from "react-bootstrap";
import Comments from "./Comments"
import CommentForm from "./CommentForm";

var ShengDetails = () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL
    const history = useHistory()

    const goBack = (e) => {
        e.preventDefault()
        history.goBack()
    }

    let { slug } = useParams()

    const {
        sheng,
        loading,
        error
    } = useSheng(baseUrl, slug)

    const shengParams = {
        id: sheng.id, 
        baseUrl: baseUrl, 
        commentableType: "Sheng"
    }

    const commentsParams = {
        commentable: sheng, 
        commentableType: "Sheng"
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
                    <h5>{sheng.word}</h5>
                    <div>
                        {sheng.meaning}
                    </div>
                    <div>
                        <Comments params={commentsParams} />
                    </div>
                    <CommentForm params={shengParams} />
                    <a to="" onClick={goBack}>Go back</a>
                </>
            }
            <div className="d-flex justify-content-center m-4">{error && 'Something went wrong.'}</div>
        </Col>
    );
}

export default ShengDetails;