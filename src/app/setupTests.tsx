import React, { FunctionComponent, ReactElement } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'app/shared';
// CAUTION: loadConfiguration must be imported after store is imported because of createSlice
import { loadConfiguration } from 'app/app.service';
import { PageLayout } from 'app/elementals';

configure({ adapter: new Adapter() });

loadConfiguration();

export const AppProviders: FunctionComponent = ({ children }): ReactElement => {
    return (
        <Provider store={store}>
            <MemoryRouter>
                <PageLayout>{children}</PageLayout>
            </MemoryRouter>
        </Provider>
    );
};

export class MockFile {
    create(name = 'mock.txt', size = 1024, mimeType = 'plain/txt'): File {
        function range(count: number) {
            return 'a'.repeat(size);
        }

        const file = new File([range(size)], name, { type: mimeType });
        return file;
    }
}
