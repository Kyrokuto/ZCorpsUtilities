import {Feature} from "./Feature";
import {FrontBuilder} from "./FrontBuilder";
import {Skill} from "./Skill";
import {Utilities} from "./Utilities";

export class FrontFinder {
    public static findFeatureCard(feature: Feature): HTMLElement {
        const element = document.querySelector('#' + FrontBuilder.buildCardFeatureId(feature));
        if (!element) {
            throw new Error('Unable to find the "card" element for feature ' + feature.name + '.');
        }
        return element as HTMLElement;
    }

    public static findFeatureCollapse(feature: Feature): HTMLElement {
        const card = FrontFinder.findFeatureCard(feature),
            element = card.querySelector('.collapse');
        if (!element) {
            throw new Error('Unable to find the "collapse" element for feature ' + feature.name + '.');
        }
        return element as HTMLElement;
    }

    public static findSkillOrFeatureDiceCodeInput(object: Feature | Skill): HTMLInputElement {
        const element = document.querySelector('#' + FrontBuilder.buildInputDiceCodeId(object));
        if (!element) {
            let errorMessage = 'Unable to find input dice code element for ';
            if (Utilities.isFeatureClass(object)) {
                errorMessage += 'feature';
            } else {
                errorMessage += 'skill'
            }
            throw new Error(errorMessage + ' ' + object.name + '.');
        }
        return element as HTMLInputElement;
    }

    public static findSkillOrFeaturePlusOneInput(object: Feature | Skill): HTMLInputElement {
        const element = document.querySelector('#' + FrontBuilder.buildInputPlusOneId(object));
        if (!element) {
            let errorMessage = 'Unable to find input element "+1" for ';
            if (Utilities.isFeatureClass(object)) {
                errorMessage += 'feature';
            } else {
                errorMessage += 'skill'
            }
            throw new Error(errorMessage + ' ' + object.name + '.');
        }
        return element as HTMLInputElement;
    }

    public static findSkillOrFeaturePlusTwoInput(object: Feature | Skill): HTMLInputElement {
        const element = document.querySelector('#' + FrontBuilder.buildInputPlusTwoId(object));
        if (!element) {
            let errorMessage = 'Unable to find input element "+2" for ';
            if (Utilities.isFeatureClass(object)) {
                errorMessage += 'feature';
            } else {
                errorMessage += 'skill'
            }
            throw new Error(errorMessage + ' ' + object.name + '.');
        }
        return element as HTMLInputElement;
    }

    public static findSkillOrFeatureRollDiceButton(object: Feature | Skill): HTMLButtonElement {
        const element = document.querySelector('#' + FrontBuilder.buildIdButtonRollDice(object));
        if (!element) {
            let errorMessage = 'Unable to find button to roll dice for ';
            if (Utilities.isFeatureClass(object)) {
                errorMessage += 'feature';
            } else {
                errorMessage += 'skill'
            }
            throw new Error(errorMessage + ' ' + object.name + '.');
        }
        return element as HTMLButtonElement;
    }
}