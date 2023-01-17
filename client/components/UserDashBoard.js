import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getLikedItemsThunk } from "../store/likedItems"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

const UserDashboard = (props) => {

    useEffect(() => {
        props.getLikedItems()
    }, [])

    const handleUnlike = async () => {
        const productId = event.target.name
        const token = window.localStorage.getItem('token')
        await axios.delete(`api/likedItems/delete/${token}/${productId}`)
    }

    return (
        <div>
            <h1 className='bold'>My liked plants</h1>
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
                                <Button onClick={handleUnlike} name={plant.id}>Unlike</Button>
                            </Card.Body>
                        </Card>
                        <br></br>

                    </div>)
                })}
            </div>

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