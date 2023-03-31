import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    return (
        <header>
            <h1>BOOK PIE</h1>
            {location.pathname.indexOf('/report') !== -1 ? 
                <div className="button-box">
                    <Link to="/">책 목록으로</Link>
                </div>
                : null
            }
        </header>
    )
}

export default Header;