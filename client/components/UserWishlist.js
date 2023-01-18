import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLikedItemsThunk } from "../store/likedItems"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deleteLikedItemThunk } from '../store/likedItems';

const UserDashboard = (props) => {
    useEffect(() => {
        props.getLikedItems()

    }, [])

    const handleUnlike = async () => {
        const productName = event.target.name
        props.deleteLikedItem(productName)
    }

    return (
        <div>{props.likedItems.length ?
            <div>
                <h1 className='bold'>My Wishlist</h1>
                <br></br>
                <br></br>
                <div className='flex-for-liked-items '>
                    {props.likedItems.map(plant => {
                        return (<div key={plant.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={plant.imageUrl} />
                                <Card.Body>
                                    <Card.Title className='bold '>{plant.name}</Card.Title>
                                    <Card.Text>
                                        Description: {plant.description}
                                    </Card.Text>
                                    <Card.Text>
                                        Price: ${plant.price}
                                    </Card.Text>
                                    <Button onClick={handleUnlike} name={plant.name}>Remove</Button>
                                </Card.Body>
                            </Card>
                            <br></br>

                        </div>)
                    })}
                </div>

            </div> : <h1>You have no plants in your wishlist :(.</h1>}
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        likedItems: state.likedItems
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getLikedItems: () => {
            (dispatch(getLikedItemsThunk()))
        }, deleteLikedItem: (productName) => {
            (dispatch(deleteLikedItemThunk(productName)))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)