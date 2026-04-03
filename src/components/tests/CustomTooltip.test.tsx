import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CustomTooltip from '../CustomTooltip';

describe('CustomTooltip', () => {
    it('renders tooltip when active', () => {
        render(
            <CustomTooltip
                active={true}
                payload={[
                    {
                        payload: { time: '10:00', temp: 25, rain: 2 },
                    },
                ]}
            />
        );

        expect(screen.getByText('10:00')).toBeInTheDocument();
        expect(screen.getByText('25°')).toBeInTheDocument();
    });

    it('returns null when inactive', () => {
        const { container } = render(
            <CustomTooltip active={false} payload={[]} />
        );

        expect(container).toBeEmptyDOMElement();
    });
});