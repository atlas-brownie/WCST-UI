import { ModelBase } from './model-base';

export * from './app-http.service';
export * from './model-base';
export * from './lov';
export * from './user';
export * from './store';
export * from './service-locator';
export * from './form-base';

export type Constructable<T> = new (...args: any) => T;
export type FuncAny = (...args: any) => any;
export type FuncT<T> = (arg: T) => any;
export type FormSubmitCallback<T extends ModelBase> = (arg1: T) => void;
export type K2TempAny = any;

export function hasKey<O>(obj: O, key: string | number | symbol): key is keyof O {
    return key in obj;
}
