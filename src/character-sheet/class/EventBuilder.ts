import { App } from './App'
import { Feature } from './Feature'
import { FrontFinder } from './FrontFinder'
import { Skill } from './Skill'

export class EventBuilder {
  private readonly _app: App

  constructor (app: App) {
    this._app = app
  }

  private get app (): App {
    return this._app
  }

  addEventsOnFeatures (): void {
    this.app.currentCharacter.features.forEach((feature: Feature) => {
      this.addContextMenuOnFeature(feature)
      this.addChangeInputDiceCode(feature)
      this.addChangeInputCheckPlus(feature)
      this.addClickButtonRollDice(feature)
    })
  }

  addEventsOnSkills (): void {
    this.app.currentCharacter.getAllSkills().forEach((skill: Skill) => {
      this.addChangeInputDiceCode(skill)
      this.addChangeInputCheckPlus(skill)
      this.addClickButtonRollDice(skill)
    })
  }

  addEventsOnButtons (): void {
    this.addClickButtonLoadData()
    this.addClickButtonSaveData()
    this.addClickButtonResetData()
    this.addClickButtonFindSkillFeature()
  }

  private addContextMenuOnFeature (feature: Feature): void {
    FrontFinder.findFeatureCard(feature).
      addEventListener('contextmenu', (event: MouseEvent) => {
        event.preventDefault()
        this.app.event.onRightClickFeatureCard(feature)
      })
  }

  private addChangeInputDiceCode (object: Feature | Skill): void {
    FrontFinder.findSkillOrFeatureDiceCodeInput(object).
      addEventListener('change', () => {
        this.app.event.onChangeInputDiceCode(object)
      })
  }

  private addChangeInputCheckPlus (object: Feature | Skill): void {
    FrontFinder.findSkillOrFeaturePlusOneInput(object).
      addEventListener('change', () => {
        this.app.event.onChangeInputCheckPlus(object)
      })
    FrontFinder.findSkillOrFeaturePlusTwoInput(object).
      addEventListener('change', () => {
        this.app.event.onChangeInputCheckPlus(object, false)
      })
  }

  private addClickButtonRollDice (object: Feature | Skill): void {
    FrontFinder.findSkillOrFeatureRollDiceButton(object).
      addEventListener('click', () => {
        this.app.event.onClickButtonRollDice(object)
      })
  }

  private addClickButtonLoadData (): void {
    FrontFinder.findLoadDataButton().addEventListener('click', () => {
      this.app.event.onClickButtonLoadData()
    })
  }

  private addClickButtonSaveData (): void {
    FrontFinder.findSaveDataButton().addEventListener('click', () => {
      this.app.event.onClickButtonSaveData()
    })
  }

  private addClickButtonResetData (): void {
    FrontFinder.findResetDataButton().addEventListener('click', () => {
      this.app.event.onClickButtonResetData()
    })
  }

  private addClickButtonFindSkillFeature (): void {
    FrontFinder.findFindSkillFeatureButton().addEventListener('click', () => {
      this.app.event.onClickButtonFindSkillFeature()
    })
  }
}