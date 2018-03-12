import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import RecipeCard from '../../components/cards/recipeCard';

describe('<RecipeCard />', () => {
  const store = configureMockStore([thunk])({
    user: {
      'Access Token': '12345trewdfgw23456wedfvcdsq234543wddsqw345',
      email: 'sn@stuff.com'
    }
  });

  const props = {
    redirectRecipes: jest.fn(),
    categoryId: '1',
    recipeId:4,
    recipe: {
      id: 1,
      name: ' Recipe one',
      Recipe: 'Recipe one',
      'Date Created': 'Recipe one',
      'Date Modified': 'Recipe one'

    }
  };
  it('should render itself without crashing', () => {
    const { enzymeWrapper } = shallow(<Provider store={store}><RecipeCard {...props} /></Provider>).dive();
  });
});
