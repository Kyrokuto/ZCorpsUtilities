import {Dice} from "../class/Dice";
import {Character} from "../class/Character";

export interface CharacterStatistics {
    get id(): string

    get name(): string

    set name(value: string)

    get dice(): Dice;

    get currentCharacter(): Character | never;
}