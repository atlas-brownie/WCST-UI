import React, { FunctionComponent, ReactElement, createContext } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { K2BaseProps } from './K2';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

interface K2FormProps<T> extends K2BaseProps, FormikProps<T> {}

export const FormContext = createContext({});

// Keep an eye on @date-io/date-fns - it is finicky but necessary for @material-ui/pickers to function
export const K2Form: FunctionComponent<K2FormProps<FormikValues>> = ({ children, className, ...props }): ReactElement => {
    const FormProvider = FormContext.Provider;
    return (
        <FormProvider value={props}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form onSubmit={props.handleSubmit} className={className}>
                    {children}
                </form>
            </MuiPickersUtilsProvider>
        </FormProvider>
    );
};
