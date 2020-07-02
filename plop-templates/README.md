# Plop Template Instructions and Existing Templates

Plop documentation: https://plopjs.com/documentation/

Plop is a templating npm node module that helps generate reusable templates, fast. Our current plop templates exist in the following directory (`project/plop-templates`). Please look at our existing templates listed below and how to quickly generate them. The following are:

1. k2components (`/src/app/k2components`)
   <br />
   run `npm run generate k2component`
2. models (`/src/app/models`)
   <br />
   run `npm run generate model`
3. grid-page (`/src/app/pages`)
   <br />
   `npm run generate gridpage`
4. pages (`/src/app/pages`)
   <br />
   `npm run generate page`
5. elemental components (`/src/app/elementals`)
   <br />
   run `npm run generate component`
6. form-components (`/src/app/elementals`)
   <br />
   run `npm run generate formcomponent`
7. stories (`/src/app/stories`)
   <br />
   run `npm run generate story`

Please run the npm command from the root of the project that holds the plopfile.js.

It'll prompt you for the name of your k2component, model, grid-page, page, elemental component or story, once you enter that, then the rest is history.

## Generating K2 Components

run `npm run generate k2component`

Will create the following files:

1. `src/app/k2-mui-core/K2(name of your k2component in pascal case).tsx`

Will append the following to file (`src/app/models/index.ts`):

1. `export * from './K2{{pascalCase name}}';`

## Generating Models

run `npm run generate model`

Will create the following files:

1. `src/app/models/(name of your model in dash case).ts`

Will append the following to file (`src/app/models/index.ts`):

1. `export * from './{{dashCase name}}';`

## Generating Grid Pages

run `npm run generate gridpage`

Will create the following files:

1. `src/app/pages/(your grid-page name in dash case)/(your grid-page name in dash case)-page.container.tsx`
2. `src/app/pages/(your grid-page name in dash case)-page/(your grid-page name in dash case)-page.render.tsx`
3. `src/app/pages/(your grid-page name in dash case)-page/testing/(your grid-page name in dash case)-page.spec.tsx`
4. `src/app/pages/(your grid-page name in dash case)-page/(your grid-page name in dash case).service.ts`
5. `src/app/pages/(your grid-page name in dash case)-page/(your grid-page name in dash case)-page.scss`
6. `src/app/pages/(your grid-page name in dash case)-page/index.ts`
7. `src/app/models/(your grid-page name in dash case).ts`
8. `public/(your grid-page name in dash case).json`

Will append the following to file (`src/app/pages/index.ts`):

1. `export * from './{{dashCase name}}-page';`

Will append the following to file (`src/app/models/index.ts`):

1. `export * from './{{dashCase name}}';`

Will append the following to file (`src/app/app.render.tsx`):

1. `\t{{pascalCase name}}Page,`
2. `\t\t\t\t\t<Route path="/{{dashCase name}}-page" component={ {{pascalCase name}}Page } />`

Will append the following to file (`src/app/elementals/drawer/drawer.render.tsx`):

1. `\t\t{ to: '{{dashCase name}}-page', primary: '{{pascalCase name}} Page' },`

Will append the following to file (`src/app/shared/store.ts`):

1. `import { {{dashCase name}}Slice } from 'app/pages/{{dashCase name}}-page/{{dashCase name}}.service';`
2. `\t\t{{dashCase name}}: {{dashCase name}}Slice.reducer,`

## Generating Pages

run `npm run generate page`

Will create the following files:

1. `src/app/pages/(your page name in dash case)/(your page name in dash case)-page.container.tsx`
2. `src/app/pages/(your page name in dash case)-page/(your page name in dash case)-page.render.tsx`
3. `src/app/pages/(your page name in dash case)-page/testing/(your page name in dash case)-page.spec.tsx`
4. `src/app/pages/(your page name in dash case)-page/(your page name in dash case)-page.scss`
5. `src/app/pages/(your page name in dash case)-page/index.ts`
6. `src/app/models/(your page name in dash case).ts`

Will append the following to file (`src/app/pages/index.ts`):

1. `export * from './{{dashCase name}}-page';`

Will append the following to file (`src/app/models/index.ts`):

1. `export * from './{{dashCase name}}';`

Will append the following to file (`src/app/app.render.tsx`):

1. `\t{{pascalCase name}}Page,`
2. `\t\t\t\t\t<Route path="/{{dashCase name}}-page" component={ {{pascalCase name}}Page } />`

Will append the following to file (`src/app/elementals/drawer/drawer.render.tsx`):

1. `\t\t{ to: '{{dashCase name}}-page', primary: '{{pascalCase name}} Page' },`

## Generating Elemental Components

run `npm run generate component`

Will create the following files:

1. `src/app/elementals/(your component name in dash case)/(your component name in dash case).container.tsx`
2. `src/app/elementals/(your component name in dash case)/(your component name in dash case).render.tsx`
3. `src/app/elementals/(your component name in dash case)/testing/(your component name in dash case).spec.tsx`
4. `src/app/elementals/(your component name in dash case)/(your component name in dash case).scss`
5. `src/app/elementals/(your component name in dash case)/index.ts`

Will append the following to file (`src/app/elementals/index.ts`):

1. `export * from './K2{{pascalCase name}}';`

## Generating Form Components

run `npm run generate formcomponent`

Will create the following files (same as Elemental Components):

1. `src/app/elementals/(your component name in dash case)/(your component name in dash case).container.tsx`
2. `src/app/elementals/(your component name in dash case)/(your component name in dash case).render.tsx`
3. `src/app/elementals/(your component name in dash case)/testing/(your component name in dash case).spec.tsx`
4. `src/app/elementals/(your component name in dash case)/(your component name in dash case).scss`
5. `src/app/elementals/(your component name in dash case)/index.ts`

Will append the following to file (`src/app/elementals/index.ts`):

1. `export * from './K2{{pascalCase name}}';`

## Generating Stories

run `npm run generate story`

Will create the following files:

1. `src/app/stories/(name of your story in pascal case).stories.tsx`
2. `src/app/pages/(name of your story in pascal case)Page.tsx`

Will append the following to file (`storybook/main.js`):

1. `\t\t'../src/app/stories/{{pascalCase name}}.stories',`

Please look at the plopfile.js and let @Brad Kahl know if you have any questions. Also, please add any new templates you can think of or want to add and update this document.
