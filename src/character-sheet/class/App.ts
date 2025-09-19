import {Character} from "./Character";
import {AppModal} from "./AppModal";
import {AppToast} from "./AppToast";
import {GlobalVariables, GlobalVariablesObject} from "../config/GlobalVariables";
import {FrontBuilder} from "./FrontBuilder";
import {AppEvent} from "./AppEvent";
import {EventBuilder} from "./EventBuilder";
import {Feature} from "./Feature";
import {Skill} from "./Skill";
import {Dice} from "./Dice";

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
    }

    public buildRollDice(object: Feature | Skill): Dice {
        const dice = new Dice();
        if (object instanceof Feature) {
            this.buildRollDiceForFeature(object, dice);
            return dice;
        }
        if (!object.feature) {
            throw Error('Unable to build the dice for skill ' + object.name + ' because it has no features.');
        }
        this.buildRollDiceForFeature(object.feature, dice);
        this.buildRollDiceForSkill(object, dice);
        return dice;
    }

    private buildRollDiceForFeature(feature: Feature, currentDice: Dice): void {
        currentDice.numberOf = feature.dice.numberOf
        currentDice.bonus = feature.dice.bonus
    }

    private buildRollDiceForSkill(skill: Skill, currentDice: Dice): void {
        if (skill.dice.numberOf === 0 && skill.dice.bonus === 0) {
            currentDice.numberOf -= 1;
            return;
        }
        currentDice.numberOf += skill.dice.numberOf;
        currentDice.bonus += skill.dice.bonus;
    }
}