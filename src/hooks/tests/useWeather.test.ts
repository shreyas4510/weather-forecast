import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWeather } from '../useWeather';
import fetchWeatherData from '../../services/weatherApi';
import { createWrapper } from './test-utils';
import { toast } from 'react-toastify';

vi.mock('../../services/weatherApi');
vi.mock('react-toastify', () => ({
    toast: {
        error: vi.fn(),
    },
}));

describe('useWeather', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('does not fetch when params are null', () => {
        const { result } = renderHook(() => useWeather(null), {
            wrapper: createWrapper(),
        });

        expect(result.current.isLoading).toBe(false);
        expect(fetchWeatherData).not.toHaveBeenCalled();
    });

    it('fetches data successfully', async () => {
        const mockData = {
            current: { temperature: 25 },
        };

        (fetchWeatherData as any).mockResolvedValue(mockData);

        const { result } = renderHook(
            () =>
                useWeather({
                    lat: 10,
                    lon: 20,
                    date: '2024-01-01',
                }),
            { wrapper: createWrapper() }
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(mockData);
    });

    it('handles error correctly', async () => {
        (fetchWeatherData as any).mockRejectedValue(new Error('API Error'));

        const { result } = renderHook(
            () =>
                useWeather({
                    lat: 10,
                    lon: 20,
                    date: '2024-01-01',
                }),
            { wrapper: createWrapper() }
        );        
        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error?.message).toBe('API Error');
    });

    it('shows toast on error', async () => {
        (fetchWeatherData as any).mockRejectedValue(new Error('API Error'));

        const { result } = renderHook(
            () =>
                useWeather({
                    lat: 10,
                    lon: 20,
                    date: '2024-01-01',
                }),
            { wrapper: createWrapper() }
        );

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(toast.error).toHaveBeenCalledWith('API Error');
    });

    it('uses cache for same params', async () => {
        const mockData = { temp: 25 };
        (fetchWeatherData as any).mockResolvedValue(mockData);

        const wrapper = createWrapper();

        const { result, rerender } = renderHook(
            ({ params }) => useWeather(params),
            {
                wrapper,
                initialProps: {
                    params: { lat: 10, lon: 20, date: '2024-01-01' },
                },
            }
        );

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        rerender({
            params: { lat: 10, lon: 20, date: '2024-01-01' },
        });

        expect(fetchWeatherData).toHaveBeenCalledTimes(1);
    });
});
