import React from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';

import './RefreshButton.css';

export default function RefreshButton (props) {
  const { handleGeolocation } = props;

  return (
    <button onClick={() => handleGeolocation()} className='RefreshButton resetStyles'>
      <RefreshIcon />
    </button>
  );
};