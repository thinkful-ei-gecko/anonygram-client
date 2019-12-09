import React, { useEffect, useContext } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import ImageContext from '../../contexts/ImageContext';
// import AlertContext from '../../contexts/AlertContext';
import KarmaService from '../../services/karma-service';
import ImageApi from '../../services/image-api-service';

import './DisplayFeed.css';

export default function DisplayFeed(props) {
    const context = useContext(ImageContext);
    const { setView } = props;

    useEffect(() => {
        setView('feed');
      }, []);

    const incrementUpvotes = async id => {
        if (KarmaService.getKarma() < 1) {
            context.setAlert("Looks like you're out of karma. You'll get some more soon!")
            return;
        }

        //update the item in a deep copy of the array. you will need to update the state with a copy of the array photos provided
        const tempImageFeed = context.images.map(imgObj => imgObj);
        const image = tempImageFeed.find(imgObj => imgObj.id === id);
        const index = tempImageFeed.indexOf(image);
        tempImageFeed[index].karma_total++;
        let currKarma = tempImageFeed[index].karma_total;

        //set the copy to the context's value
        context.setImages(tempImageFeed)

        //if the total matches ther servers, decrement the karma, otherwise there's an error, so take any karma.
        const res = await ImageApi.patchImageKarma(id, currKarma)

        if (res.karma_total === currKarma) {
            KarmaService.decrementKarma()
        } else {
            context.setAlert('Error: Please refresh page');
        }
    };

    const generateJSX = () => {
        if (!context.images) {
            return null;
        }
        return (
            <ul className="img-container">
                {context.images.map(imgObj => (
                    <DisplayItem
                        imgAddress={imgObj.image_url}
                        imgCaption={imgObj.image_text}
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
