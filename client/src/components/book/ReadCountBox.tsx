import styled from "styled-components";

const StyledReadCountBox = styled.div`
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-bottom: 20px;
    padding: 10px 20px;
`;

const ReadCountBox = () => {

    return (
        <StyledReadCountBox>
            <h2>21일째 독서  중 🔥🔥🔥</h2>
        </StyledReadCountBox>
    )
}

export default ReadCountBox;