import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

Enzyme.configure({ adapter: new Adapter() });

import React from 'react'
import { RecipesPage } from '../../components/pages/RecipesPage'


describe('<RecipesPage />', () => {
    const store = configureMockStore([thunk])({
        user: {
          email: "sn@stuff.com"
        },
        categories: { category_one: 'one'},
        recipes: { recipes_one: 'one'},
      })
    
    const getUserCategories = () => { return {category_one:'one'}};
    const props = {
        getUserRecipes: jest.fn(),
        match: {
            params:{ 'category_id': '1'}
        }
  
      }
    it('should render itself without crashing', () => {
        const { enzymeWrapper } = render(<Provider store={store}><RecipesPage  {...props}/></Provider>)
    });
})