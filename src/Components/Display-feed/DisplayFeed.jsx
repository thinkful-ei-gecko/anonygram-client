import React, { useEffect, useContext } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import ImageContext from '../../contexts/ImageContext';
// import AlertContext from '../../contexts/AlertContext';

import './DisplayFeed.css';

export default function DisplayFeed(props) {
    useEffect(() => {
        props.setView('feed');
    }, []);

    const context = useContext(ImageContext);

    const generateJSX = () => {
        if (!context.images) {
            return null;
        }
        return (
            <>
                <ul className="img-container">
                    {context.images.map(imgObj => (
                        <DisplayItem
                            imgAddress={imgObj.image_url}
                            imgCaption={imgObj.image_text}
                            upvotes={imgObj.karma_total}
                            id={imgObj.id}
                            incrementUpvotes={context.incrementUpvotes}
                            key={imgObj.id}
                        />
                    ))}
                </ul>
            </>
        )
    }

    return (
        <section className="display-feed">
            {generateJSX()}
        </section>
    )
}
