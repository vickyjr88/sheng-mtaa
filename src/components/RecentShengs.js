import { Card, Spinner } from 'react-bootstrap'
import useRecentSheng from '../api/useRecentSheng'
import { Link } from 'react-router-dom'

var RecentShengs = ({ baseUrl }) => {
    const {
        recentShengs,
        loading,
        error
    } = useRecentSheng(baseUrl)

    return (
        <Card className="p-2 mb-4">
            <h5>Latest sheng</h5>
            {
                loading &&
                <div className="d-flex justify-content-center m-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }

            {
                recentShengs.map((sheng, index) => {
                    return <div key={index} className="mb-1">
                        <h6>{sheng.word}</h6>
                        <div>{sheng.meaning}</div>
                    </div>
                })
            }
            <Link to={{pathname: `/shengs`}}>View More...</Link>
            <div className="d-flex justify-content-center m-1">{error && 'Something went wrong.'}</div>
        </Card>
    );
}

export default RecentShengs;