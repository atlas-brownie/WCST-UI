import React from 'react';
import { mount } from 'enzyme';
import { AppProviders } from 'app/setupTests';
import { CathyStartPage } from '../cathy-persona.stories';
import { OscarStartPage } from '../oscar-persona.stories';
import { PatriciaStartPage } from '../patricia-persona.stories';
import { Links } from '../developer.stories';
import * as k2MuiCore from '../k2-mui-core.stories';

describe('Storybook Stories', () => {
    it('renders Developer Stories without error', () => {
        mount(<Links />);
    });
    it('renders Cathy Start Page without error', () => {
        mount(<CathyStartPage />);
    });
    it('renders Oscar Start Page without error', () => {
        mount(<OscarStartPage />);
    });
    it('renders Patricia Start Page without error', () => {
        mount(<PatriciaStartPage />);
    });
    it('renders K2 MUI Core Components without error', () => {
        mount(
            <AppProviders>
                <k2MuiCore.RaisedButton />
                <k2MuiCore.FlatButton />
                {/* <k2MuiCore.TextField />
                    <k2MuiCore.TextFieldError /> */}
                <k2MuiCore.FileUpload />
                <k2MuiCore.Row />
            </AppProviders>
        );
    });
});
