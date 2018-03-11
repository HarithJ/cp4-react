import Enzyme, {render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

Enzyme.configure({ adapter: new Adapter() });

import React from 'react'
import { DashboardPage } from '../../components/pages/DashboardPage'


describe('<DashboardPage />', () => {
    const store = configureMockStore([thunk])({
        user: {
          email: "sn@stuff.com"
        }
      })
    
    const getUserCategories = () => { return {category_one:'one'}};
    const props = {
        getCategories: jest.fn(),
        getUserCategories: getUserCategories,
  
      }
    it('should render itself without crashing', () => {
        const { enzymeWrapper } = render(<Provider store={store}><DashboardPage  {...props}/></Provider>)
        


    });
})