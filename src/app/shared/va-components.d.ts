import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import { FuncAny } from '.';

export interface VAFieldProp {
    value: string;
    dirty: boolean;
}

interface ErrorableTextInputProps {
    /**
     * display error message for input that indicates a validation error
     */
    errorMessage: string;
    /**
     * label for input field
     */
    label: any;
    /**
     * text displayed when input has no user provided value
     */
    placeholder: string;
    /**
     * input name attribute
     */
    name: string;
    /**
     * input autocomplete attribute
     */
    autocomplete: string;
    /**
     * render marker indicating field is required
     */
    required: boolean;
    /**
     * value of the input field and if its dirty status
     */
    field: VAFieldProp;
    /**
     * extra attribute for use by CSS selector, specifically by tests
     */
    additionalClass: string;
    /**
     * maximum permitted input length
     */
    charMax: number;
    /**
     * called when input value is changed
     */
    onValueChange: FuncAny;
    /**
     * type attribute for input field
     */
    type: string;
}

export const VAErrorableTextInput: React.ClassComponent<ErrorableTextInputProps> = ErrorableTextInput;
