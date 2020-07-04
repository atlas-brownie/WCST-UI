import { IHashAny, ModelBase } from './model-base';
import { hasKey, Constructable, FuncT } from '.';
import * as Yup from 'yup';

class FormFieldBase extends ModelBase {
    name: string;
    value: any;
    validationSchema?: any;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

function getFormControls<T>(type: Constructable<T>, formFields: T, onSubmit: FuncT<T>) {
    const data = new type();
    const validationSchema: IHashAny = {};

    Object.keys(formFields).forEach((key: string) => {
        // Trickery to "fool" typescript into allowing us to iterate class keys
        if (hasKey<T>(formFields, key)) {
            const formField = new FormFieldBase(formFields[key]);
            data[key] = formField.value;
            if (formField.validationSchema) {
                validationSchema[formField.name] = formField.validationSchema;
            }
        }
    });

    return {
        initialValues: data,
        validationSchema: Yup.object(validationSchema),
        onSubmit
    };
}

export class FormikControls<T> {
    formDefinitions: T;
    type: Constructable<T>;

    buildFormControls = (onSubmit: FuncT<T>) => {
        return getFormControls<T>(this.type, this.formDefinitions, onSubmit);
    };

    constructor(type: Constructable<T>) {
        this.formDefinitions = new type();
        this.type = type;
    }
}
