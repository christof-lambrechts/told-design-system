import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/tokens/colors.css';
import '../src/tokens/foundations.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ['Introduction', 'Fondations', ['Couleurs', 'Typographie', 'Espacements et rayons', 'Ombres'], 'Composants', 'Catalogue Figma', ['Atomes', 'Molécules', 'Organismes', 'Assets']],
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { Clair: 'light', Sombre: 'dark' },
      defaultTheme: 'Clair',
      attributeName: 'data-theme',
    }),
  ],
  tags: ['autodocs'],
};
export default preview;
