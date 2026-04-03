import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from '../StatCard';

describe('StatCard', () => {
    it('renders label and value', () => {
        render(
            <StatCard
                icon={<div>Icon</div>}
                label="Humidity"
                value="80%"
            />
        );

        expect(screen.getByText('Humidity')).toBeInTheDocument();
        expect(screen.getByText('80%')).toBeInTheDocument();
    });
});
