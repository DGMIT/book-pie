import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    return (
        <header>
            <h1>BOOK PIE</h1>
            {location.pathname.indexOf('/report') !== -1 ? 
                <button>
                    <Link to="/">책 목록으로</Link>
                </button>
                : null
            }
        </header>
    )
}

export default Header;