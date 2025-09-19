import {App} from "./App";
import {Collapse} from "bootstrap";
import {Feature} from "./Feature";
import {FrontFinder} from "./FrontFinder";
import {Skill} from "./Skill";

export class AppEvent {
    private readonly _app: App;

    constructor(app: App) {
        this._app = app;
    }

    get app(): App {
        return this._app;
    }

    public onRightClickFeatureCard(feature: Feature): void {
        const collapsible = new Collapse(FrontFinder.findFeatureCollapse(feature))
        collapsible.show()
    }

    public onChangeInputDiceCode(object: Feature | Skill): void {
        object.dice.numberOf = parseInt(FrontFinder.findSkillOrFeatureDiceCodeInput(object).value)
    }

    public onChangeInputCheckPlus(object: Feature | Skill, isOne: boolean = true): void {
        const currentInput = isOne ? FrontFinder.findSkillOrFeaturePlusOneInput(object) : FrontFinder.findSkillOrFeaturePlusTwoInput(object),
            linkedInput = isOne ? FrontFinder.findSkillOrFeaturePlusTwoInput(object) : FrontFinder.findSkillOrFeaturePlusOneInput(object)
        if (!currentInput.checked) {
            object.dice.bonus = 0;
            return;
        }
        object.dice.bonus = isOne ? 1 : 2;
        if (!linkedInput.checked) {
            return;
        }
        linkedInput.checked = false;
    }

    public onClickButtonRollDice(object: Feature | Skill): void {
        this.app.showModalRollDice(object);
    }
}