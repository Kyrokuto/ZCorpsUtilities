import {Character} from "./Character";
import {AppModal} from "./AppModal";
import {AppToast} from "./AppToast";
import {GlobalVariables, GlobalVariablesObject} from "../config/GlobalVariables";

export class App {
    private readonly _currentCharacter: Character;
    private readonly _modal: AppModal;
    private readonly _toast: AppToast;
    private readonly _appConstante: GlobalVariablesObject;

    constructor() {
        this._appConstante = GlobalVariables;
        this._toast = new AppToast();
        this._currentCharacter = new Character();
        this._modal = new AppModal();
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

    public static loadApp(): Promise<App> {
        return new Promise((resolve, reject) => {
            try {
                resolve(new App());
            } catch (e) {
                reject(e);
            }
        })
    }
}