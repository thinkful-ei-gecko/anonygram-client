import React, { useState, useEffect } from 'react';
import DisplayItem from './Display-item/DisplayItem';
import KarmaService from '../services/karma-service';
import ImageApi from '../services/image-api-service';

import './DisplayFeed.css';

export default function DisplayFeed(props) {
	const filler = [
		{ imgAddress: "https://picsum.photos/id/1039/400/400", upvotes: 99, id: 1 },
		{
			imgAddress: "https://picsum.photos/id/1038/400/400",
			upvotes: 200,
			id: 2
		},
		{ imgAddress: "https://picsum.photos/id/1037/400/400", upvotes: 12, id: 3 },
		{ imgAddress: "https://picsum.photos/id/1036/400/400", upvotes: 33, id: 4 },
		{ imgAddress: "https://picsum.photos/id/1035/400/400", upvotes: 55, id: 5 },
		{ imgAddress: "https://picsum.photos/id/1044/400/400", upvotes: 44, id: 6 },
		{ imgAddress: "https://picsum.photos/id/1033/400/400", upvotes: 88, id: 7 },
		{ imgAddress: "https://picsum.photos/id/1032/400/400", upvotes: 11, id: 8 },
		{ imgAddress: "https://picsum.photos/id/1031/400/400", upvotes: 3, id: 9 }
	];

	const { userLocation } = props;
	const { lat, long } = userLocation;


	const [imageFeed, setImageFeed] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
			setLoading(true);
			ImageApi.getLocalImages('top', lat, long)
					.then((res) => {
							console.log(res);
							setImageFeed(res);
							setLoading(false);
					})
	}, [lat, long]);

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

	const incrementUpvotes = async id => {
		if (KarmaService.getKarma() < 1) {
			setMessage("Looks like you're out of karma. You'll get some more soon!")
			return; 
		}
		// const handleDebounce = debounce(ImageApi.patchImageKarma, 3000);

		//update the item in a deep copy of the array. you will need to update the state with a copy of the array photos provided
		const tempImageFeed = imageFeed.map(imgObj => imgObj);
		const image = tempImageFeed.find(imgObj => imgObj.id === id);
		const index = tempImageFeed.indexOf(image);
		tempImageFeed[index].karma_total++;
		let currKarma = tempImageFeed[index].karma_total;

		//set the copy to the state's value
		setImageFeed(tempImageFeed);
		
		//if the total matches ther servers, decrement the karma, otherwise there's an error, so take any karma.
		const res = await ImageApi.patchImageKarma(id, currKarma)
		
		if (res.karma_total === currKarma) {
			KarmaService.decrementKarma()
		} else {
			setMessage('Error: Please refresh page');
		}
		
		console.log('after', currKarma);

		// handleDebounce(id, currKarma);
	};
    const generateJSX = () => {
        if (isLoading) {
					return (
							<div className="loader"></div>
					)
        }
        return (
					<>
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
						{message && <div className='DisplayFeed__div notificationsContainer'>{message}</div>}
					</>
        )
    }

    return (
        <section className="display-feed">
            {generateJSX()}
        </section>
    )
}
