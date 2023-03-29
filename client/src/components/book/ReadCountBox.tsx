import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledReadCountBox = styled.div`
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-bottom: 20px;
    padding: 10px 20px;
`;

const ReadCountBox = () => {
    const [days, setDays] = useState<number>(0);
    const [isError, setIsError] = useState<boolean>(false);

    const countConsecutiveDays = (arr: string[]) => {
        const daysUniqueArr = Array.from(new Set(arr.map(dateStr => moment(dateStr).format('YYYY-MM-DD'))));
        if(daysUniqueArr.length < 1) return 0;
        
        let count = 0;
        //오늘 독후감이 있으면 오늘부터 카운트
        if(daysUniqueArr[0] === moment().format('YYYY-MM-DD')) {
            const today = moment();
            for(let day of daysUniqueArr){
                if(day === today.format('YYYY-MM-DD')) {
                    count++;
                    today.subtract(1, 'days');
                    continue;
                } else break;
            }
            return count;
        } else if(daysUniqueArr[0] === moment().subtract(1, 'days').format('YYYY-MM-DD')) { //어제부터 카운트
            const yesterday = moment().subtract(1, 'days');
            for(let day of daysUniqueArr){
                if(day === yesterday.format('YYYY-MM-DD')) {
                    count++;
                    yesterday.subtract(1, 'days');
                    continue;
                } else break;
            }
            return count;
        }
        return 0;
    }

    const handleFetch = () => {
        axios
            .get("http://localhost:4000/book/days/all")
            .then((response) => {
                const data = response.data;
                if(data.result === 'OK') {
                    setDays(countConsecutiveDays(data.daysArr));
                    setIsError(false);
                }
            })
            .catch((error) => {
                setIsError(true);
            });
    };
    
    useEffect(() => {
        handleFetch();
    }, [])

    return (
        <StyledReadCountBox>
            <h2>{days}일째 독서  중 {"🔥".repeat(Math.ceil(days / 7))}</h2>
        </StyledReadCountBox>
    )
}

export default ReadCountBox;