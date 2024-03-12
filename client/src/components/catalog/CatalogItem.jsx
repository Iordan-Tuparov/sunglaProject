import { Link } from "react-router-dom"

export default function CatalogItem(props) {
    return (
        <div className="product">
            <img src={props.item.imageUrl} />
            <h3>Brand: {props.item.brand}</h3>
            <span>Price: ${props.item.price}</span>
            <Link to={`/sunglasses/${props.item._id}/details`}>More info</Link>
        </div>
    )
}