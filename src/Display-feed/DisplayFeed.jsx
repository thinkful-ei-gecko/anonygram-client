import React, { useState, useEffect } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import ImageApi from '../services/image-api-service';
import './DisplayFeed.css';

export default function DisplayFeed(props) {

    const { userLocation } = props;
    const { lat, long } = userLocation;


    const [imageFeed, setImageFeed] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        ImageApi.getLocalImages('top', lat, long)
            .then((res) => {
                console.log(res);
                setImageFeed(res);
                setLoading(false);
            })
    }, [lat, long]);

    const incrementUpvotes = (address) => {

        // will each image have a unique ID? 
        // Or should we identify them by their imgAddress?
        // PUT to server to increment upvotes -- coordinate with James
        // If user can upvote multiple time, we should probably add a debounce to the button so we only post once users finish clicking -- ignore, come back to later
        // will need to check number of times upvote clicked and compare against local storage
        // Do we want to display the counter incrementing on each click?

        // Will we need to re-insert the image into imageFeed?
        // If we do, use setImageFeed

        const image = imageFeed.find((imgObj) => imgObj.imgAddress === address);

    }

    const generateJSX = () => {
        if (isLoading) {
            return (
                <div className="loader"></div>
            )
        }
        return (
            <ul className="img-container">
                {imageFeed.map((imgObj) => (
                    <DisplayItem imgAddress={imgObj.image_url} upvotes={imgObj.karma_total} key={imgObj.id} />
                ))}
            </ul>
        )
    }

    return (
        <section className="display-feed">
            {generateJSX()}
        </section>
    )
}