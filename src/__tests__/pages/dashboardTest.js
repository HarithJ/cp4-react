import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { DashboardPage } from '../../components/pages/DashboardPage';


describe('<DashboardPage />', () => {
  const store = configureMockStore([thunk])({
    user: {
      email: 'sn@stuff.com'
    }
  });

  const props = {
    getUserCategories: jest.fn(() => Promise.resolve("stuff")),
    history: { push: jest.fn()},
    match: {
      param: {
        categoryId: 1,
      }
    }

  };
  it('should render itself without crashing', () => {
    const { enzymeWrapper } = mount(<Provider store={store}><DashboardPage {...props} /></Provider>);
  });
});
