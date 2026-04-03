import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import WeatherChart from '../WeatherChart';

describe('WeatherChart', () => {
    it('renders without crashing', () => {
        const mockData = {
            time: ['2024-01-01T10:00'],
            temperature_2m: [25],
            precipitation: [2],
        };

        render(<WeatherChart hourlyData={mockData} theme={{}} />);
    });
});