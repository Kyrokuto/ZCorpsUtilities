import {CharacterStatisticsJsonInterface} from "./CharacterStatisticsJsonInterface";
import {SubSkillJsonDataInterface} from "./SubSkillJsonDataInterface";

export interface SkillJsonDataInterface extends CharacterStatisticsJsonInterface {
    is_visible: boolean
    is_allow_sub_skill: boolean
    sub_skills: SubSkillJsonDataInterface[]
}