import { DiceJsonDataInterface } from './DiceJsonDataInterface'

export interface SkillJsonDataInterface {
  id: string
  name: string
  is_visible: boolean
  dice: DiceJsonDataInterface
}