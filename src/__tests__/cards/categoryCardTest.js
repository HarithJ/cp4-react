import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import CategoryCard from '../../components/cards/categoryCard';

describe('<CategoryCard />', () => {
  const store = configureMockStore([thunk])({
    user: {
      'Access Token': '12345trewdfgw23456wedfvcdsq234543wddsqw345',
      email: 'sn@stuff.com'
    }
  });

  const props = {
    redirectRecipes: jest.fn(),
    category: {
      id: 1,
      'Recipe Category Name': 'Category one',
      'Recipe Category Detail': 'Category one',
      'Date Created': 'Category one',
      'Date Modified': 'Category one'
    }
  };
  it('should render itself without crashing', () => {
    mount(<Provider store={store}><CategoryCard {...props} /></Provider>);
  });
});
