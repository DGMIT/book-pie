export const getErrorMessage = (statusCode?: number) => {
  let errMsg;
  switch (statusCode) {
    case 404:
      errMsg = '잘못된 요청입니다.';
      break;
    case 500:
      errMsg = '서버 에러가 발생했습니다. 관리자에게 문의해 주세요.';
      break;
    default:
      errMsg = '에러가 발생했습니다. ';
  }
  return errMsg;
};
