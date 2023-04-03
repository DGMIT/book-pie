import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyledBox } from "../../styled/StyledBox";

const ReadCountBox = () => {
  const [days, setDays] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);

  const countConsecutiveDays = (arr: [{writtenDatetime: string}]) => {
    const dateArr = arr.map(el => el.writtenDatetime);
    const daysUniqueArr = Array.from(
      new Set(dateArr.map((dateStr) => moment(dateStr).format("YYYY-MM-DD")))
    );
    if (daysUniqueArr.length < 1) return 0;

    let count = 0;
    //오늘 독후감이 있으면 오늘부터 카운트
    if (daysUniqueArr[0] === moment().format("YYYY-MM-DD")) {
      const today = moment();
      for (let day of daysUniqueArr) {
        if (day === today.format("YYYY-MM-DD")) {
          count++;
          today.subtract(1, "days");
          continue;
        } else break;
      }
      return count;
    } else if (
      daysUniqueArr[0] === moment().subtract(1, "days").format("YYYY-MM-DD")
    ) {
      //어제부터 카운트
      const yesterday = moment().subtract(1, "days");
      for (let day of daysUniqueArr) {
        if (day === yesterday.format("YYYY-MM-DD")) {
          count++;
          yesterday.subtract(1, "days");
          continue;
        } else break;
      }
      return count;
    }
    return 0;
  };

  const getConsecutiveDays = async () => {
    try {
      const response = await axios.get("http://localhost:4000/book/days/all");
      const data = response.data;
      setDays(countConsecutiveDays(data));
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getConsecutiveDays();
  }, []);

  return (
    <StyledBox>
      <h2>
        {days}일째 독서 중 {"🔥".repeat(Math.ceil(days / 7))}
      </h2>
    </StyledBox>
  );
};

export default ReadCountBox;
