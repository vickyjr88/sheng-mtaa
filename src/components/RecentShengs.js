import { Card } from 'react-bootstrap'
import useRecentSheng from '../api/useRecentSheng'

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
                recentShengs.map((sheng, index) => {
                    return <div key={index} className="mb-1">
                        <h6>{sheng.word}</h6>
                        <div>{sheng.meaning}</div>
                    </div>
                })
            }
        </Card>
    );
}

export default RecentShengs;