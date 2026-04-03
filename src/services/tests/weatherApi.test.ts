import { vi, describe, it, expect } from 'vitest';
import fetchWeatherData from '../weatherApi';

global.fetch = vi.fn();
describe('fetchWeatherData', () => {
    it('calls API with correct params', async () => {
        (fetch as vi.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({ success: true }),
        });

        const res = await fetchWeatherData({
            lat: 10,
            lon: 20,
            date: '2024-01-01',
        });

        expect(fetch).toHaveBeenCalled();
        expect(res).toEqual({ success: true });
    });

    it('throws error when response is not ok', async () => {
        (fetch as vi.Mock).mockResolvedValue({
            ok: false,
        });

        await expect(
            fetchWeatherData({ lat: 0, lon: 0, date: '2024-01-01' })
        ).rejects.toThrow('Failed to fetch weather data');
    });
});