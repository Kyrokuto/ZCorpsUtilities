import {DiceJsonDataInterface} from '../interface/DiceJsonDataInterface'
import {CharacterStatistics} from "../interface/CharacterContentInterface";

export class Dice {
    private static readonly DICE_MAX_BONUS: number = 3
    private static readonly DICE_MIN_BONUS: number = 0
    private static readonly DICE_MIN_NUMBER: number = 0
    private static readonly DICE_MAX_NUMBER: number = 10
    private readonly _linkedObject: CharacterStatistics | null = null;

    public constructor(numberOf: number = 0, bonus: number = 0, linkedObject: CharacterStatistics | null = null) {
        this.validateNumberOf(numberOf)
        this._numberOf = numberOf
        this.validateBonus(bonus)
        this._bonus = bonus
        this.postValidateBonus()
        this._linkedObject = linkedObject;
    }

    get linkedObject(): CharacterStatistics | null {
        return this._linkedObject;
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
        this.linkedObject?.currentCharacter.app.event.updateDiceCodeElement(this.linkedObject);
    }

    private runEventDiceBonus(): void {
        this.linkedObject?.currentCharacter.app.event.updateDiceBonusElement(this.linkedObject);
    }
}