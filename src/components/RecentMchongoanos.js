import { Spinner, Card } from 'react-bootstrap'
import useRecentMchongoano from '../api/useRecentMchongoano'
import { Link } from 'react-router-dom'

var RecentMchongoanos = ({ baseUrl }) => {
    const {
        recentMchongoanos,
        loading,
        error
    } = useRecentMchongoano(baseUrl)

    return (
        <Card className="p-2 mb-2">
            <h5>Mchongoano</h5>
            {
                loading &&
                <div className="d-flex justify-content-center m-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }

            {
                recentMchongoanos.map((sheng, index) => {
                    return <div key={index} className="mb-1">
                        {sheng.text}
                    </div>
                })
            }
            <Link to={{pathname: `/mchongoanos`}}>View More...</Link>
            <div className="d-flex justify-content-center m-1">{error && 'Something went wrong.'}</div>
        </Card>
    );
}

export default RecentMchongoanos;