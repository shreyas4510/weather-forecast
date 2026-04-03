import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherApp from '../WeatherApp';
import { createWrapper } from '../../hooks/tests/test-utils';

describe('WeatherApp', () => {
    it('renders form inputs', () => {
        render(<WeatherApp />, {
            wrapper: createWrapper(),
        });

        expect(screen.getByPlaceholderText('18.52')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('73.85')).toBeInTheDocument();
    });

    it('submits form', () => {
        render(<WeatherApp />, {
            wrapper: createWrapper(),
        });

        fireEvent.change(screen.getByPlaceholderText('18.52'), {
            target: { value: '10' },
        });

        fireEvent.change(screen.getByPlaceholderText('73.85'), {
            target: { value: '20' },
        });

        fireEvent.click(screen.getByText('Get Forecast'));
    });
});