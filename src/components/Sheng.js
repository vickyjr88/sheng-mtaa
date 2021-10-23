import { Card } from 'react-bootstrap'

var Sheng = ({ sheng }) => {
    return (
        <Card className="m-1 p-2">
            <h5>{sheng.word}</h5>
            <div>{sheng.meaning}</div>
        </Card>
    );
}

export default Sheng;