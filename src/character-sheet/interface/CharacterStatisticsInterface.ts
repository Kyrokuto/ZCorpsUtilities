import {Dice} from "../class/Dice";
import {Character} from "../class/Character";
import {CharacterStatisticsJsonInterface} from "./CharacterStatisticsJsonInterface";

export interface CharacterStatisticsInterface {
    get id(): string

    get name(): string

    set name(value: string)

    get dice(): Dice;

    get currentCharacter(): Character | never;

    toJSON(): CharacterStatisticsJsonInterface;
}