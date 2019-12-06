import React, { useContext } from 'react';
import ImageContext from '../../contexts/ImageContext';
import './UserAlert.css';

export default function UserAlert() {

  const context = useContext(ImageContext);

  const { alert } = context;

  return (
    <>
    {alert && 
    <div className="notifications-container">
      <p className="message">{alert}</p>
      </div>}
    </>
  )
}
