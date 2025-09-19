import { Feature } from './Feature'
import { FrontBuilder } from './FrontBuilder'
import { Skill } from './Skill'
import { Utilities } from './Utilities'
import { GlobalVariables } from '../config/GlobalVariables'

export class FrontFinder {
  /**
   * @throw Error
   * @param feature
   */
  public static findFeatureCard (feature: Feature): HTMLElement | never {
    const element = document.querySelector(
      '#' + FrontBuilder.buildCardFeatureId(feature))
    if (!element) {
      throw new Error(
        'Unable to find the "card" element for feature ' + feature.name + '.')
    }
    return element as HTMLElement
  }

  public static findFeatureCollapse (feature: Feature): HTMLElement | never {
    const card = FrontFinder.findFeatureCard(feature),
      element = card.querySelector('.collapse')
    if (!element) {
      throw new Error(
        'Unable to find the "collapse" element for feature ' + feature.name +
        '.')
    }
    return element as HTMLElement
  }

  public static findSkillOrFeatureDiceCodeInput (object: Feature | Skill): HTMLInputElement | never {
    const element = document.querySelector(
      '#' + FrontBuilder.buildInputDiceCodeId(object))
    if (!element) {
      let errorMessage = 'Unable to find input dice code element for '
      if (Utilities.isFeatureClass(object)) {
        errorMessage += 'feature'
      } else {
        errorMessage += 'skill'
      }
      throw new Error(errorMessage + ' ' + object.name + '.')
    }
    return element as HTMLInputElement
  }

  public static findSkillOrFeaturePlusOneInput (object: Feature | Skill): HTMLInputElement | never {
    const element = document.querySelector(
      '#' + FrontBuilder.buildInputPlusOneId(object))
    if (!element) {
      let errorMessage = 'Unable to find input element "+1" for '
      if (Utilities.isFeatureClass(object)) {
        errorMessage += 'feature'
      } else {
        errorMessage += 'skill'
      }
      throw new Error(errorMessage + ' ' + object.name + '.')
    }
    return element as HTMLInputElement
  }

  public static findSkillOrFeaturePlusTwoInput (object: Feature | Skill): HTMLInputElement | never {
    const element = document.querySelector(
      '#' + FrontBuilder.buildInputPlusTwoId(object))
    if (!element) {
      let errorMessage = 'Unable to find input element "+2" for '
      if (Utilities.isFeatureClass(object)) {
        errorMessage += 'feature'
      } else {
        errorMessage += 'skill'
      }
      throw new Error(errorMessage + ' ' + object.name + '.')
    }
    return element as HTMLInputElement
  }

  public static findSkillOrFeatureRollDiceButton (object: Feature | Skill): HTMLButtonElement | never {
    const element = document.querySelector(
      '#' + FrontBuilder.buildIdButtonRollDice(object))
    if (!element) {
      let errorMessage = 'Unable to find button to roll dice for '
      if (Utilities.isFeatureClass(object)) {
        errorMessage += 'feature'
      } else {
        errorMessage += 'skill'
      }
      throw new Error(errorMessage + ' ' + object.name + '.')
    }
    return element as HTMLButtonElement
  }

  public static findLoadDataButton (): HTMLButtonElement | never {
    return FrontFinder.findButtonWhitId(
      GlobalVariables.ELEMENT_ID_BUTTON_LOAD_DATA)
  }

  public static findSaveDataButton (): HTMLButtonElement | never {
    return FrontFinder.findButtonWhitId(
      GlobalVariables.ELEMENT_ID_BUTTON_SAVE_DATA)
  }

  public static findResetDataButton (): HTMLButtonElement | never {
    return FrontFinder.findButtonWhitId(
      GlobalVariables.ELEMENT_ID_BUTTON_RESET_DATA)
  }

  public static findFindSkillFeatureButton (): HTMLButtonElement | never {
    return FrontFinder.findButtonWhitId(
      GlobalVariables.ELEMENT_ID_BUTTON_FIND_SKILL_FEATURE)
  }

  public static findButtonWhitId (id: string): HTMLButtonElement | never {
    const element = document.querySelector('#' + id)
    if (!element) {
      throw new Error('Unable to find the button with ID ' + id + '.')
    }
    return element as HTMLButtonElement
  }

  public static findCharacterDataInput (): HTMLInputElement | never {
    const element = document.querySelector(
      '#' + GlobalVariables.INPUT_ID_CHARACTER_DATA)
    if (!element) {
      throw new Error('Unable to find the character data input field')
    }
    return element as HTMLInputElement
  }

  public static findCharacterNameInput (): HTMLInputElement | never {
    const element = document.querySelector(
      '#' + GlobalVariables.INPUT_ID_CHARACTER_NAME)
    if (!element) {
      throw new Error('Unable to find the character name input field')
    }
    return element as HTMLInputElement
  }
}