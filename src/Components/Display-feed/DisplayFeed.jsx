import React, { useEffect, useContext } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import ImageContext from '../../contexts/ImageContext';

import './DisplayFeed.css';

export default function DisplayFeed(props) {
    const { setView } = props;

    useEffect(() => {
        setView('feed');
    }, []);

    const context = useContext(ImageContext);

    const generateJSX = () => {
        const { images, handleDelete, incrementUpvotes } = context;

        if (!images) {
            return null;
        }
        return (
            <>
                <ul className="img-container">
                    {images.map(imgObj => (
                        <DisplayItem
                            imgAddress={imgObj.image_url}
                            imgCaption={imgObj.image_text}
                            upvotes={imgObj.karma_total}
                            id={imgObj.id}
                            userId={imgObj.user_id}
                            incrementUpvotes={incrementUpvotes}
                            handleDelete={handleDelete}
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
