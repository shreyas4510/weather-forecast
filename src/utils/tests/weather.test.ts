import { getWeatherIcon, getWeatherMessage } from '../weather.utils';
import { describe, it, expect } from "vitest";

describe('getWeatherMessage', () => {

    describe('clear sky (code 0)', () => {
        it('returns scorching for temp > 35', () => {
            expect(getWeatherMessage(36, 0)).toBe("🔥 Scorching Sun");
        });

        it('returns warm for temp > 25', () => {
            expect(getWeatherMessage(30, 0)).toBe("☀️ Warm & Sunny");
        });

        it('returns pleasant for lower temps', () => {
            expect(getWeatherMessage(20, 0)).toBe("🌤 Pleasant Clear Skies");
        });
    });

    it('returns partly cloudy for code 1', () => {
        expect(getWeatherMessage(25, 1)).toBe("🌤 Partly Cloudy");
    });

    it('returns overcast for code 2 and 3', () => {
        expect(getWeatherMessage(25, 2)).toBe("☁️ Overcast Skies");
        expect(getWeatherMessage(25, 3)).toBe("☁️ Overcast Skies");
    });

    it('returns fog for 45 and 48', () => {
        expect(getWeatherMessage(20, 45)).toBe("🌫 Foggy Conditions");
        expect(getWeatherMessage(20, 48)).toBe("🌫 Foggy Conditions");
    });

    it('returns drizzle for 51–57', () => {
        expect(getWeatherMessage(20, 51)).toBe("🌦 Light Drizzle");
        expect(getWeatherMessage(20, 57)).toBe("🌦 Light Drizzle");
    });

    describe('rain (61–67)', () => {
        it('returns cold rain when temp < 10', () => {
            expect(getWeatherMessage(5, 61)).toBe("🥶 Cold Rain");
        });

        it('returns rainy day when temp >= 10', () => {
            expect(getWeatherMessage(15, 61)).toBe("🌧 Rainy Day");
        });
    });

    describe('snow (71–77)', () => {
        it('returns freezing snow when temp < 0', () => {
            expect(getWeatherMessage(-5, 71)).toBe("❄️ Freezing Snow");
        });

        it('returns snowfall otherwise', () => {
            expect(getWeatherMessage(2, 71)).toBe("🌨 Snowfall");
        });
    });

    it('returns passing showers for 80–82', () => {
        expect(getWeatherMessage(20, 80)).toBe("🌦 Passing Showers");
        expect(getWeatherMessage(20, 82)).toBe("🌦 Passing Showers");
    });

    it('returns thunderstorm for >= 95', () => {
        expect(getWeatherMessage(20, 95)).toBe("⛈ Thunderstorm Alert");
    });

    it('returns default for unknown code', () => {
        expect(getWeatherMessage(20, -1)).toBe("🌍 Variable Conditions");
    });
});

describe('getWeatherIcon', () => {

    it('returns sun for code 0', () => {
        expect(getWeatherIcon(0)).toBe('sun');
    });

    it('returns cloud for codes 1–3', () => {
        expect(getWeatherIcon(1)).toBe('cloud');
        expect(getWeatherIcon(3)).toBe('cloud');
    });

    it('returns fog for 45 and 48', () => {
        expect(getWeatherIcon(45)).toBe('fog');
        expect(getWeatherIcon(48)).toBe('fog');
    });

    it('returns drizzle for 51–57', () => {
        expect(getWeatherIcon(51)).toBe('drizzle');
        expect(getWeatherIcon(57)).toBe('drizzle');
    });

    it('returns rain for 61–67', () => {
        expect(getWeatherIcon(61)).toBe('rain');
        expect(getWeatherIcon(67)).toBe('rain');
    });

    it('returns snow for 71–77', () => {
        expect(getWeatherIcon(71)).toBe('snow');
        expect(getWeatherIcon(77)).toBe('snow');
    });

    it('returns rain for 80–82', () => {
        expect(getWeatherIcon(80)).toBe('rain');
    });

    it('returns storm for >= 95', () => {
        expect(getWeatherIcon(95)).toBe('storm');
    });

    it('returns default for unknown code', () => {
        expect(getWeatherIcon(-1)).toBe('default');
    });
});
