

const CATEGORIES = ["standart", 'luxury', 'deluxe']
const BookingSideBar = (props) => {
    const { categories } = props

    const getCoords = (id) => {
        const row = document.querySelector('.room-' + id)
        console.log(row)
        const coords = row?.getBoundingClientRect()
        console.log(id, coords)
        return coords?.top
    }

    return (
        <div>
            <h4>BookingSideBar</h4>
            <div className="">
                {categories.map((el, index) => (
                    <div key={index} style={{position: 'absolute', top: getCoords(el.id)}}>{el.category}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookingSideBar