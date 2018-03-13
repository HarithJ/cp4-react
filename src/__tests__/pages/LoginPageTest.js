import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { LoginPage } from '../../components/pages/LoginPage';

describe('<LoginPage />', () => {
  const store = configureMockStore([thunk])({
    user: {}
  });

  const props = {
    login: jest.fn(),
    message: 'message',
    history: { push: jest.fn()},


  };
  it('should render itself without crashing', () => {
    const { enzymeWrapper } = shallow(<Provider store={store}><LoginPage {...props} /></Provider>).dive();
  });
});
