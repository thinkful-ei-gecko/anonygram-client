import React, { useState, useEffect } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import ImageApi from '../services/image-api-service';
import './DisplayFeed.css';

export default function DisplayFeed(props) {
    const { userLocation, newContentLoaded, updateNewContent } = props;
    const { lat, long } = userLocation;


    const [imageFeed, setImageFeed] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        ImageApi.getLocalImages('top', lat, long)
            .then((res) => {
                console.log(res);
                setImageFeed(res);
                setLoading(false);
            })
    }, [lat, long, newContentLoaded]);

    const debounce = (func, delay) => {
        console.log({ func }, { delay });
        let debounceTimer;
        return () => {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const incrementUpvotes = id => {
        // const handleDebounce = debounce(ImageApi.patchImageKarma, 3000);

        const tempImageFeed = imageFeed.map(imgObj => imgObj);
        const image = tempImageFeed.find(imgObj => imgObj.id === id);
        const index = tempImageFeed.indexOf(image);
        let currKarma = tempImageFeed[index].karma_total++;
        setImageFeed(tempImageFeed);
        ImageApi.patchImageKarma(id, currKarma);
        // console.log(id, currKarma);

        // handleDebounce(id, currKarma);
    };
    const generateJSX = () => {
        if (isLoading) {
            return (
                <div className="loader"></div>
            )
        }
        return (
            <ul className="img-container">
                {imageFeed.map(imgObj => (
                    <DisplayItem
                        imgAddress={imgObj.image_url}
                        upvotes={imgObj.karma_total}
                        id={imgObj.id}
                        incrementUpvotes={incrementUpvotes}
                        key={imgObj.id}
                    />
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
