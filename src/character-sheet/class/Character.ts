import {Feature} from './Feature'
import {defaultFeatures} from '../config/DefaultFeatures'
import {App} from './App'
import {Skill} from './Skill'
import {CharacterJsonDataInterface,} from '../interface/CharacterJsonDataInterface'
import {Utilities} from "./Utilities";

export class Character {
    private readonly _app: App

    public constructor(app: App) {
        this._name = null
        this._features = [...defaultFeatures]
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

    public reset(): void {
        this._features = [...defaultFeatures]
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

    public loadFromJson(data: CharacterJsonDataInterface) {
        Utilities.isValidCharacterJSON(data);
        if (data.name) {
            this.name = data.name
        }
        data.features.forEach(jsonFeature => {
            const feature = this.findFeatureById(jsonFeature.id);
            if (!feature) {
                throw new Error('Could not find feature with id ' + jsonFeature.id + '.')
            }
            feature.name = jsonFeature.name
            feature.dice.bonus = jsonFeature.dice.bonus
            feature.dice.numberOf = jsonFeature.dice.numberOf
            jsonFeature.skills.forEach(jsonSkill => {
                const skill = feature.findSkillById(jsonSkill.id);
                if (!skill) {
                    throw new Error('Could not find skill with id ' + jsonSkill.id + ' in feature ' + feature.name + '.')
                }
                skill.name = jsonSkill.name
                skill.dice.bonus = jsonSkill.dice.bonus
                skill.dice.numberOf = jsonSkill.dice.numberOf
                skill.isVisible = jsonSkill.is_visible
            });
        })
    }

    private addCharacterOnFeature(): void {
        this.features.map((feature: Feature) => {
            feature.character = this
        });
    }
}