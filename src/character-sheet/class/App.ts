import {Character} from './Character'
import {AppModal} from './AppModal'
import {AppToast} from './AppToast'
import {FrontBuilder} from './FrontBuilder'
import {AppEvent} from './AppEvent'
import {EventBuilder} from './EventBuilder'
import {DiceRoller} from './DiceRoller'
import {CharacterStatistics} from "../interface/CharacterContentInterface";

export class App {
    private readonly _currentCharacter: Character
    private readonly _modal: AppModal
    private readonly _toast: AppToast
    private readonly _event: AppEvent

    constructor() {
        this._toast = new AppToast(this)
        this._currentCharacter = new Character(this)
        this._modal = new AppModal(this)
        this._event = new AppEvent(this)
    }

    get currentCharacter(): Character {
        return this._currentCharacter
    }

    get modal(): AppModal {
        return this._modal
    }

    get toast(): AppToast {
        return this._toast
    }

    get event(): AppEvent {
        return this._event
    }

    public static loadApp(): Promise<App> {
        return new Promise((resolve, reject) => {
            try {
                const app = new App()
                FrontBuilder.initCards(app.currentCharacter.features)
                resolve(app)
            } catch (e) {
                reject(e)
            }
        })
    }

    public addEvents(): void {
        try {
            const eventBuilder = new EventBuilder(this)
            eventBuilder.addEventsOnFeatures()
            eventBuilder.addEventsOnSkills()
            eventBuilder.addEventsOnButtons()
            eventBuilder.addOtherEvents()
        } catch (e) {
            this.toast.showError(e as Error)
        }
    }

    public showModalRollDice(object: CharacterStatistics): void {
        try {
            const diceRoller = new DiceRoller(object)
            this.modal.resetModal()
            this.modal.setModalTitle(diceRoller.getFullName())
            const pDice = document.createElement('p'),
                inputDiceHidden = document.createElement('input'),
                diceRoll = diceRoller.getDiceRollerCommand()
            pDice.innerText = diceRoll
            inputDiceHidden.value = diceRoll
            inputDiceHidden.classList.add('d-none')
            this.modal.appendChildToBody(pDice)
            this.modal.appendChildToBody(inputDiceHidden)
            this.modal.show()
            inputDiceHidden.select()
            this.event.copyToClipboard(diceRoll)
        } catch (e) {
            this.toast.showError(e as Error)
        }
    }

    public showModalSaveData(): void {
        try {
            this.modal.resetModal()
            FrontBuilder.createFormSaveInModalBody(this)
            this.modal.setModalTitle('Save character sheet')
            const button = document.createElement('button')
            button.classList.add('btn', 'btn-success')
            button.innerText = 'Save data'
            EventBuilder.addClickButtonCopyCharacterSheetData(button, this)
            this.modal.addButtonFooter(button)
            this.modal.show()
        } catch (e) {
            this.toast.showError(e as Error)
        }
    }

    public showModalLoadData(): void {
        try {
            this.modal.resetModal()
            FrontBuilder.createFormLoadInModalBody(this)
            this.modal.setModalTitle('Load character sheet')
            const button = document.createElement('button')
            button.classList.add('btn', 'btn-primary')
            button.innerText = 'Load data'
            EventBuilder.addClickButtonLoadCharacterSheetData(button, this)
            this.modal.addButtonFooter(button)
            this.modal.show()
        } catch (e) {
            this.toast.showError(e as Error)
        }
    }


    public showModalFindSkillFeature() {
        try {
            this.modal.resetModal()
            this.modal.setModalTitle('Find skill/feature')
            FrontBuilder.createFormFindSkillFeature(this)
            this.modal.show()
        } catch (e) {
            this.toast.showError(e as Error)
        }
    }
}