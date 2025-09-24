import {App} from './App'
import {Collapse} from 'bootstrap'
import {Feature} from './Feature'
import {FrontFinder} from './FrontFinder'
import {Skill} from './Skill'
import {ToastType} from '../enum/ToastType'
import {GlobalVariables} from '../config/GlobalVariables'
import {Utilities} from "./Utilities";

export class AppEvent {
    private readonly _app: App

    constructor(app: App) {
        this._app = app
    }

    get app(): App {
        return this._app
    }

    public onRightClickFeatureCard(feature: Feature): void {
        try {
            const collapsible = new Collapse(FrontFinder.findFeatureCollapse(feature))
            collapsible.show()
        } catch (e) {
            this.app.toast.showError(e as Error)
        }
    }

    public onChangeInputDiceCode(object: Feature | Skill): void {
        try {
            object.dice.numberOf = parseInt(
                FrontFinder.findSkillOrFeatureDiceCodeInput(object).value)
        } catch (e) {
            this.app.toast.showError(e as Error)
        }
    }

    public onChangeInputCheckPlus(
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

    public onClickButtonRollDice(object: Feature | Skill): void {
        this.app.showModalRollDice(object)
    }

    public onClickButtonLoadData(): void {
        this.app.showModalLoadData()
    }

    public onClickButtonSaveData(): void {
        this.app.showModalSaveData()
    }

    public onClickButtonResetData(): void {
        try {
            this.app.currentCharacter.reset()
        } catch (e) {
            this.app.toast.showError(e as Error)
        }
    }

    public onClickButtonFindSkillFeature(): void {
        this.app.showModalFindSkillFeature()
    }

    public onClickButtonCopyCharacterSheetData(): void {
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

    public onClickButtonLoadCharacterSheetData(): void {
        try {
            const elementData = FrontFinder.findCharacterDataInput()
            if (!elementData.value) {
                elementData.classList.add('is-invalid')
                this.app.toast.showMessageWhitType(
                    'Please fill in all fields of the form', ToastType.warning)
                return
            }
            elementData.classList.remove('is-invalid')
            if (!JSON.parse(elementData.value)) {
                return
            }
            this.app.currentCharacter.loadFromJson(JSON.parse(elementData.value))
            this.app.modal.close()
        } catch (e) {
            this.app.toast.showError(e as Error)
        }
    }

    public copyToClipboard(text: string): void {
        navigator.clipboard.writeText(text.toString()).then(() => {
            this.app.toast.showMessageWhitType('Copy to clipboard')
        })
    }

    public updateCharacterName(): void | never {
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

    public updateFeatureName(feature: Feature): void | never {
        try {
            const element = FrontFinder.findFeatureCardTitle(feature);
            element.innerText = feature.name
        } catch (e) {
            this.app.toast.showError(e as Error)
        }
    }

    public updateDiceBonusElement(object: Feature | Skill): void | never {
        try {
            const elementOne = FrontFinder.findSkillOrFeaturePlusOneInput(object),
                elementTwo = FrontFinder.findSkillOrFeaturePlusTwoInput(object);
            if (object.dice.bonus === 0) {
                elementOne.checked = false
                elementTwo.checked = false
                return;
            }
            if (object.dice.bonus === 1) {
                elementOne.checked = true
                elementTwo.checked = false
                return;
            }
            elementOne.checked = false
            elementTwo.checked = true
        } catch (e) {
            this.app.toast.showError(e as Error)
        }
    }

    public updateDiceCodeElement(object: Feature | Skill): void | never {
        try {
            const element = FrontFinder.findSkillOrFeatureDiceCodeInput(object)
            element.value = object.dice.numberOf.toString();
        } catch (e) {
            this.app.toast.showError(e as Error)
        }
    }

    public onChangeSelectFindSkillFeature(): void {
        try {
            const element = FrontFinder.findSkillOrFeatureFindSelectInput(),
                object = this.app.currentCharacter.findFeatureOrSkillById(element.value);
            if (!object) {
                this.app.toast.showError(new Error('Unable to find the feature or skill with ID "' + element.value + '".'));
                return;
            }
            const elementObject = FrontFinder.findSkillOrFeatureDiceCodeInput(object)
            let timeout = 100
            if (!elementObject.checkVisibility()) {
                this.onRightClickFeatureCard(Utilities.findFeatureWhitObject(object))
                timeout = 250;
            }
            this.app.modal.close()
            setTimeout(() => {
                elementObject.focus()
                elementObject.scrollIntoView({behavior: 'smooth'})
            }, timeout)
        } catch (e) {
            this.app.toast.showError(e as Error)
        }
    }

    public onKeyDownDocument(event: KeyboardEvent): void {
        if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            event.preventDefault()
            this.app.showModalFindSkillFeature()
        }
    }
}