import React from 'react';
import './Modal.css'

export default function Modal(props) {
  const { img } = props;
  return (
    <div className="modal-window">
      <img className="modal-image" src={img} alt="anonygram" />
    </div>
  )
}