import BookBox from "./BookBox";

const BookList = () => {
    return (
        <section>
            {new Array(5).fill(0).map((el, idx) => (
                <BookBox key={idx}/>
            ))}
        </section>
    )
}

export default BookList;