import {SkillJsonDataInterface} from './SkillJsonDataInterface'
import {CharacterStatisticsJsonInterface} from "./CharacterStatisticsJsonInterface";

export interface FeatureJsonDataInterface extends CharacterStatisticsJsonInterface {
    skills: SkillJsonDataInterface[]
}
