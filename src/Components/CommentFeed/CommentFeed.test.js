import React from 'react';
import ReactDOM from 'react-dom';
import CommentFeed from './CommentFeed';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommentFeed />, div);
  ReactDOM.unmountComponentAtNode(div);
});
