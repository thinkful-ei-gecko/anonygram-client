import React, { useState, useEffect } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import './DisplayFeed.css';

export default function DisplayFeed(props) {

    const filler = [
        { imgAddress: 'https://picsum.photos/id/1039/400/400', upvotes: 99 },
        { imgAddress: 'https://picsum.photos/id/1038/400/400', upvotes: 200 },
        { imgAddress: 'https://picsum.photos/id/1037/400/400', upvotes: 12 },
        { imgAddress: 'https://picsum.photos/id/1036/400/400', upvotes: 33 },
        { imgAddress: 'https://picsum.photos/id/1035/400/400', upvotes: 55 },
        { imgAddress: 'https://picsum.photos/id/1044/400/400', upvotes: 44 },
        { imgAddress: 'https://picsum.photos/id/1033/400/400', upvotes: 88 },
        { imgAddress: 'https://picsum.photos/id/1032/400/400', upvotes: 11 },
        { imgAddress: 'https://picsum.photos/id/1031/400/400', upvotes: 3 },
    ]


    const [imageFeed, setImageFeed] = useState(filler);
    // const [userPos, setUserPos] = useState({});
    const [isLoading, setLoading] = useState(false);

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(setUserPos);

    // }, []);

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

    return (
        <section className="display-feed">
            <ul className="img-container">
                {imageFeed.map((imgObj, index) => (
                    <DisplayItem imgAddress={imgObj.imgAddress} upvotes={imgObj.upvotes} key={index} />
                ))}
            </ul>
        </section>
    )
}