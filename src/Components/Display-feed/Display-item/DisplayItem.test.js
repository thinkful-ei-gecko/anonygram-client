import React from 'react';
import ReactDOM from 'react-dom';
import DisplayItem from './DisplayItem';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter} from "react-router-dom";

describe('DisplayItem component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><DisplayItem imageAddress={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc53S16cGD_TTr80tPoxgIv5lsF3t52XjOuHV4Rognqp5qBdtO8A&s'} upvotes='20' /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders elements by default', () => {
    const wrapper = shallow(<DisplayItem/>)
    expect(toJson(wrapper)).toMatchSnapshot();
  })
  it('renders elements given props', () => {
    const props = {
      imgAddress: 'https://lh3.googleusercontent.com/p/AF1QipMJcAXkTwnOj_TWYbMRwygy8ktducIF2kgOqSdW=s1600-w500',
      imgCaption: 'some image caption', 
      upvotes: 12, 
      id: 20, 
      incrementUpvotes: () => {} 
    }
    
    const wrapper = shallow(<DisplayItem { ...props }/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})