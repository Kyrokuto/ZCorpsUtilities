import {App} from "./class/App";

let myApplication: App | null = null;
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    myApplication = new App();
    initCards();
}

function initCards() {
    const rowContent = document.querySelector('#row-content')
    if (rowContent === null) {
        return;
    }
    myApplication?.currentCharacter.features.forEach(featureClass => {
        const colCard = document.createElement('div'),
            card = document.createElement('div'),
            cardHeader = document.createElement('div'),
            rowFeature = document.createElement('div'),
            colFeature = document.createElement('div'),
            featureName = document.createElement('h3'),
            collapse = document.createElement('div'),
            cardBody = document.createElement('div')
        colCard.classList.add('col-6', 'p-2')
        // colCard.addEventListener('contextmenu', (event) => {
        //     onRightClickColumnCard(event)
        // })
        card.classList.add('card', 'border-info')
        card.dataset.superPrefixId = featureClass.id + myApplication?.appConstante.DEFAULT_SEPARATOR_ID + 'card'
        cardHeader.classList.add('card-header')
        rowFeature.classList.add('row')
        rowFeature.dataset.prefixId = featureClass.id + myApplication?.appConstante.DEFAULT_SEPARATOR_ID + 'row'
        colFeature.classList.add('col-7')
        collapse.classList.add('collapse')
        cardBody.classList.add('card-body')
        featureName.innerText = featureClass.name
        colFeature.appendChild(featureName)
        rowFeature.appendChild(colFeature)
        // createAllInputs(card.dataset[myApplication?.appConstante.DATA_KEY_SUPER_PREFIX_ID], rowFeature, true)
        cardHeader.appendChild(rowFeature)
        card.appendChild(cardHeader)
        featureClass.skills.forEach(skill => {
            const rowSkill = document.createElement('div'),
                colSkill = document.createElement('div'),
                skillName = document.createElement('h4'),
                skillSeparator = document.createElement('div')
            rowSkill.classList.add('row')
            rowSkill.dataset.prefixId = skill.id + myApplication?.appConstante.DEFAULT_SEPARATOR_ID + 'row'
            colSkill.classList.add('col-7')
            skillName.innerText = skill.name
            skillSeparator.classList.add('border', 'border-info-subtle', 'my-3', 'mx-5')
            colSkill.appendChild(skillName)
            rowSkill.appendChild(colSkill)
            // createAllInputs(card.dataset[myApplication?.appConstante.DATA_KEY_SUPER_PREFIX_ID], rowSkill)
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