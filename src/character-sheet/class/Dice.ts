import {DiceJsonDataInterface} from '../interface/DiceJsonDataInterface'
import {Feature} from "./Feature";
import {Skill} from "./Skill";

export class Dice {
    private static readonly DICE_MAX_BONUS: number = 3
    private static readonly DICE_MIN_BONUS: number = 0
    private static readonly DICE_MIN_NUMBER: number = 0
    private static readonly DICE_MAX_NUMBER: number = 10
    private readonly _feature: Feature | null = null;
    private readonly _skill: Skill | null = null;

    public constructor(numberOf: number = 0, bonus: number = 0, feature: Feature | null = null, skill: Skill | null = null) {
        this.validateNumberOf(numberOf)
        this._numberOf = numberOf
        this.validateBonus(bonus)
        this._bonus = bonus
        this.postValidateBonus()
        this._skill = skill;
        this._feature = feature;
    }

    get feature(): Feature | null {
        return this._feature;
    }

    get skill(): Skill | null {
        return this._skill;
    }

    private _numberOf: number

    public get numberOf(): number {
        return this._numberOf
    }

    public set numberOf(value: number) {
        if (this._numberOf === value) {
            return;
        }
        this.validateNumberOf(value)
        if (value > Dice.DICE_MAX_NUMBER) {
            value = Dice.DICE_MAX_NUMBER
        }
        this._numberOf = value
        this.runEventDiceCode();
    }

    private _bonus: number

    public get bonus(): number {
        return this._bonus
    }

    public set bonus(value: number) {
        if (this._bonus === value) {
            return;
        }
        this.validateBonus(value)
        this._bonus = value
        this.postValidateBonus()

    }

    public toJSON(): DiceJsonDataInterface {
        return {
            numberOf: this.numberOf,
            bonus: this.bonus,
        } as DiceJsonDataInterface
    }

    private validateNumberOf(value: number): void | never {
        if (!Number.isInteger(value)) {
            throw new Error('Dice number must be an integer')
        }
        if (value < Dice.DICE_MIN_NUMBER) {
            throw new Error('Dice number must be greater than 0')
        }
    }

    private validateBonus(value: number): void | never {
        if (!Number.isInteger(value)) {
            throw new Error('Dice bonus must be an integer')
        }
        if (value < Dice.DICE_MIN_BONUS) {
            throw new Error('Dice bonus must be greater than 0')
        }
    }

    private postValidateBonus() {
        if (this._bonus >= Dice.DICE_MAX_BONUS) {
            const diceAdd = Math.floor(this._bonus / Dice.DICE_MAX_BONUS)
            this._bonus = this._bonus % Dice.DICE_MAX_BONUS
            this._numberOf += diceAdd
            this.runEventDiceCode()
        }
        this.runEventDiceBonus();

    }

    private runEventDiceCode(): void {
        if (this.feature) {
            this.feature.character?.app.event.updateDiceCodeElement(this.feature);
        }
        if (this.skill) {
            this.skill.feature?.character?.app.event.updateDiceCodeElement(this.skill);
        }
    }

    private runEventDiceBonus(): void {
        if (this.feature) {
            this.feature.character?.app.event.updateDiceBonusElement(this.feature);
        }
        if (this.skill) {
            this.skill.feature?.character?.app.event.updateDiceBonusElement(this.skill);
        }
    }
}