import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });
import NotFoundPage from '../../components/pages/NotFound'

describe('<NotFoundPage />', () => {
    it('should render itself without crashing', () => {
        const { enzymeWrapper } = shallow(<NotFoundPage/>)
    }); 
})