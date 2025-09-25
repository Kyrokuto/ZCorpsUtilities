import {Feature} from './Feature'
import {GlobalVariables} from '../config/GlobalVariables'
import {Utilities} from './Utilities'
import {App} from './App'
import {EventBuilder} from "./EventBuilder";
import {CharacterStatisticsInterface} from "../interface/CharacterStatisticsInterface";

export class FrontBuilder {
    public static readonly rowStringId = 'row'
    public static readonly cardStringId = 'card'
    public static readonly titleStringId = 'title'

    public static buildRowId(characterStatistics: CharacterStatisticsInterface): string {
        return characterStatistics.id + GlobalVariables.DEFAULT_SEPARATOR_ID +
            FrontBuilder.rowStringId
    }

    public static buildCardFeatureId(feature: Feature): string {
        return feature.id + GlobalVariables.DEFAULT_SEPARATOR_ID +
            FrontBuilder.cardStringId
    }

    public static buildCardFeatureTitleId(feature: Feature): string {
        return feature.id + GlobalVariables.DEFAULT_SEPARATOR_ID
            + FrontBuilder.cardStringId
            + GlobalVariables.DEFAULT_SEPARATOR_ID
            + FrontBuilder.titleStringId;
    }

    public static buildInputDiceCodeId(characterStatistics: CharacterStatisticsInterface): string {
        return FrontBuilder.buildFullPrefixId(characterStatistics)
            + GlobalVariables.INPUT_NUMBER_DICE_CODE_SUFFIX
    }

    public static buildSpanDiceCodeId(characterStatistics: CharacterStatisticsInterface): string {
        return FrontBuilder.buildFullPrefixId(characterStatistics)
            + GlobalVariables.SPAN_NUMBER_DICE_CODE_SUFFIX
    }

    public static buildFullPrefixId(characterStatistics: CharacterStatisticsInterface): string {
        return FrontBuilder.buildCardFeatureId(
                Utilities.findFeatureWhitCharacterStatistics(characterStatistics))
            + GlobalVariables.DEFAULT_SEPARATOR_ID
            + FrontBuilder.buildRowId(characterStatistics)
            + GlobalVariables.DEFAULT_SEPARATOR_ID
    }

    public static buildInputPlusTwoId(characterStatistics: CharacterStatisticsInterface): string {
        return FrontBuilder.buildFullPrefixId(characterStatistics)
            + GlobalVariables.INPUT_CHECK_ID_PLUS_TWO_SUFFIX
    }

    public static buildInputPlusOneId(characterStatistics: CharacterStatisticsInterface): string {
        return FrontBuilder.buildFullPrefixId(characterStatistics)
            + GlobalVariables.INPUT_CHECK_ID_PLUS_ONE_SUFFIX
    }

    public static buildIdButtonRollDice(characterStatistics: CharacterStatisticsInterface): string {
        return FrontBuilder.buildFullPrefixId(characterStatistics)
            + GlobalVariables.BUTTON_ROLL_DICE_ID_SUFFIX
    }

