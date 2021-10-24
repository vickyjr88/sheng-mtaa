import { Link } from "react-router-dom";

var Sheng = ({ sheng }) => {
    return (
        <div>
            <h5>{sheng.word}</h5>
            <div>
                {sheng.meaning} <Link to={{
                    pathname: `/shengs/${sheng.slug}`,
                }}>Read More...</Link>
            </div>
        </div>
    );
}

export default Sheng;