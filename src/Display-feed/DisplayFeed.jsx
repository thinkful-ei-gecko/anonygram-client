import React, { useState, useEffect } from 'react';
import DisplayItem from './Display-item/DisplayItem';
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
	const [isLoading, setLoading] = useState(true);

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

	const incrementUpvotes = id => {
		// const handleDebounce = debounce(imageApi.patchImageKarma, 3000);

		const tempImageFeed = imageFeed.map(imgObj => imgObj);
		const image = tempImageFeed.find(imgObj => imgObj.id === id);
		const index = tempImageFeed.indexOf(image);
		let currKarma = tempImageFeed[index].upvotes++;
		setImageFeed(tempImageFeed);
		ImageApi.patchImageKarma(id, currKarma);
		console.log(id, currKarma);

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
									imgAddress={imgObj.imgAddress}
									upvotes={imgObj.upvotes}
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
