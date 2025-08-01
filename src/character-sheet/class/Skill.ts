import {Feature} from "./Feature";
import {Dice} from "./Dice";

export class Skill {
    private readonly _id: string;
    private readonly _dice: Dice;

    public constructor(id: string, name: string, feature: Feature | null = null) {
        this._id = id;
        this._name = name;
        if (feature !== null) {
            this._feature = feature;
        }
        this._dice = new Dice();
    }

    public get dice(): Dice {
        return this._dice;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    private _feature: Feature | null = null;

    public get feature(): Feature | null {
        return this._feature;
    }

    public set feature(value: Feature | null) {
        this._feature = value;
        if (this.feature !== null && !this.feature.hasSkill(this)) {
            this.feature.addSkill(this);
        }
    }

    private _isVisible: boolean = true;

    public get isVisible(): boolean {
        return this._isVisible;
    }

    public set isVisible(value: boolean) {
        this._isVisible = value;
    }

    public get id(): string {
        return this._id;
    }
}