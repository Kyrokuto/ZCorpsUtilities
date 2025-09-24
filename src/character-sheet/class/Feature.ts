import {Skill} from './Skill'
import {Dice} from './Dice'
import {FeatureJsonDataInterface} from '../interface/FeatureJsonDataInterface'
import {Character} from "./Character";
import {CharacterStatistics} from "../interface/CharacterContentInterface";

export class Feature implements CharacterStatistics {
    private readonly _id: string
    private readonly _dice: Dice

    public constructor(id: string, name: string) {
        this._id = id
        this._name = name
        this._skills = []
        this._dice = new Dice(1, 0, this)
    }

    get currentCharacter(): Character | never {
        if (!this.character) {
            throw new Error('Unable to find the character from the "' + this.name + '" feature.');
        }
        return this.character;
    }

    private _character: Character | null = null;

    get character(): Character | null {
        return this._character;
    }

    set character(value: Character | null) {
        this._character = value;
    }

    public get dice(): Dice {
        return this._dice
    }

    public get id(): string {
        return this._id
    }

    private _name: string

    public get name(): string {
        return this._name
    }

    public set name(value: string) {
        if (this._name !== value) {
            this._name = value
            this.character?.app.event.updateFeatureName(this);
        }
    }

    private _skills: Skill[]

    public get skills(): Skill[] {
        return this._skills
    }

    public set skills(value: Skill[]) {
        this._skills = []
        value.forEach(skill => this.addSkill(skill))
    }

    public addSkill(skill: Skill): void {
        if (skill.feature.id != this.id) {
            skill.feature = this
        }
        if (!this.hasSkill(skill)) {
            this.skills.push(skill)
        }
    }

    public removeSkill(skill: Skill): void {
        if (!this.hasSkill(skill)) {
            return
        }
        skill.feature = new Feature('', '')
        this.skills.splice(this.skills.indexOf(skill), 1)
    }

    public hasSkill(skill: Skill): boolean {
        return this.hasSkillById(skill.id)
    }

    public hasSkillById(skillId: string): boolean {
        return this.skills.some(skill => skill.id === skillId)
    }

    public findSkillById(skillId: string): Skill | null {
        if (!this.hasSkillById(skillId)) {
            return null
        }
        const skill = this.skills.find(skill => {
            return skill.id === skillId
        })
        if (skill === undefined) {
            return null
        }
        return skill
    }

    public isLastSkill(skill: Skill): boolean | never {
        this.checkSkillOrFail(skill)
        return this.skills[this.skills.length - 1].id === skill.id
    }

    public isFirstSkill(skill: Skill): boolean | never {
        this.checkSkillOrFail(skill)
        return this.skills[0].id === skill.id
    }

    public toJSON(): FeatureJsonDataInterface {
        const jsonObject: FeatureJsonDataInterface = {
            id: this._id,
            name: this.name,
            dice: this.dice.toJSON(),
            skills: [],
        }
        this.skills.forEach(skill => {
            jsonObject.skills.push(skill.toJSON())
        })
        return jsonObject
    }

    private checkSkillOrFail(skill: Skill): void | never {
        if (this.skills.length === 0) {
            throw new Error('Feature "' + this.name + '" has no skills')
        }
        if (!this.hasSkill(skill)) {
            throw new Error(
                'The feature "' + this.name + '" does not have the "' + skill.name +
                '" skill.')
        }
    }
}