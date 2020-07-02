module.exports = {
    stories: [
        /* PLOP_INJECT_STORY */
        '../src/**/*.stories.js',
        //'../src/**/index.js',
        '../src/**/k2-mui-core.stories',
        '../src/**/developer.stories',
        '../src/**/patricia-persona.stories',
        '../src/**/cathy-persona.stories',
        '../src/**/oscar-persona.stories'
    ],
    addons: ['@storybook/preset-create-react-app', '@storybook/addon-actions', '@storybook/addon-links']
};
