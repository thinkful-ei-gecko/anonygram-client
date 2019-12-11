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
import "./Footer.css";



export default function Footer(props) {
  const context = useContext(UserContext);

	return (
		<footer className='Footer'>

			{props.view === "feed" ? (
				<Link to='/local-map' className='resetStyles'>
					<MapIcon />
				</Link>
			) : (
				<Link to='/' className='resetStyles'>
					<DynamicFeedIcon />
				</Link>
			)}
      |
      {
        TokenService.hasAuthToken() && (
          <div className="App__karma-total">
            <ThumbUp /> 
            {/* {context.user.karma_balance} */}
          </div>
        )
      }
      |
      <RefreshButton handleGeolocation={props.handleGeolocation}/>
      |
      <NavBar setSort={props.setSort} />
		</footer>
	);
}
