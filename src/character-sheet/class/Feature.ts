import {Skill} from "./Skill";
import {Dice} from "./Dice";

export class Feature {
    private readonly _id: string;
    private readonly _dice: Dice;

    public constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._skills = [];
        this._dice = new Dice(1);
    }

    public get dice(): Dice {
        return this._dice;
    }

    public get id(): string {
        return this._id;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    private _skills: Skill[];

    public get skills(): Skill[] {
        return this._skills;
    }

    public set skills(value: Skill[]) {
        this._skills = [];
        value.forEach(skill => this.addSkill(skill));
    }

    public addSkill(skill: Skill): void {
        if (skill.feature === null || skill.feature.id != this.id) {
            skill.feature = this;
        }
        if (!this.hasSkill(skill)) {
            this.skills.push(skill);
        }
    }

    public removeSkill(skill: Skill): void {
        if (!this.hasSkill(skill)) {
            return;
        }
        skill.feature = null;
        this.skills.splice(this.skills.indexOf(skill), 1);
    }

    public hasSkill(skill: Skill): boolean {
        return this.skills.includes(skill);
    }

    public hasSkillById(skillId: string): boolean {
        return this.skills.some(skill => skill.id === skillId);
    }

    public findSkillById(skillId: string): Skill | null {
        if (!this.hasSkillById(skillId)) {
            return null;
        }
        const skill = this.skills.find(skill => {
            return skill.id === skillId
        })
        if (skill === undefined) {
            return null;
        }
        return skill;
    }

    public isLastSkill(skill: Skill): boolean {
        if (this.skills.length === 0) {
            throw new Error('Feature has no skills')
        }
        if (this.hasSkill(skill)) {
            throw new Error('The feature does not have the ' + skill.name + ' skill.')
        }
        return this.skills[this.skills.length - 1].id === skill.id
    }

    public isFirstSkill(skill: Skill): boolean {
        if (this.skills.length === 0) {
            throw new Error('Feature has no skills')
        }
        if (this.hasSkill(skill)) {
            throw new Error('The feature does not have the ' + skill.name + ' skill.')
        }
        return this.skills[0].id === skill.id
    }
}