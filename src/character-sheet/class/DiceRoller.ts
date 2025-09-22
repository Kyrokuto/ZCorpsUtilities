import {Dice} from './Dice'
import {Feature} from './Feature'
import {Skill} from './Skill'

export class DiceRoller {
    private static readonly DICE_CODE: string = 'd6'
    private static readonly DICE_ROLLER_PREFIX: string = '/r'
    private static readonly DICE_BONUS_PREFIX: string = '+'
    private readonly _feature: Feature
    private readonly _skill: Skill | null = null
    private readonly _dice: Dice

    constructor(object: Feature | Skill) {
        this._dice = new Dice()
        if (object instanceof Feature) {
            this._feature = object
            this.buildRollDice()
            return
        }
        if (!object.feature) {
            throw Error('Unable to build the dice for skill ' + object.name +
                ' because it has no features.')
        }
        this._feature = object.feature
        this._skill = object
        this.buildRollDice()
    }

    get feature(): Feature {
        return this._feature
    }

    get skill(): Skill | null {
        return this._skill
    }

    get dice(): Dice {
        return this._dice
    }

    public getFullName(): string {
        if (!this.skill) {
            return this.feature.name
        }
        return this.skill.name + ' (dans ' + this.feature.name + ')'
    }

    public getDiceRollerCommand(): string {
        let command = DiceRoller.DICE_ROLLER_PREFIX + ' ' + this.dice.numberOf +
            DiceRoller.DICE_CODE
        if (this.dice.bonus > 0) {
            command += DiceRoller.DICE_BONUS_PREFIX + this.dice.bonus
        }
        return command
    }

    private buildRollDice(): void {
        if (!this.skill) {
            this.buildRollDiceForFeature()
            return
        }
        this.buildRollDiceForFeature()
        this.buildRollDiceForSkill()
    }

    private buildRollDiceForFeature(): void {
        this.dice.numberOf = this.feature.dice.numberOf
        this.dice.bonus = this.feature.dice.bonus
    }

    private buildRollDiceForSkill(): void {
        if (!this.skill) {
            return
        }
        if (this.skill.dice.numberOf === 0 && this.skill.dice.bonus === 0) {
            this.dice.numberOf -= 1
            return
        }
        this.dice.numberOf += this.skill.dice.numberOf
        this.dice.bonus += this.skill.dice.bonus
    }
}