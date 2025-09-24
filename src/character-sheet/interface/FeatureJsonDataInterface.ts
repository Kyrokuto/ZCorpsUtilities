import {SkillJsonDataInterface} from './SkillJsonDataInterface'
import {DiceJsonDataInterface} from './DiceJsonDataInterface'

export interface FeatureJsonDataInterface {
    id: string
    name: string
    dice: DiceJsonDataInterface
    skills: SkillJsonDataInterface[]
}
