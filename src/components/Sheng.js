import { Link } from "react-router-dom";

var Sheng = ({ sheng }) => {
    return (
        <div>
            <h5><Link to={{pathname: `/shengs/${sheng.slug}`}}>{sheng.word}</Link></h5>
            <div>
                {sheng.meaning}
            </div>
        </div>
    );
}

export default Sheng;