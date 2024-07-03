import { BookingModal } from "../modal/BookingModal"

const BookingStepOne = () => {

    const footer = () => {

        return <div className="">Footer</div>
    }

    const header = () => {
        return <div className="">Новое бронирование</div>
    }

    const content = () => {
        return <div className="">Content</div>
    }

    const subText = () => {
        return <div className="">SubText</div>
    }

    return <BookingModal renderFooter={footer} renderHeader={header} renderMainContent={content} renderSubText={subText}/>
}

export default BookingStepOne