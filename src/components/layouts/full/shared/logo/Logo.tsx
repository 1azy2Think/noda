import { Link } from "react-router";
import logo from "../../../../../assets/images/logo.png";
import { Image } from "antd";
import "./logo.css";

const Logo = () => {
    return (
        <Link to="/" className="link-logo">
            <Image src={logo} alt="logo" width={50} preview={false} />
        </Link>
    );
};

export default Logo;
