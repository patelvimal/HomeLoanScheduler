import React from 'react';
import InputSliderExtended from '../InputSliderExtended';
import RupeeIcon from '../RupeeIcon';
import { render, screen } from '@testing-library/react-native';
let mockMarkers = [
    { value: 1, label: '10k' }
];
let mockOnChange = jest.fn();

describe('Input Slider component', () => {
    it('should render without issues', () => {
        const component = render(<InputSliderExtended
            label="Amount"
            min={10}
            max={100}
            step={10}
            value={50}
            onChange={mockOnChange}
            name="loanAmount"
            removeValidation={true}
            markers={mockMarkers}
            icon={<RupeeIcon />}
        />);
        expect(component).toMatchSnapshot();
    });

});