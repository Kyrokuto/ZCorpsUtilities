import {Feature} from './Feature'
import {Dice} from './Dice'
import {SkillJsonDataInterface} from '../interface/SkillJsonDataInterface'
import {SubSkill} from "./SubSkill";
import {CharacterStatisticsInterface} from "../interface/CharacterStatisticsInterface";
import {Character} from "./Character";

export class Skill implements CharacterStatisticsInterface {
    private readonly _id: string
    private readonly _dice: Dice;
    private readonly _isAllowSubSkill: boolean = false;

    public constructor(id: string, name: string, feature: Feature | null = null, isAllowSubSkill: boolean = false) {
        this._id = id
        this._name = name
        if (!feature) {
            feature = new Feature('', '')
        }
        this._feature = feature
        this._dice = new Dice(0, 0, this)
        this._isAllowSubSkill = isAllowSubSkill
    }

    get currentCharacter(): Character {
        if (!this.feature.character) {
            throw new Error('Unable to find the character from the "' + this.name + '" skill.');
        }
        return this.feature.character;
    }

    private _subSkills: SubSkill[] = [];

    get subSkills(): SubSkill[] {
        return this._subSkills;
    }

    set subSkills(value: SubSkill[]) {
        this._subSkills = []
        value.forEach(subSkill => this.addSubSkill(subSkill))
    }

    public get dice(): Dice {
        return this._dice
    }

    private _name: string

    public get name(): string {
        return this._name
    }

    public set name(value: string) {
        this._name = value
    }

    private _feature: Feature;

    public get feature(): Feature {
        return this._feature
    }

    public set feature(value: Feature) {
        this._feature = value
        if (!this.feature.hasSkill(this)) {
            this.feature.addSkill(this)
        }
    }

    private _isVisible: boolean = true

    public get isVisible(): boolean {
        return this._isVisible
    }

    public set isVisible(value: boolean) {
        this._isVisible = value
    }

    public get id(): string {
        return this._id
    }

    get isAllowSubSkill(): boolean {
        return this._isAllowSubSkill;
    }

    addSubSkill(subSkill: SubSkill) {
        this._subSkills.push(subSkill)
    }

    public toJSON(): SkillJsonDataInterface {
        const jsonObject: SkillJsonDataInterface = {
            id: this._id,
            name: this.name,
            dice: this.dice.toJSON(),
            is_visible: this.isVisible,
            is_allow_sub_skill: this.isAllowSubSkill,
            sub_skills: [],
        }
        if (this.hasSubSkills()) {
            this.subSkills.forEach((subSkill: SubSkill) => {
                jsonObject.sub_skills.push(subSkill.toJSON())
            })
        }
        return jsonObject
    }

    public hasSubSkills(): boolean {
        if (!this.isAllowSubSkill) {
            return false;
        }
        return this.subSkills.length > 0;
    }
}