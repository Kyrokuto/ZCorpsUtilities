import { Skill } from './Skill'
import { Feature } from './Feature'

export class Utilities {
  public static isFeatureClass (object: unknown): boolean {
    if (!object) {
      return false
    }
    return object instanceof Feature
  }

  public static isSkillClass (object: unknown): boolean {
    if (!object) {
      return false
    }
    return object instanceof Skill
  }

  public static findFeatureWhitObject (object: Feature | Skill): Feature {
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
}