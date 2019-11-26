import React from 'react';
import ReactDOM from 'react-dom';
import DisplayFeed from './DisplayFeed';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DisplayFeed />, div);
  ReactDOM.unmountComponentAtNode(div);
});
