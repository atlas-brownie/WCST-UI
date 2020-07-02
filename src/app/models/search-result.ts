import { ModelBase, IHashNumber } from 'app/shared';

export class Color extends ModelBase {
    colors: string;
    rgb: Array<number>;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

export enum Status {
    Init,
    To_Do,
    In_Progress,
    Done
}

export class SearchResult extends ModelBase {
    colors: Array<Color>;
    color: Array<string>;

    metadata: any;
    trademark: Array<string>;
    highlights: any;
    score: number = 0;
    image_file: string;
    total_results: number;
    design_type_code: any;
    design_type_text: any;
    pinId?: number;
    pinPersona: string;
    pinContext: string;
    isPinned?: boolean;
    text_score: number;
    image_score: number;

    status: Status = Status.Init;

    private apiCall = '/getImage?imagePath=';

    constructor(properties?: any) {
        super();
        this.override(properties);
    }

    public setStatus(status: Status) {
        this.status = status;
    }

    get scoreAsPercentage() {
        return Math.round(this.score * 10000) / 100;
    }

    get serialNumber() {
        return this.metadata['serial-number'];
    }

    get formatedScoreAsPercentage() {
        return `${this.scoreAsPercentage} %`;
    }

    static getNewPinContext() {
        const d = new Date();

        const month = `00${d.getMonth() + 1}`.slice(-2);
        const date = `00${d.getDate()}`.slice(-2);
        const hours = `00${d.getHours()}`.slice(-2);
        const minutes = `00${d.getMinutes()}`.slice(-2);
        const seconds = `00${d.getSeconds()}`.slice(-2);

        return `${month}-${date}-${d.getFullYear()}-${hours}-${minutes}-${seconds}`;
    }

    static applyPinProperties(pinPersona: string, pinContext: string, item: SearchResult) {
        item.pinPersona = pinPersona;
        item.pinContext = pinContext;
        item.isPinned = false;
        return item;
    }

    get similarityAverage() {
        const result = (this.text_score * 100 + this.image_score * 100) / 2;
        return Math.round(result * 100) / 100;
    }
}

export class PinnedSearchResult extends ModelBase {
    id: number;
    item: string;

    constructor({ id, context, user, item, serialNumber }: any) {
        super();
        this.override({ id, context, user, item, serialNumber });
    }
}

export class SearchResultLOVMetadata extends ModelBase {
    mark_types: IHashNumber;
    design_codes: IHashNumber;
    color_space: IHashNumber;
    colors: IHashNumber;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}

export class SearchFormValues extends ModelBase {
    searchText: string;

    constructor(properties?: any) {
        super();
        this.override(properties);
    }
}
