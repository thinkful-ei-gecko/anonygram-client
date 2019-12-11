import React, { useState, useEffect, useContext, useRef } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import ImageContext from '../../contexts/ImageContext';
// import Paginator from 'react-hooks-paginator';


import './DisplayFeed.css';

export default function DisplayFeed(props) {
    // const [offset, setOffset] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [currentData, setCurrentData] = useState([]);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);
    const [pageOffset, setPageOffset] = useState(0);

    const context = useContext(ImageContext);

    const dpFeedRef = useRef(null);
    const data = context.images; 

    useEffect(() => {
        props.setView('feed');
    }, []);

    useEffect(() => {
            setScrollHeight(dpFeedRef.current.scrollHeight);
            setScreenHeight(window.innerHeight);
            setPageOffset(window.pageYOffset);
            console.log('scroll ' + scrollHeight);
            console.log('height ' + screenHeight);
            console.log('offset ' + pageOffset);
    }, [scrollHeight, pageOffset, screenHeight, context.images]);

    useEffect(() => {
        const handleScroll = () => {
            setPageOffset(window.pageYOffset);
            console.log(pageOffset)
        }
        window.addEventListener('scroll', handleScroll);
        return (() => {
            window.removeEventListener('scroll', handleScroll);
        })
    }, []);

    // useEffect(() => {
    //     setCurrentData(data.slice(offset, offset + pageLimit));
    //   }, [offset, data]);

    const generateJSX = () => {
        if (!context.images) {
            return null;
        }
        return (
            <>
                <ul className="img-container" ref={dpFeedRef}>
                    {data.map(imgObj => (
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
