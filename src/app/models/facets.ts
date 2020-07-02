import { ModelBase, LOV } from 'app/shared';

export class FacetsLOV extends ModelBase {
    mark_types: LOV;
    design_codes: LOV;
    color_space: LOV;
    colors: LOV;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }

    asSelectedArray() {
        const mark = this.mark_types.mapOverSelected((item) => {
            return `filters=mark_types:${item}`;
        });

        const design = this.design_codes.mapOverSelected((item) => {
            return `filters=design_codes:${item}`;
        });
        const space = this.color_space.mapOverSelected((item) => {
            return `filters=color_spaces:${item}`;
        });
        const color = this.colors.mapOverSelected((item) => {
            return `filters=colors:${item}`;
        });

        const list: any = [];
        list.push(...mark);
        list.push(...design);
        list.push(...space);
        list.push(...color);

        return list.join(`&`);
    }
}
