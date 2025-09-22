import {Feature} from './Feature'
import {defaultFeatures} from '../config/DefaultFeatures'
import {App} from './App'
import {Skill} from './Skill'
import {CharacterJsonDataInterface,} from '../interface/CharacterJsonDataInterface'

export class Character {
    private readonly _app: App

    public constructor(app: App) {
        this._name = null
        this._features = [...defaultFeatures]
        this._app = app
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
        if (data.name) {
            this.name = data.name
        }
    }
}