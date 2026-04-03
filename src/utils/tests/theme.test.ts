import { getTheme } from '../theme.utils';
import { describe, it, expect } from "vitest";

describe('getTheme', () => {
    it('returns night theme when isNight is true', () => {
        const theme = getTheme(0, true);
        expect(theme.accent).toBe('#818cf8');
        expect(theme.text).toBe('text-white');
    });

    it('returns cloudy theme by default', () => {
        const theme = getTheme(-1, false);
        expect(theme.accent).toBe('#0284c7');
        expect(theme.text).toBe('text-slate-900');
    });

    it('returns rain theme for rain codes', () => {
        const theme = getTheme(61, false);
        expect(theme.accent).toBe('#38bdf8');
        expect(theme.text).toBe('text-white');
    });

    it('returns storm theme for thunderstorm', () => {
        const theme = getTheme(96, false);
        expect(theme.accent).toBe('#eab308');
        expect(theme.text).toBe('text-yellow-500');
    });

    it('returns sunny theme for sunny codes', () => {
        const theme = getTheme(0, false);
        expect(theme.accent).toBe('#d97706');
        expect(theme.text).toBe('text-amber-950');
    });
});
