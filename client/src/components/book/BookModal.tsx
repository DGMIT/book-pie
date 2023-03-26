import { MouseEventHandler } from "react";

const BookModal = ({closeModal}: {closeModal: MouseEventHandler}) => {
    return (
        <div>
            <h2>책 등록하기</h2>
            <div>
                <label htmlFor="book-title">책 제목*</label>
                <input id="book-title"/>
            </div>
            <div>
                <label htmlFor="book-author">저자</label>
                <input id="book-author"/>
            </div>
            <div>
                <label htmlFor="book-publisher">출판사</label>
                <input id="book-publisher"/>
            </div>
            <div>
                <span>페이지*</span>
                <div>
                    <label htmlFor="book-start-page-num">시작 페이지</label>
                    <input id="book-start-page-num"/>p ~ 
                    <label htmlFor="book-end-page-num">마지막 페이지</label>
                    <input id="book-end-page-num"/>p
                </div>
            </div>
            <div>
                <span>기간*</span>
                <div>
                    <label htmlFor="book-start-page-num">시작일</label>
                    <input id="book-start-page-num"/> ~ 
                    <label htmlFor="book-end-page-num">종료일</label>
                    <input id="book-end-page-num"/>
                </div>
                <div>
                    <div>
                    총페이지: 234일
                    </div>
                    <div>
                    총 기간: 31일
                    </div>
                    <div>
                    일일 권장 독서량: 7p
                    </div>
                </div>
            </div>
            <button onClick={closeModal}>취소</button>
            <button>등록</button>
        </div>
    )
}

export default BookModal;