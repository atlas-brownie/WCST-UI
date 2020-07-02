import { FunctionComponent, ReactElement, useState } from 'react';
import { ComponentsPageRender } from './components-page.render';
import { ComponentsFormDefinitions } from 'app/models';
import { FormikControls } from 'app/shared';
import { useFormik } from 'formik';

export const ComponentsPage: FunctionComponent = (props): ReactElement => {
    function handleSubmit(values: ComponentsFormDefinitions) {
        console.log('ComponentsPage handleSubmit values=', values);
    }

    const Controls = useState(new FormikControls<ComponentsFormDefinitions>(ComponentsFormDefinitions))[0];
    const Render = useState(new ComponentsPageRender())[0];

    Render.props = {
        formControls: useFormik(Controls.buildFormControls(handleSubmit)),
        formDefinitions: Controls.formDefinitions
    };

    return Render.display();
};
