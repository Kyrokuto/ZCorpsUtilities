import {Feature} from './Feature'
import {App} from './App'
import {Skill} from './Skill'
import {CharacterJsonDataInterface,} from '../interface/CharacterJsonDataInterface'
import {Utilities} from "./Utilities";
import {CharacterStatistics} from "../interface/CharacterContentInterface";

export class Character {
    private readonly _app: App

    public constructor(app: App) {
        this._name = null
        this._features = Utilities.getDefaultFeatures()
        this._app = app
        this.addCharacterOnFeature();
    }

    private _features: Feature[]

    public get features(): Feature[] {
        return this._features
    }

    private _name: string | null

    public get name(): string | null {
        return this._name
    }

    public set name(value: string | null) {
        if (this._name !== value) {
            this._name = value
            this.app.event.updateCharacterName()
        }
    }

    get app(): App {
        return this._app
    }

    public getAllSkills(): Skill[] {
        let skills: Skill[] = []
        this.features.forEach((feature: Feature) => {
            skills = skills.concat(feature.skills)
        })
        return skills
    }

    public findFeatureById(featureId: string): Feature | null {
        if (!this.hasFeatureById(featureId)) {
            return null
        }
        const feature = this.features.find(feature => {
            return feature.id === featureId
        })
        if (feature === undefined) {
            return null
        }
        return feature
    }

    public hasFeatureById(featureId: string): boolean {
        return this.features.some(feature => feature.id === featureId);
    }

    public toJSON(): CharacterJsonDataInterface {
        const jsonObject: CharacterJsonDataInterface = {
            name: this.name ?? '',
            features: [],
        }
        this.features.forEach((feature: Feature) => {
            jsonObject.features.push(feature.toJSON())
        })
        return jsonObject
    }

    public loadFromJson(data: CharacterJsonDataInterface): void | never {
        Utilities.isValidCharacterJSON(data);
        if (data.name) {
            this.name = data.name
        }
        data.features.forEach(jsonFeature => {
            const feature = this.findFeatureById(jsonFeature.id);
            if (!feature) {
                throw new Error('Could not find feature with id "' + jsonFeature.id + '".')
            }
            feature.name = jsonFeature.name
            feature.dice.numberOf = jsonFeature.dice.numberOf
            feature.dice.bonus = jsonFeature.dice.bonus
            jsonFeature.skills.forEach(jsonSkill => {
                const skill = feature.findSkillById(jsonSkill.id);
                if (!skill) {
                    throw new Error('Could not find skill with id "' + jsonSkill.id + '" in feature "' + feature.name + '".')
                }
                skill.name = jsonSkill.name
                skill.dice.numberOf = jsonSkill.dice.numberOf
                skill.dice.bonus = jsonSkill.dice.bonus
                skill.isVisible = jsonSkill.is_visible
            });
        })
    }

    public reset(): void | never {
        this.name = null
        Utilities.getDefaultFeatures().forEach(defaultFeature => {
            const feature = this.findFeatureById(defaultFeature.id);
            if (!feature) {
                throw new Error('Could not find feature with id "' + defaultFeature.id + '".')
            }
            feature.name = defaultFeature.name
            feature.dice.numberOf = defaultFeature.dice.numberOf
            feature.dice.bonus = defaultFeature.dice.bonus
            defaultFeature.skills.forEach(defaultSkill => {
                const skill = feature.findSkillById(defaultSkill.id);
                if (!skill) {
                    throw new Error('Could not find skill with id "' + defaultSkill.id + '" in feature "' + feature.name + '".')
                }
                skill.name = defaultSkill.name
                skill.dice.numberOf = defaultSkill.dice.numberOf
                skill.dice.bonus = defaultSkill.dice.bonus
                skill.isVisible = defaultSkill.isVisible
            });
        })
    }

    public getAllFeaturesAndSkills(): Array<CharacterStatistics> {
        let myArray = this.features;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        myArray = myArray.concat(this.getAllSkills());
        return myArray
    }

    public hasFeatureOrSkillId(id: string): boolean {
        return this.getAllFeaturesAndSkills().some(object => object.id === id)
    }

    public findFeatureOrSkillById(id: string): CharacterStatistics | null {
        if (!this.hasFeatureOrSkillId(id)) {
            return null;
        }
        const object = this.getAllFeaturesAndSkills().find(object => {
            return object.id === id
        })
        if (!object) {
            return null
        }
        return object
    }

    private addCharacterOnFeature(): void {
        this.features.map((feature: Feature) => {
            feature.character = this
        });
    }
}