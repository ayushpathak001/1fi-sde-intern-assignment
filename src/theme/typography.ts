import { TextStyle } from 'react-native';

type TypeScale = Record<string, TextStyle>;

export const typography: TypeScale = {
  h1: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  h3: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodyBold: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  overline: {
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
};
