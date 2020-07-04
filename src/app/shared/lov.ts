import { ModelBase, IHashString, FuncAny } from '.';

export interface IListOfValueItem {
    code: string | undefined;
    description: string;
    other?: any;
}

export interface IHashListOfValueItems {
    [key: string]: Array<IListOfValueItem>;
}

export interface IHashListOfValues {
    [key: string]: LOV;
}

export class LOV extends ModelBase {
    options: Array<IListOfValueItem> = [];
    // LOV components have the option of popuating selectedValues, selectedOptions, or both!
    // Selected Options may come in handy for displaying user messages based upon an LOV item selected.
    selectedValues?: Array<any> = [];
    selectedOptions?: Array<IListOfValueItem> = [];

    constructor(properties?: any) {
        super();
        this.override(properties);
    }

    static mapHash(values: IHashString): Array<IListOfValueItem> {
        const lovItems = Object.keys(values).map((key) => {
            return { code: key, description: values[key] };
        });
        return lovItems;
    }

    static mapList(values: Array<any>): Array<IListOfValueItem> {
        const lovItems = values.map((value) => {
            return { code: value, description: value };
        });
        return lovItems;
    }

    static delegateMapper(facet: any): Array<IListOfValueItem> {
        if (Array.isArray(facet)) {
            return LOV.mapList(facet);
        } else {
            return LOV.mapHash(facet);
        }
    }

    static mapFacetToLovModel(facetItem: any): IHashListOfValues {
        const mappedItem = Object.keys(facetItem).reduce((previousItem: any, key: string) => {
            previousItem[key] = new LOV();
            previousItem[key].options = LOV.delegateMapper(facetItem[key]);
            return previousItem;
        }, {});
        return mappedItem;
    }

    public mapOverSelected(func: FuncAny): [] {
        if (!this.selectedValues) {
            return [];
        }

        const result = this.selectedValues.map((item) => {
            return func(item);
        }) as [];

        return result;
    }

    toString(): string {
        return JSON.stringify(this.options);
    }

    toStringSelectedValues(): string {
        return JSON.stringify(this.selectedValues);
    }

    toStringSelectedOptions(): string {
        return JSON.stringify(this.selectedOptions);
    }
}
