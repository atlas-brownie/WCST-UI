export class ModelBase {
    override(data: any) {
        if (data) {
            Object.keys(data).forEach((key) => {
                Object.defineProperty(this, key, {
                    value: data[key],
                    configurable: true,
                    enumerable: true,
                    writable: true
                });
            });
        }
    }

    removeUndefined() {
        for (let key in this) {
            if (this[key] === undefined) {
                delete this[key];
            }
        }
        return this;
    }

    get myType(): string {
        const comp: any = this.constructor;
        return comp.name;
    }

    get toJSON(): any {
        // Object.assign:  copy the values of all of the enumerable own properties from one or more source objects to a target object. Returns the target object.
        return Object.assign({}, this);
    }
}

export interface IHashAny {
    [key: string]: any;
}

export interface IHashStringNumber {
    readonly [key: string]: string | number;
}

export interface IHashString {
    readonly [key: string]: string;
}

export interface IHashNumber {
    readonly [key: string]: number;
}

export interface GenericResponse {
    readonly payload: any;
    readonly error: any;
}

// export class Topic<T> {}
// export class BroadcastTopic {
//     defaultTopic(): string {
//         const comp: any = this.constructor;
//         return comp.name;
//     }
// }
// export class BroadcastTopicServiceResult<T> extends BroadcastTopic implements IResult<T> {
//     error: any;
//     payload: Array<T>;
//     metadata?: any;
//     constructor(result: IResult<T>) {
//         super();
//         this.error = result.error;
//         this.payload = result.payload;
//         this.metadata = result.metadata;
//     }
// }
