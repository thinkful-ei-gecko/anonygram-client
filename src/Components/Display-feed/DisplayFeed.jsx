import React, { useState, useEffect, useContext, useRef } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import ImageContext from '../../contexts/ImageContext';

import './DisplayFeed.css';

export default function DisplayFeed(props) {
    const [pageOffset, setPageOffset] = useState(1000);
    const [bottom, setBottom] = useState(2000);

    const context = useContext(ImageContext);
    const dpFeedRef = useRef(null);

    const { images, page, setPage, morePagesAvail, debounce } = context;

    useEffect(() => {
        props.setView('feed');
        setPageOffset(window.pageYOffset);
        setBottom(dpFeedRef.current.getBoundingClientRect().bottom);
    }, []);

    useEffect(() => {
        if (dpFeedRef.current) {
            setBottom(dpFeedRef.current.getBoundingClientRect().bottom);
        }

        if (pageOffset >= bottom && morePagesAvail && !debounce) {
            let pageClone = page + 1;
            setPage(pageClone);
            setPageOffset(window.pageYOffset);
        };

    }, [bottom, pageOffset, morePagesAvail, page, setPage, debounce]);

    useEffect(() => {
        const handleScroll = () => {
            setPageOffset(window.pageYOffset);
        }
        window.addEventListener('scroll', handleScroll);
        return (() => {
            window.removeEventListener('scroll', handleScroll);
        })
    }, []);

    const generateJSX = () => {
        if (!context.images) {
            return null;
        }
        return (
            <>
                <ul className="img-container" ref={dpFeedRef}>
                    {images.map(imgObj => (
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
                />
            </>
        )
    }

    return (
        <section className="display-feed">
            {generateJSX()}
        </section>
    )
}
