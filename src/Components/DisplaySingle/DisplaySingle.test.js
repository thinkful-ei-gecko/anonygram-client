import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DisplaySingle from './DisplaySingle';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('DisplaySingle component', () => {
  DisplaySingle.contextTypes = {
    images: PropTypes.array,
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DisplaySingle />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const props = {
    submissionId: 1,
  };
  const context = {
    images: [
      {
        create_timestamp: new Date('2019-12-10T00:40:55.725Z'),
        id: 1,
        image_url: 'https://via.placeholder.com/150',
        image_text: 'this is image text',
        karma_total: 3,
      },
    ],
    incrementUpvotes: () => {}
  };

  const state = {
    image: {
      create_timestamp: new Date('2019-12-10T00:40:55.725Z'),
      id: 1,
      image_url: 'https://via.placeholder.com/150',
      image_text: 'this is image text',
      karma_total: 3,
    },
    comments: [
      {
        comment_timestamp: new Date('2019-12-10T00:40:55.725Z'),
        user_id: '2d644486-26dc-4ad3-b460-3c6895aa260f',
        comment_id: '2d644486-26dc-4ad3-b460-3c6895aa260f',
        comment_text: 'some comment text',
      },
    ],
  };
  it('renders a submission given props and context', async () => {
    const wrapper = shallow(<DisplaySingle {...props} />, { context });
    wrapper.setState({
      loading: false,
      image: state.image,
      comments: state.comments,
    });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
