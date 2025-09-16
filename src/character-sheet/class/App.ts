import {Character} from "./Character";
import {AppModal} from "./AppModal";
import {AppToast} from "./AppToast";

export class App {
    private readonly _currentCharacter: Character;
    private readonly _modal: AppModal;
    private readonly _toast: AppToast;

    constructor() {
        this._currentCharacter = new Character();
        this._modal = new AppModal();
        this._toast = new AppToast();
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
}