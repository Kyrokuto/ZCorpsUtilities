import {Skill} from './Skill'
import {Feature} from './Feature'
import {CharacterJsonDataInterface} from "../interface/CharacterJsonDataInterface";

export class Utilities {
    public static isFeatureClass(object: unknown): boolean {
        if (!object) {
            return false
        }
        return object instanceof Feature
    }

    public static isSkillClass(object: unknown): boolean {
        if (!object) {
            return false
        }
        return object instanceof Skill
    }

    public static findFeatureWhitObject(object: Feature | Skill): Feature | never {
        if (Utilities.isFeatureClass(object)) {
            return object as Feature
        }
        if (Utilities.isSkillClass(object)) {
            object = object as Skill
            if (object.feature) {
                return object.feature
            }
        }
        throw new Error(
            'The feature could not be found to construct the input field ID for the number of dice for the skill or feature ' +
            object.name + '.')
    }

    public static isValidCharacterJSON(data: CharacterJsonDataInterface): void | never {
        if (!data) {
            throw new Error('Invalid character json.');
        }
        if (!data.name) {
            throw new Error('Invalid character json (name).');
        }
        if (!data.features) {
            throw new Error('Invalid character json (features).');
        }
        if (!Array.isArray(data.features)) {
            throw new Error('Invalid character json (features).');
        }
        if (data.features.length === 0) {
            throw new Error('Invalid character json (features).');
        }
        data.features.forEach(feature => {
            if (!feature.id) {
                throw new Error('Invalid character json (feature id).');
            }
            if (!feature.name) {
                throw new Error('Invalid character json (feature name).');
            }
            if (!feature.dice) {
                throw new Error('Invalid character json (feature dice).');
            }
            if (isNaN(feature.dice.bonus)) {
                throw new Error('Invalid character json (feature dice).');
            }
            if (isNaN(feature.dice.numberOf)) {
                throw new Error('Invalid character json (feature dice).');
            }
            if (!feature.skills) {
                throw new Error('Invalid character json (skills).');
            }
            if (!Array.isArray(feature.skills)) {
                throw new Error('Invalid character json (skills).');
            }
            if (feature.skills.length === 0) {
                throw new Error('Invalid character json (skills).');
            }
            feature.skills.forEach(skill => {
                if (!skill.id) {
                    throw new Error('Invalid character json (skill id).');
                }
                if (!skill.name) {
                    throw new Error('Invalid character json (skill name).');
                }
                if (!skill.dice) {
                    throw new Error('Invalid character json (skill dice).');
                }
                if (isNaN(skill.dice.bonus)) {
                    throw new Error('Invalid character json (skill dice).');
                }
                if (isNaN(skill.dice.numberOf)) {
                    throw new Error('Invalid character json (skill dice).');
                }
            })
        })
    }
}