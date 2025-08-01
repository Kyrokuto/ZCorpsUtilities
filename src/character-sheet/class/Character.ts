import {Feature} from "./Feature";
import {defaultFeatures} from "../config/DefaultFeatures";

export class Character {
    private readonly _features: Feature[];

    public constructor() {
        this._name = null;
        this._features = defaultFeatures;
    }

    private _name: string | null;

    public get name(): string | null {
        return this._name;
    }

    public set name(value: string | null) {
        this._name = value;
    }

    public get features(): Feature[] {
        return this._features;
    }
}