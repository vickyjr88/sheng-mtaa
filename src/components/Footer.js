import { Row, Col } from "react-bootstrap";

const Footer = () => {
    const d = new Date();
    let year = d.getFullYear();
    return (
        <footer className="container">
            <div className="row">
                <div className="col">
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <ins className="adsbygoogle" data-ad-client="ca-pub-7584137573418930"
                        data-ad-slot="6760469728" data-ad-format="auto" data-full-width-responsive="true"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({ });
                    </script>
                </div>
            </div>
            <Row>
                <Col>
                    <a href="https://twitter.com/shengmtaa?ref_src=twsrc%5Etfw" className="twitter-follow-button"
                        data-show-count="false">Follow @shengmtaa</a>
                    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </Col>
            </Row>
            <Row>
                <Col>
                    &copy;{year} Vital Digital Media.
                </Col>
            </Row>
        </footer>
    )
}

export default Footer