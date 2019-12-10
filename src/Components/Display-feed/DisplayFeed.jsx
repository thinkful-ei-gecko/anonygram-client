import React, { useEffect, useContext } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import ImageContext from '../../contexts/ImageContext';
import Paginator from 'react-hooks-paginator';


import './DisplayFeed.css';

export default function DisplayFeed(props) {
    useEffect(() => {
        props.setView('feed');
    }, []);
    //
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const context = useContext(ImageContext);
    const data = context.images; 
    console.log(context)
    useEffect(() => {
        setCurrentData(data.slice(offset, offset + pageLimit));
      }, [offset, data]);

    const generateJSX = () => {
        if (!context.images) {
            return null;
        }
        return (
            <>
            //display currentData 
                <ul className="img-container">
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
                <Paginator
                totalRecords={data.length}
                pageLimit={4}
                pageNeighbours={1}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
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