    public static initCards(features: Feature[]) {
        const rowContent = document.querySelector('#row-content')
        if (rowContent === null) {
            return
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
            card.id = this.buildCardFeatureId(featureClass)
            cardHeader.classList.add('card-header')
            rowFeature.classList.add('row')
            rowFeature.id = this.buildRowId(featureClass)
            colFeature.classList.add('col-7')
            collapse.classList.add('collapse')
            cardBody.classList.add('card-body')
            featureName.innerText = featureClass.name
            featureName.id = FrontBuilder.buildCardFeatureTitleId(featureClass)
            colFeature.appendChild(featureName)
            rowFeature.appendChild(colFeature)
            this.createAllInputs(featureClass, rowFeature)
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
                skillSeparator.classList.add('border', 'border-info-subtle', 'my-3',
                    'mx-5')
                colSkill.appendChild(skillName)
                rowSkill.appendChild(colSkill)
                this.createAllInputs(skill, rowSkill)
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

    public static createAllInputs(characterStatistics: CharacterStatisticsInterface, element: HTMLElement) {
        const isHeader = Utilities.isFeatureClass(characterStatistics),
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
            iconButtonRollDice = document.createElement('i')
        spanDiceCode.classList.add('input-group-text')
        spanDiceCode.innerText = 'D'
        spanDiceCode.id = FrontBuilder.buildSpanDiceCodeId(characterStatistics)
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
        inputDiceCode.id = FrontBuilder.buildInputDiceCodeId(characterStatistics)
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
        labelPlusTwo.for = FrontBuilder.buildInputPlusTwoId(characterStatistics)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        labelPlusOne.for = FrontBuilder.buildInputPlusOneId(characterStatistics)
        inputPlusTwo.classList.add('form-check-input')
        inputPlusOne.classList.add('form-check-input')
        inputPlusTwo.type = 'checkbox'
        inputPlusOne.type = 'checkbox'
        inputPlusTwo.value = '2'
        inputPlusOne.value = '1'
        inputPlusTwo.id = FrontBuilder.buildInputPlusTwoId(characterStatistics)
        inputPlusOne.id = FrontBuilder.buildInputPlusOneId(characterStatistics)
        inputPlusTwo.dataset.linkedInputId = inputPlusOne.id
        inputPlusOne.dataset.linkedInputId = inputPlusTwo.id
        divPlusTwo.classList.add('form-check')
        divPlusOne.classList.add('form-check')
        iconButtonRollDice.classList.add('bi', 'bi-rocket-takeoff')
        buttonRollDice.classList.add('btn', 'btn-outline-success', 'btn-lg')
        buttonRollDice.id = FrontBuilder.buildIdButtonRollDice(characterStatistics)
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

    public static createFormSaveInModalBody(app: App): void {
        const divInfo = document.createElement('div'),
            form = document.createElement('form'),
            divCharacterName = document.createElement('div'),
            labelCharacterName = document.createElement('label'),
            inputCharacterName = document.createElement('input'),
            divCharacterData = document.createElement('div'),
            labelCharacterData = document.createElement('label'),
            inputCharacterData = document.createElement('textarea')
        divCharacterName.classList.add('mb-3')
        labelCharacterName.classList.add('col-form-label')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        labelCharacterName.for = GlobalVariables.INPUT_ID_CHARACTER_NAME
        labelCharacterName.innerText = 'Character name'
        inputCharacterName.classList.add('form-control')
        inputCharacterName.type = 'text'
        inputCharacterName.value = app.currentCharacter.name ?? ''
        inputCharacterName.id = GlobalVariables.INPUT_ID_CHARACTER_NAME
        divCharacterName.appendChild(labelCharacterName)
        divCharacterName.appendChild(inputCharacterName)
        form.appendChild(divCharacterName)
        divCharacterData.classList.add('mb-3')
        labelCharacterData.classList.add('col-form-label')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        labelCharacterData.for = GlobalVariables.INPUT_ID_CHARACTER_DATA
        labelCharacterData.innerText = 'Character statistics'
        inputCharacterData.classList.add('form-control')
        inputCharacterData.value = JSON.stringify(app.currentCharacter)
        inputCharacterData.id = GlobalVariables.INPUT_ID_CHARACTER_DATA
        inputCharacterData.disabled = true
        divCharacterData.appendChild(labelCharacterData)
        divCharacterData.appendChild(inputCharacterData)
        form.appendChild(divCharacterData)
        divInfo.classList.add('alert', 'alert-info')
        divInfo.role = 'alert'
        divInfo.innerHTML = 'Enter your character\'s name.<br/>' +
            'Then click on the button and copy the contents of your clipboard to a text file for saving and reuse next time.'
        app.modal.appendChildToBody(divInfo)
        app.modal.appendChildToBody(form)
    }

    public static createFormLoadInModalBody(app: App): void {
        const form = document.createElement('form'),
            divCharacterData = document.createElement('div'),
            labelCharacterData = document.createElement('label'),
            inputCharacterData = document.createElement('textarea')
        divCharacterData.classList.add('mb-3')
        labelCharacterData.classList.add('col-form-label')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        labelCharacterData.for = GlobalVariables.INPUT_ID_CHARACTER_DATA
        labelCharacterData.innerText = 'Character data'
        inputCharacterData.classList.add('form-control')
        inputCharacterData.value = ''
        inputCharacterData.id = GlobalVariables.INPUT_ID_CHARACTER_DATA
        divCharacterData.appendChild(labelCharacterData)
        divCharacterData.appendChild(inputCharacterData)
        form.appendChild(divCharacterData)
        app.modal.appendChildToBody(form)
    }

    public static createFormFindSkillFeature(app: App): void {
        const inputSelect = document.createElement('select'),
            labelSelect = document.createElement('label')
        labelSelect.classList.add('form-label')
        labelSelect.innerText = 'Choice skill/feature'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        labelSelect.for = GlobalVariables.INPUT_SELECT_FIND_SKILL_FEATURE
        inputSelect.id = GlobalVariables.INPUT_SELECT_FIND_SKILL_FEATURE
        EventBuilder.addChangeSelectFindSkillFeature(inputSelect, app)
        inputSelect.classList.add('form-select')
        const selectOption: { value: string; text: string }[] = []
        app.currentCharacter.getAllFeaturesAndSkills().forEach(characterStatistics => {
            selectOption.push({
                value: characterStatistics.id,
                text: characterStatistics.name,
            })
        })
        selectOption.sort((a, b) => {
            return a.text.localeCompare(b.text)
        })
        inputSelect.innerHTML = ''
        const option = document.createElement('option')
        option.value = ''
        option.innerText = ''
        inputSelect.appendChild(option)
        selectOption.forEach(({value, text}) => {
            const option = document.createElement('option')
            option.value = value
            option.innerText = text
            inputSelect.appendChild(option)
        })
        app.modal.appendChildToBody(labelSelect)
        app.modal.appendChildToBody(inputSelect)
    }
}