import { Link } from "react-router-dom";

var Sheng = ({ sheng, onAction }) => {
    return (
        <div>
            <h5>{sheng.word}</h5>
            <div>
                {sheng.meaning} <Link to={{
                    pathname: `/shengs/${sheng.sliug}`,
                }} onClick={() => {onAction(sheng)}}>Read More...</Link>
            </div>
        </div>
    );
}

export default Sheng;