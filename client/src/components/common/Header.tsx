import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { StyledSubLinkBtn } from "../../styled/StyledBtn";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between; 
    padding: 20px 0;
    > h1 {
        font-size: 34px;
        color: var(--point-color);
    }

    .button-box {
        padding-top: 4px;
    }
`;

const Header = () => {
    const location = useLocation();

    return (
        <StyledHeader>
            <h1>BOOK PIE</h1>
            {location.pathname.indexOf('/report') !== -1 ? 
                <StyledSubLinkBtn className="button-box">
                    <Link to="/">책 목록으로</Link>
                </StyledSubLinkBtn>
                : null
            }
        </StyledHeader>
    )
}

export default Header;