const tintColorLight = '#2F50C1';
const tintColorDark = '#4563c7';

export const NAV_THEME = {
  light: {
    border: 'hsl(241 6% 90%)',
    card: 'hsl(241 61% 100%)',
    notification: 'hsl(0 84.2% 60.2%)',
    primary: 'hsl(241 93% 51%)',
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#A7A3B3',
    tabIconDefault: '#A7A3B3',
    tabIconSelected: tintColorLight,
  },
  dark: {
    border: 'hsl(241 6% 10%)',
    card: 'hsl(241 51% 1%)',
    notification: 'hsl(0 72% 51%)',
    primary: 'hsl(241 93% 51%)',
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#A7A3B3',
    tabIconDefault: '#A7A3B3',
    tabIconSelected: tintColorDark,
  },
};
