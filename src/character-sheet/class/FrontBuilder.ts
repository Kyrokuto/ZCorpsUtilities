import {Feature} from "./Feature";
import {GlobalVariables} from "../config/GlobalVariables";
import {Skill} from "./Skill";
import {Utilities} from "./Utilities";

export class FrontBuilder {
    public static readonly rowStringId = 'row';
    public static readonly cardStringId = 'card';

    public static buildRowId(object: Feature | Skill): string {
        return object.id + GlobalVariables.DEFAULT_SEPARATOR_ID + FrontBuilder.rowStringId;
    }

    public static buildCardFeatureId(feature: Feature): string {
        return feature.id + GlobalVariables.DEFAULT_SEPARATOR_ID + FrontBuilder.cardStringId;
    }

    public static buildInputDiceCodeId(object: Feature | Skill): string {
        return FrontBuilder.buildFullPrefixId(object)
            + GlobalVariables.INPUT_NUMBER_DICE_CODE_SUFFIX;
    }

    public static buildSpanDiceCodeId(object: Feature | Skill): string {
        return FrontBuilder.buildFullPrefixId(object)
            + GlobalVariables.SPAN_NUMBER_DICE_CODE_SUFFIX;
    }

    public static buildFullPrefixId(object: Feature | Skill): string {
        return FrontBuilder.buildCardFeatureId(Utilities.findFeatureWhitObject(object))
            + GlobalVariables.DEFAULT_SEPARATOR_ID
            + FrontBuilder.buildRowId(object)
            + GlobalVariables.DEFAULT_SEPARATOR_ID
    }

    public static buildInputPlusTwoId(object: Feature | Skill): string {
        return FrontBuilder.buildFullPrefixId(object)
            + GlobalVariables.INPUT_CHECK_ID_PLUS_TWO_SUFFIX;
    }

    public static buildInputPlusOneId(object: Feature | Skill): string {
        return FrontBuilder.buildFullPrefixId(object)
            + GlobalVariables.INPUT_CHECK_ID_PLUS_ONE_SUFFIX;
    }

    public static buildIdButtonRollDice(object: Feature | Skill): string {
        return FrontBuilder.buildFullPrefixId(object)
            + GlobalVariables.BUTTON_ROLL_DICE_ID_SUFFIX;
    }

    public static initCards(features: Feature[]) {
        const rowContent = document.querySelector('#row-content')
        if (rowContent === null) {
            return;
        }
        features.forEach(featureClass => {
            const colCard = document.createElement('div'),
                card = document.createElement('div'),
                cardHeader = document.createElement('div'),
                rowFeature = document.createElement('div'),
                colFeature = document.createElement('div'),
                featureName = document.createElement('h3'),
                collapse = document.createElement('div'),
                cardBody = document.createElement('div')
            colCard.classList.add('col-6', 'p-2')
            card.classList.add('card', 'border-info')
            card.id = this.buildCardFeatureId(featureClass);
            cardHeader.classList.add('card-header')
            rowFeature.classList.add('row')
            rowFeature.id = this.buildRowId(featureClass)
            colFeature.classList.add('col-7')
            collapse.classList.add('collapse')
            cardBody.classList.add('card-body')
            featureName.innerText = featureClass.name
            colFeature.appendChild(featureName)
            rowFeature.appendChild(colFeature)
            this.createAllInputs(featureClass, null, rowFeature)
            cardHeader.appendChild(rowFeature)
            card.appendChild(cardHeader)
            featureClass.skills.forEach(skill => {
                const rowSkill = document.createElement('div'),
                    colSkill = document.createElement('div'),
                    skillName = document.createElement('h4'),
                    skillSeparator = document.createElement('div')
                rowSkill.classList.add('row')
                rowSkill.id = this.buildRowId(skill)
                colSkill.classList.add('col-7')
                skillName.innerText = skill.name
                skillSeparator.classList.add('border', 'border-info-subtle', 'my-3', 'mx-5')
                colSkill.appendChild(skillName)
                rowSkill.appendChild(colSkill)
                this.createAllInputs(featureClass, skill, rowSkill)
                cardBody.appendChild(rowSkill)
                if (!featureClass.isLastSkill(skill)) {
                    cardBody.appendChild(skillSeparator)

                }
            })
            collapse.appendChild(cardBody)
            card.appendChild(collapse)
            colCard.appendChild(card)
            rowContent.appendChild(colCard)
        })
    }

