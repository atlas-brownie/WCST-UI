import { create } from '@storybook/theming/create';

export default create({
    base: 'light',

    colorPrimary: '#000000',
    colorSecondary: '#000000',

    // UI
    appBg: 'white',
    appContentBg: '#ffffff',
    appBorderColor: 'grey',
    appBorderRadius: 4,

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: 'black',
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: 'black',
    barSelectedColor: 'black',
    barBg: '#e9e9e9',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    brandTitle: 'Kube Kai'
});
