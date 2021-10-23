import { Card } from 'react-bootstrap'
import useRecentMchongoano from '../api/useRecentMchongoano'

var RecentMchongoanos = ({ baseUrl }) => {
    const {
        recentMchongoanos,
        loading,
        error
    } = useRecentMchongoano(baseUrl)

    return (
        <>
            <h5>Mchongoano</h5>
            {
                recentMchongoanos.map((sheng, index) => {
                    return <div key={index}><Card className="m-1 p-2">
                        <div>{sheng.text}</div>
                    </Card>
                    </div>
                })
            }
        </>
    );
}

export default RecentMchongoanos;