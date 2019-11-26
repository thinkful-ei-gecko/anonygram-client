import React, { useState } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import './DisplayFeed.css';

export default function DisplayFeed() {

    const filler = [
        {imgAddress: 'https://picsum.photos/id/1039/400/400', upvotes: 99},
        {imgAddress: 'https://picsum.photos/id/1038/400/400', upvotes: 99},
        {imgAddress: 'https://picsum.photos/id/1037/400/400', upvotes: 99},
        {imgAddress: 'https://picsum.photos/id/1036/400/400', upvotes: 99},
        {imgAddress: 'https://picsum.photos/id/1035/400/400', upvotes: 99},
        {imgAddress: 'https://picsum.photos/id/1044/400/400', upvotes: 99},
        {imgAddress: 'https://picsum.photos/id/1033/400/400', upvotes: 99},
        {imgAddress: 'https://picsum.photos/id/1032/400/400', upvotes: 99},
        {imgAddress: 'https://picsum.photos/id/1031/400/400', upvotes: 99},
    ]

    const [imageFeed, setImageFeed] = useState(filler);

    console.log(imageFeed);

    return (
        <section className="display-feed">
            <ul className="img-container">
                {imageFeed.map((imgObj, index) => (
                    <DisplayItem imgAddress={imgObj.imgAddress} upvotes={imgObj.upvotes} key={index}/>
                ))}
            </ul>
        </section>
    )
}