    public static createAllInputs(feature: Feature, skill: Skill | null, element: HTMLElement) {
        const isHeader = !skill,
            divCol3 = document.createElement('div'),
            divCol1 = document.createElement('div'),
            divRow = document.createElement('div'),
            divCol8 = document.createElement('div'),
            divCol4 = document.createElement('div'),
            divDiceCode = document.createElement('div'),
            inputDiceCode = document.createElement('input'),
            spanDiceCode = document.createElement('span'),
            divPlusOne = document.createElement('div'),
            inputPlusOne = document.createElement('input'),
            labelPlusOne = document.createElement('label'),
            divPlusTwo = document.createElement('div'),
            inputPlusTwo = document.createElement('input'),
            labelPlusTwo = document.createElement('label'),
            buttonRollDice = document.createElement('button'),
            iconButtonRollDice = document.createElement('i');
        spanDiceCode.classList.add('input-group-text')
        spanDiceCode.innerText = 'D'
        spanDiceCode.id = FrontBuilder.buildSpanDiceCodeId(skill ? skill : feature)
        inputDiceCode.classList.add('form-control')
        inputDiceCode.type = 'number'
        if (isHeader) {
            inputDiceCode.min = '1'
        } else {
            inputDiceCode.min = '0'
        }
        inputDiceCode.value = inputDiceCode.min
        inputDiceCode.max = '10'
        inputDiceCode.step = '1'
        inputDiceCode.id = FrontBuilder.buildInputDiceCodeId(skill ? skill : feature)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        inputDiceCode.ariaDescribedBy = spanDiceCode.id
        inputDiceCode.ariaLabel = 'Code dés'
        divDiceCode.classList.add('input-group', 'input-group-lg', 'h-100')
        labelPlusTwo.classList.add('form-check-label')
        labelPlusOne.classList.add('form-check-label')
        labelPlusTwo.innerText = '+2'
        labelPlusOne.innerText = '+1'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        labelPlusTwo.for = FrontBuilder.buildInputPlusTwoId(skill ? skill : feature)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        labelPlusOne.for = FrontBuilder.buildInputPlusOneId(skill ? skill : feature)
        inputPlusTwo.classList.add('form-check-input')
        inputPlusOne.classList.add('form-check-input')
        inputPlusTwo.type = 'checkbox'
        inputPlusOne.type = 'checkbox'
        inputPlusTwo.value = '2'
        inputPlusOne.value = '1'
        inputPlusTwo.id = FrontBuilder.buildInputPlusTwoId(skill ? skill : feature)
        inputPlusOne.id = FrontBuilder.buildInputPlusOneId(skill ? skill : feature)
        inputPlusTwo.dataset.linkedInputId = inputPlusOne.id
        inputPlusOne.dataset.linkedInputId = inputPlusTwo.id
        divPlusTwo.classList.add('form-check')
        divPlusOne.classList.add('form-check')
        iconButtonRollDice.classList.add('bi', 'bi-rocket-takeoff')
        buttonRollDice.classList.add('btn', 'btn-outline-success', 'btn-lg')
        buttonRollDice.id = FrontBuilder.buildIdButtonRollDice(skill ? skill : feature)
        divCol3.classList.add('col-3')
        divCol1.classList.add('col-1', 'd-grid', 'gap-2')
        divRow.classList.add('row')
        divCol8.classList.add('col-8')
        divCol4.classList.add('col-4')
        divPlusTwo.appendChild(inputPlusTwo)
        divPlusTwo.appendChild(labelPlusTwo)
        divPlusOne.appendChild(inputPlusOne)
        divPlusOne.appendChild(labelPlusOne)
        divCol4.appendChild(divPlusOne)
        divCol4.appendChild(divPlusTwo)
        divDiceCode.appendChild(inputDiceCode)
        divDiceCode.appendChild(spanDiceCode)
        divCol8.appendChild(divDiceCode)
        divRow.appendChild(divCol8)
        divRow.appendChild(divCol4)
        divCol3.appendChild(divRow)
        buttonRollDice.appendChild(iconButtonRollDice)
        divCol1.appendChild(buttonRollDice)
        element.appendChild(divCol3)
        element.appendChild(divCol1)
    }
}