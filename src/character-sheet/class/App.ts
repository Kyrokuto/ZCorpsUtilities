import {Character} from "./Character";
import {AppModal} from "./AppModal";
import {AppToast} from "./AppToast";
import {GlobalVariables, GlobalVariablesObject} from "../config/GlobalVariables";
import {FrontBuilder} from "./FrontBuilder";
import {AppEvent} from "./AppEvent";
import {EventBuilder} from "./EventBuilder";
import {Feature} from "./Feature";
import {Skill} from "./Skill";
import {DiceRoller} from "./DiceRoller";

export class App {
    private readonly _currentCharacter: Character;
    private readonly _modal: AppModal;
    private readonly _toast: AppToast;
    private readonly _appConstante: GlobalVariablesObject;
    private readonly _event: AppEvent;

    constructor() {
        this._appConstante = GlobalVariables;
        this._toast = new AppToast(this);
        this._currentCharacter = new Character(this);
        this._modal = new AppModal(this);
        this._event = new AppEvent(this);
    }

    get currentCharacter(): Character {
        return this._currentCharacter;
    }

    get modal(): AppModal {
        return this._modal;
    }

    get toast(): AppToast {
        return this._toast;
    }

    get appConstante(): GlobalVariablesObject {
        return this._appConstante;
    }

    get event(): AppEvent {
        return this._event;
    }

    public static loadApp(): Promise<App> {
        return new Promise((resolve, reject) => {
            try {
                const app = new App();
                FrontBuilder.initCards(app.currentCharacter.features)
                resolve(app);
            } catch (e) {
                reject(e);
            }
        })
    }

    public addEvents(): void {
        const eventBuilder = new EventBuilder(this);
        eventBuilder.addEventsOnFeatures();
        eventBuilder.addEventsOnSkills();
        eventBuilder.addEventsOnButtons();
    }

    public showModalRollDice(object: Feature | Skill) {
        const diceRoller = new DiceRoller(object)
        this.modal.resetModal()
        this.modal.setModalTitle(diceRoller.getFullName())
        const pDice = document.createElement('p'),
            inputDiceHidden = document.createElement('input'),
            diceRoll = diceRoller.getDiceRollerCommand();
        pDice.innerText = diceRoll
        inputDiceHidden.value = diceRoll
        inputDiceHidden.classList.add('d-none')
        this.modal.appendChildToBody(pDice)
        this.modal.appendChildToBody(inputDiceHidden)
        this.modal.show()
        inputDiceHidden.select()
        this.copyToClipboard(diceRoll)
    }

    private copyToClipboard(text: string): void {
        navigator.clipboard.writeText(text.toString()).then(() => {
            this.toast.showMessageWhitType('Copy to clipboard')
        })
    }
}