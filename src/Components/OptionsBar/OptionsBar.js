import React, { useContext } from "react";
import { Link } from 'react-router-dom';

//icons
import MapIcon from '@material-ui/icons/Map';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { ThumbUp } from '@material-ui/icons';

import NavBar from '../NavBar/NavBar';
import RefreshButton from '../RefreshButton/RefreshButton';

import UserContext from '../../contexts/UserContext';
import TokenService from "../../services/token-service";
import "./OptionsBar.css";



export default function OptionsBar(props) {
  const context = useContext(UserContext);
	const { screen, view } = props;
	if (screen === 'mobile' ) {
		return (
			<div className='OptionsBar mobile'>
			
			{/* Conditionally render button for map/feed view */}
			{(view === "feed") ? (
				<Link to='/local-map' className='resetStyles'>
					<MapIcon />
				</Link>
			) : (
				<Link to='/' className='resetStyles'>
					<DynamicFeedIcon />
				</Link>
			)}
			
			{/* Render karma count if logged in */
				TokenService.hasAuthToken() && (
					<div className="App__karma-total">
						<ThumbUp />{' '} 
						{context.user.karma_balance}
					</div>
				)
			}
	
			<RefreshButton screen={screen} handleGeolocation={props.handleGeolocation}/>
			
			<NavBar setSort={props.setSort} />
		</div>
		)
	} else {
		return (
			<div className='OptionsBar desktop'>
			
				{/* Conditionally render button for map/feed view */}
				{(view === "feed") ? (
					<Link to='/local-map' className='resetStyles'>
						Map View
					</Link>
				) : (
					<Link to='/' className='resetStyles'>
						Feed View
					</Link>
				)}
				
				{/* Render karma count if logged in */
					TokenService.hasAuthToken() && (
						<div className="App__karma-total">
							Karma Count:{' '}
							{context.user.karma_balance}
						</div>
					)
				}
		
				<RefreshButton screen={screen} handleGeolocation={props.handleGeolocation}/>
				
				<NavBar setSort={props.setSort} />
			</div>
		)
	}
}
