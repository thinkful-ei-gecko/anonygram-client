import React from 'react';
import ReactDOM from 'react-dom';
import DisplayItem from './DisplayItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DisplayItem imageAddress={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc53S16cGD_TTr80tPoxgIv5lsF3t52XjOuHV4Rognqp5qBdtO8A&s'} upvotes='20' />, div);
  ReactDOM.unmountComponentAtNode(div);
});
