import React, { useContext } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import ImageContext from '../../contexts/ImageContext';

import './DisplayFeed.css';

export default function DisplayFeed(props) {
    const context = useContext(ImageContext);
	
    // const debounce = (func, delay) => {
    //     console.log({ func }, { delay });
    //     let debounceTimer;
    //     return () => {
    //         const context = this;
    //         const args = arguments;
    //         clearTimeout(debounceTimer);
    //         debounceTimer = setTimeout(() => func.apply(context, args), delay);
    //     };
    // };

    const generateJSX = () => {
        {/*if (loading) {
            return (
                <div className="loader"></div>
            )
        } else*/} if (!context.images) {
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
