import {Dice} from "./Dice";
import {Skill} from "./Skill";
import {CharacterStatistics} from "../interface/CharacterContentInterface";
import {Character} from "./Character";

export class SubSkill implements CharacterStatistics {
    private readonly _dice: Dice;

    constructor(id: string, name: string, skill: Skill | null) {
        this._id = id;
        this._name = name;
        if (!skill) {
            skill = new Skill('', '', null, true)
        }
        this._skill = skill;
        this._dice = new Dice(0, 0, this)
    }

    get currentCharacter(): Character {
        if (!this.skill.feature.character) {
            throw new Error('Unable to find the character from the "' + this.name + '" sub-skill.');
        }
        return this.skill.feature.character;
    }

    get dice(): Dice {
        return this._dice;
    }

    private _id: string;

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _skill: Skill;

    get skill(): Skill {
        return this._skill;
    }

    set skill(value: Skill) {
        this._skill = value;
    }
}