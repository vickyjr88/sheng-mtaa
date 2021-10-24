import { Card } from 'react-bootstrap'
import useRecentMchongoano from '../api/useRecentMchongoano'

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
                recentMchongoanos.map((sheng, index) => {
                    return <div key={index} className="m-1 p-2">
                        {sheng.text}
                    </div>
                })
            }
        </Card>
    );
}

export default RecentMchongoanos;