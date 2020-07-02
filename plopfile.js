module.exports = (plop) => {
    plop.setGenerator('story', {
        description: 'Create a story page for story book',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your story page?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/app/stories/{{pascalCase name}}.stories.tsx',
                templateFile: 'plop-templates/story/story.stories.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{pascalCase name}}Page.tsx',
                templateFile: 'plop-templates/story/storyPage.tsx.hbs'
            },
            {
                type: 'append',
                path: '.storybook/main.js',
                pattern: `/* PLOP_INJECT_STORY */`,
                //template: `\t\t'../src/app/\\\*\\\*/{{pascalCase name}}.stories',` // figure out how to escape the ** to make it work
                template: `\t\t'../src/app/stories/{{pascalCase name}}.stories',`
            }
        ]
    });

    plop.setGenerator('model', {
        description: 'Create a new model',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your model?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/app/models/{{dashCase name}}.ts',
                templateFile: 'plop-templates/model/model.ts.hbs'
            },
            {
                type: 'add',
                path: 'src/app/models/testing/{{dashCase name}}.spec.ts',
                templateFile: 'plop-templates/model/model.spec.ts.hbs'
            },
            {
                type: 'add',
                path: 'src/app/models/index.ts',
                templateFile: 'plop-templates/injectable-index.ts.hbs',
                skipIfExists: true
            },
            {
                type: 'append',
                path: 'src/app/models/index.ts',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `export * from './{{dashCase name}}';`
            }
        ]
    });

    plop.setGenerator('k2component', {
        description: 'Create a reusable k2-mui-core component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your K2 component?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/app/k2-mui-core/K2{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/k2component/k2.component.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/k2-mui-core/index.ts',
                templateFile: 'plop-templates/injectable-index.ts.hbs',
                skipIfExists: true
            },
            {
                type: 'append',
                path: 'src/app/k2-mui-core/index.ts',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `export * from './K2{{pascalCase name}}';`
            },
            {
                type: 'append',
                path: 'src/app/pages/components-page/components-page.render.tsx',
                pattern: `/* PLOP_INJECT_EXPORT2 */`,
                template: `    {{camelCase name}}: K2.K2{{pascalCase name}}Props;`
            },
            {
                type: 'append',
                path: 'src/app/pages/components-page/components-page.render.tsx',
                pattern: `{/* PLOP_INJECT_EXPORT */}`,
                template: `
                <K2.K2Row>
                    <h3>{{titleCase name}}:</h3>
                    <K2.K2{{pascalCase name}} { ...props.{{camelCase name}} }/>
                </K2.K2Row>
                <br />`
            },
            {
                type: 'append',
                path: 'src/app/pages/components-page/components-page.container.tsx',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `        {{camelCase name}}: { label: '{{titleCase name}}', required: false },`
            }
        ]
    });

    plop.setGenerator('component', {
        description: 'Create a reusable component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/{{dashCase name}}.container.tsx',
                templateFile: 'plop-templates/component/component.container.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/{{dashCase name}}.render.tsx',
                templateFile: 'plop-templates/component/component.render.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/testing/{{dashCase name}}.spec.tsx',
                templateFile: 'plop-templates/component/component.spec.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/{{dashCase name}}.scss',
                templateFile: 'plop-templates/component/component.scss.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/index.ts',
                templateFile: 'plop-templates/component/index.ts.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/index.ts',
                templateFile: 'plop-templates/injectable-index.ts.hbs',
                skipIfExists: true
            },
            {
                type: 'append',
                path: 'src/app/elementals/index.ts',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `export * from './{{dashCase name}}/{{dashCase name}}.container';`
            }
        ]
    });

    plop.setGenerator('formcomponent', {
        description: 'Create a reusable component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your form component name?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/{{dashCase name}}.container.tsx',
                templateFile: 'plop-templates/form-component/form-component.container.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/{{dashCase name}}.render.tsx',
                templateFile: 'plop-templates/form-component/form-component.render.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/testing/{{dashCase name}}.spec.tsx',
                templateFile: 'plop-templates/form-component/form-component.spec.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/{{dashCase name}}.scss',
                templateFile: 'plop-templates/form-component/form-component.scss.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/{{dashCase name}}/index.ts',
                templateFile: 'plop-templates/form-component/index.ts.hbs'
            },
            {
                type: 'add',
                path: 'src/app/elementals/index.ts',
                templateFile: 'plop-templates/injectable-index.ts.hbs',
                skipIfExists: true
            },
            {
                type: 'append',
                path: 'src/app/elementals/index.ts',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `export * from './{{dashCase name}}/{{dashCase name}}.container';`
            }
        ]
    });

    plop.setGenerator('gridpage', {
        description: 'Create a grid page',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your grid page?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/{{dashCase name}}-page.container.tsx',
                templateFile: 'plop-templates/grid-page/grid-page.container.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/{{dashCase name}}-page.render.tsx',
                templateFile: 'plop-templates/grid-page/grid-page.render.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/testing/{{dashCase name}}-page.spec.tsx',
                templateFile: 'plop-templates/grid-page/grid-page.spec.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/{{dashCase name}}-page.scss',
                templateFile: 'plop-templates/grid-page/grid-page.scss.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/index.ts',
                templateFile: 'plop-templates/grid-page/index.ts.hbs'
            },
            {
                type: 'add',
                path: 'src/app/models/{{dashCase name}}.ts',
                templateFile: 'plop-templates/grid-page/grid-page.model.ts.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/{{dashCase name}}.service.ts',
                templateFile: 'plop-templates/grid-page/grid-page.service.ts.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/index.ts',
                templateFile: 'plop-templates/injectable-index.ts.hbs',
                skipIfExists: true
            },
            {
                type: 'append',
                path: 'src/app/pages/index.ts',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `export * from './{{dashCase name}}-page';`
            },
            {
                type: 'add',
                path: 'src/app/models/index.ts',
                templateFile: 'plop-templates/injectable-index.ts.hbs',
                skipIfExists: true
            },
            {
                type: 'add',
                path: 'public/data/{{dashCase name}}.json',
                templateFile: 'plop-templates/grid-page/grid-page.json.hbs'
            },
            {
                type: 'append',
                path: 'src/app/shared/store.ts',
                pattern: `/* PLOP_INJECT_STORE_PATH */`,
                template: `import { {{camelCase name}}Slice } from 'app/pages/{{dashCase name}}-page/{{dashCase name}}.service';`
            },
            {
                type: 'append',
                path: 'src/app/shared/store.ts',
                pattern: `/* PLOP_INJECT_STORE_REDUCER */`,
                template: `\t\t{{camelCase name}}: {{camelCase name}}Slice.reducer,`
            },
            {
                type: 'append',
                path: 'src/app/models/index.ts',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `export * from './{{dashCase name}}';`
            },
            {
                type: 'append',
                path: 'src/app/app.render.tsx',
                pattern: `/* PLOP_INJECT_IMPORTED_ROUTE */`,
                template: `\t{{pascalCase name}}Page,`
            },
            {
                type: 'append',
                path: 'src/app/app.render.tsx',
                pattern: `/* PLOP_INJECT_ROUTE */`,
                template: `\t\t\t\t\t<Route path="/{{dashCase name}}-page" component={ {{pascalCase name}}Page } />`
            },
            {
                type: 'append',
                path: 'src/app/elementals/drawer/drawer.render.tsx',
                pattern: `/* PLOP_INJECT_DRAWER_LINK */`,
                template: `\t\t{ to: '{{dashCase name}}-page', primary: '{{titleCase name}} Page', isHidden: false },`
            }
        ]
    });

    plop.setGenerator('page', {
        description: 'Create a page',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your page?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/{{dashCase name}}-page.container.tsx',
                templateFile: 'plop-templates/page/page.container.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/{{dashCase name}}-page.render.tsx',
                templateFile: 'plop-templates/page/page.render.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/testing/{{dashCase name}}-page.spec.tsx',
                templateFile: 'plop-templates/page/page.spec.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/{{dashCase name}}-page.scss',
                templateFile: 'plop-templates/page/page.scss.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/{{dashCase name}}-page/index.ts',
                templateFile: 'plop-templates/page/index.ts.hbs'
            },
            {
                type: 'add',
                path: 'src/app/models/{{dashCase name}}.ts',
                templateFile: 'plop-templates/page/page.model.ts.hbs'
            },
            {
                type: 'add',
                path: 'src/app/pages/index.ts',
                templateFile: 'plop-templates/injectable-index.ts.hbs',
                skipIfExists: true
            },
            {
                type: 'append',
                path: 'src/app/pages/index.ts',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `export * from './{{dashCase name}}-page';`
            },
            {
                type: 'add',
                path: 'src/app/models/index.ts',
                templateFile: 'plop-templates/injectable-index.ts.hbs',
                skipIfExists: true
            },
            {
                type: 'append',
                path: 'src/app/models/index.ts',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `export * from './{{dashCase name}}';`
            },
            {
                type: 'append',
                path: 'src/app/app.render.tsx',
                pattern: `/* PLOP_INJECT_IMPORTED_ROUTE */`,
                template: `\t{{pascalCase name}}Page,`
            },
            {
                type: 'append',
                path: 'src/app/app.render.tsx',
                pattern: `/* PLOP_INJECT_ROUTE */`,
                template: `\t\t\t\t\t<Route path="/{{dashCase name}}-page" component={ {{pascalCase name}}Page } />`
            },
            {
                type: 'append',
                path: 'src/app/elementals/drawer/drawer.render.tsx',
                pattern: `/* PLOP_INJECT_DRAWER_LINK */`,
                template: `\t\t{ to: '{{dashCase name}}-page', primary: '{{pascalCase name}} Page', isHidden: false },`
            }
        ]
    });

    // plop.setGenerator('service', {
    //     description: 'Create service',
    //     prompts: [
    //         {
    //             type: 'input',
    //             name: 'name',
    //             message: 'What is your service name?'
    //         }
    //     ],
    //     actions: [
    //         {
    //             type: 'add',
    //             path: 'src/app/services/{{camelCase name}}.js',
    //             templateFile: 'plop-templates/service.js.hbs'
    //         },
    //         {
    //             type: 'add',
    //             path: 'src/app/services/index.js',
    //             templateFile: 'plop-templates/injectable-index.js.hbs',
    //             skipIfExists: true
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/app/services/index.js',
    //             pattern: `/* PLOP_INJECT_IMPORT */`,
    //             template: `import {{camelCase name}} from './{{camelCase name}}';`
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/app/services/index.js',
    //             pattern: `/* PLOP_INJECT_EXPORT */`,
    //             template: `\t{{camelCase name}},`
    //         }
    //     ]
    // });

    // plop.setGenerator('hook', {
    //     description: 'Create a custom react hook',
    //     prompts: [
    //         {
    //             type: 'input',
    //             name: 'name',
    //             message: 'What is your hook name?'
    //         }
    //     ],
    //     actions: [
    //         {
    //             type: 'add',
    //             path: 'src/app/hooks/{{camelCase name}}.js',
    //             templateFile: 'plop-templates/hook.js.hbs'
    //         },
    //         {
    //             type: 'add',
    //             path: 'src/app/hooks/index.js',
    //             templateFile: 'plop-templates/injectable-index.js.hbs',
    //             skipIfExists: true
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/app/hooks/index.js',
    //             pattern: `/* PLOP_INJECT_IMPORT */`,
    //             template: `import {{camelCase name}} from './{{camelCase name}}';`
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/app/hooks/index.js',
    //             pattern: `/* PLOP_INJECT_EXPORT */`,
    //             template: `\t{{camelCase name}},`
    //         }
    //     ]
    // });
};
