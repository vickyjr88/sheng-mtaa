import { Card } from 'react-bootstrap'
import useRecentSheng from '../api/useRecentSheng'

var RecentShengs = ({ baseUrl }) => {
    const {
        recentShengs,
        loading,
        error
    } = useRecentSheng(baseUrl)

    return (
        <>
            <h5>Latest sheng</h5>
            {
                recentShengs.map((sheng, index) => {
                    return <div key={index}><Card className="m-1 p-2">
                        <h5>{sheng.word}</h5>
                        <div>{sheng.meaning}</div>
                    </Card>
                    </div>
                })
            }
        </>
    );
}

export default RecentShengs;