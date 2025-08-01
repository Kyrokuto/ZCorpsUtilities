export class Dice {
    private static readonly DICE_CODE: string = 'd6';
    private static readonly DICE_ROLLER_PREFIX: string = '/r';
    private static readonly DICE_BONUS_PREFIX: string = '+';
    private static readonly DICE_MAX_BONUS: number = 3;
    private static readonly DICE_MIN_BONUS: number = 0;
    private static readonly DICE_MIN_NUMBER: number = 0;

    public constructor(numberOf: number = 0, bonus: number = 0) {
        this.validateNumberOf(numberOf)
        this._numberOf = numberOf;
        this.validateBonus(bonus)
        this._bonus = bonus;
        this.postValidateBonus();
    }

    private _numberOf: number;

    public get numberOf(): number {
        return this._numberOf;
    }

    public set numberOf(value: number) {
        this.validateNumberOf(value);
        this._numberOf = value;
    }

    private _bonus: number;

    public get bonus(): number {
        return this._bonus;
    }

    public set bonus(value: number) {
        this.validateBonus(value);
        this._bonus = value;
        this.postValidateBonus();
    }

    private validateNumberOf(value: number) {
        if (!Number.isInteger(value)) {
            throw new Error('Dice number must be an integer');
        }
        if (value < Dice.DICE_MIN_NUMBER) {
            throw new Error('Dice number must be greater than 0');
        }
    }

    private validateBonus(value: number) {
        if (!Number.isInteger(value)) {
            throw new Error('Dice bonus must be an integer');
        }
        if (value < Dice.DICE_MIN_BONUS) {
            throw new Error('Dice bonus must be greater than 0');
        }
    }

    private postValidateBonus() {
        if (this._bonus >= Dice.DICE_MAX_BONUS) {
            const diceAdd = Math.floor(this._bonus / Dice.DICE_MAX_BONUS);
            this._bonus = this._bonus % Dice.DICE_MAX_BONUS;
            this._numberOf += diceAdd;
        }
    }
}