import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getLikedItemsThunk } from "../store/likedItems"
import Card from 'react-bootstrap/Card';

const UserDashboard = (props) => {

    useEffect(() => {
        props.getLikedItems()
    }, [])
    return (
        <div className='flex-for-liked-items'>
            <strong><h1>My liked plants</h1></strong>
            {props.likedItems.map(plant => {
                return (<div key={plant.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={plant.imageUrl} />
                        <Card.Body>
                            <Card.Title>{plant.name}</Card.Title>
                            <Card.Text>
                                Description: {plant.description}
                            </Card.Text>
                            <Card.Text>
                                Price: {plant.price}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br></br>
                </div>)
            })}

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)