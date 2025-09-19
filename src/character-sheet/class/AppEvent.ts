import { App } from './App'
import { Collapse } from 'bootstrap'
import { Feature } from './Feature'
import { FrontFinder } from './FrontFinder'
import { Skill } from './Skill'
import { ToastType } from '../enum/ToastType'
import { GlobalVariables } from '../config/GlobalVariables'

export class AppEvent {
  private readonly _app: App

  constructor (app: App) {
    this._app = app
  }

  get app (): App {
    return this._app
  }

  public onRightClickFeatureCard (feature: Feature): void {
    try {
      const collapsible = new Collapse(FrontFinder.findFeatureCollapse(feature))
      collapsible.show()
    } catch (e) {
      this.app.toast.showError(e as Error)
    }
  }

  public onChangeInputDiceCode (object: Feature | Skill): void {
    try {
      object.dice.numberOf = parseInt(
        FrontFinder.findSkillOrFeatureDiceCodeInput(object).value)
    } catch (e) {
      this.app.toast.showError(e as Error)
    }
  }

  public onChangeInputCheckPlus (
    object: Feature | Skill, isOne: boolean = true): void {
    try {
      const currentInput = isOne ? FrontFinder.findSkillOrFeaturePlusOneInput(
          object) : FrontFinder.findSkillOrFeaturePlusTwoInput(object),
        linkedInput = isOne
          ? FrontFinder.findSkillOrFeaturePlusTwoInput(object)
          : FrontFinder.findSkillOrFeaturePlusOneInput(object)
      if (!currentInput.checked) {
        object.dice.bonus = 0
        return
      }
      object.dice.bonus = isOne ? 1 : 2
      if (!linkedInput.checked) {
        return
      }
      linkedInput.checked = false
    } catch (e) {
      this.app.toast.showError(e as Error)
    }
  }

  public onClickButtonRollDice (object: Feature | Skill): void {
    this.app.showModalRollDice(object)
  }

  public onClickButtonLoadData (): void {
    this.app.showModalLoadData()
  }

  public onClickButtonSaveData (): void {
    this.app.showModalSaveData()
  }

  public onClickButtonResetData (): void {
  }

  public onClickButtonFindSkillFeature (): void {

  }

  public onClickButtonCopyCharacterSheetData (): void {
    try {
      const elementData = FrontFinder.findCharacterDataInput(),
        elementName = FrontFinder.findCharacterNameInput()
      if (!elementName.value || !elementData.value) {
        if (!elementData.value) {
          elementData.classList.add('is-invalid')
        }
        if (!elementName.value) {
          elementName.classList.add('is-invalid')
        }
        this.app.toast.showMessageWhitType(
          'Please fill in all fields of the form', ToastType.warning)
        return
      }
      elementData.classList.remove('is-invalid')
      elementName.classList.remove('is-invalid')
      this.app.currentCharacter.name = elementName.value
      this.copyToClipboard(JSON.stringify(this.app.currentCharacter))
      this.app.modal.close()
    } catch (e) {
      this.app.toast.showError(e as Error)
    }
  }

  public copyToClipboard (text: string): void {
    navigator.clipboard.writeText(text.toString()).then(() => {
      this.app.toast.showMessageWhitType('Copy to clipboard')
    })
  }

  public updateCharacterName (): void {
    try {
      const element = FrontFinder.findCharacterSheetName()
      if (this.app.currentCharacter.name) {
        element.innerHTML = '<br/>' + this.app.currentCharacter.name
        document.title = this.app.currentCharacter.name
        element.classList.remove('d-none')
      } else {
        element.innerHTML = ''
        document.title = GlobalVariables.DEFAULT_DOCUMENT_TITLE
        element.classList.add('d-none')
      }
    } catch (e) {
      this.app.toast.showError(e as Error)
    }
  }
}