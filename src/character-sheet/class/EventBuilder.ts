import {App} from "./App";
import {Feature} from "./Feature";
import {FrontFinder} from "./FrontFinder";

export class EventBuilder {
    private readonly _app: App;

    constructor(app: App) {
        this._app = app;
    }

    private get app(): App {
        return this._app;
    }

    addEventsOnFeatures(): void {
        this.app.currentCharacter.features.forEach((feature: Feature) => {
            this.addContextMenuOnFeature(feature);
        })
    }

    private addContextMenuOnFeature(feature: Feature): void {
        FrontFinder.findFeatureCard(feature).addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
            this.app.event.onRightClickFeatureCard(feature);
        })
    }

    // public static addContextMenuCard(card: HTMLElement): void {
    //     card.addEventListener('contextmenu', (event: MouseEvent) => {
    //         EventBuilder.onRightClickColumnCard(event);
    //     })
    // }
    //
    // public static onRightClickColumnCard(event: MouseEvent): void {
    //     event.preventDefault()
    //     const eventTarget = event.currentTarget;
    //     let collapsibleElement: HTMLElement | null = null;
    //     if (eventTarget instanceof HTMLElement) {
    //         collapsibleElement = eventTarget.querySelector('.collapse')
    //     }
    //     if (collapsibleElement === null) {
    //         return
    //     }
    //     const collapsible = new Collapse(collapsibleElement)
    //     collapsible.show()
    // }
    //
    // public static addChangeInputCheckPlus(input: HTMLInputElement): void {
    //     input.addEventListener('change', (event: Event): void => {
    //         EventBuilder.onChangeInputCheckPlus(event);
    //     })
    // }
    //
    // public static onChangeInputCheckPlus(event: Event): void {
    //     const eventTarget = event.currentTarget
    //     let element: HTMLInputElement | null = null;
    //     if (eventTarget instanceof HTMLInputElement) {
    //         element = eventTarget;
    //     }
    //     if (element === null) {
    //         return;
    //     }
    //     if (!element.dataset.linkedInputId) {
    //         return
    //     }
    //     let linkedElement: HTMLInputElement | null = null
    //     if (document.querySelector('#' + element.dataset.linkedInputId) instanceof HTMLInputElement) {
    //         linkedElement = document.querySelector('#' + element.dataset.linkedInputId);
    //     }
    //     if (!linkedElement) {
    //         return
    //     }
    //     if (!linkedElement.checked) {
    //         return
    //     }
    //     linkedElement.checked = false
    // }
    //
    // public static addClickButtonRollDice(button: HTMLButtonElement): void {
    //     button.addEventListener('click', (event: MouseEvent) => {
    //         EventBuilder.onClickButtonRollDice(event);
    //     })
    // }
    //
    // public static onClickButtonRollDice(event: MouseEvent): void {
    //     const eventTarget = event.currentTarget;
    //     let elementButton: HTMLButtonElement | null = null;
    //     if (eventTarget instanceof HTMLButtonElement) {
    //         elementButton = eventTarget;
    //     }
    //     if (elementButton === null) {
    //         return;
    //     }
    //     const directRow = elementButton.closest('.row'),
    //         cardBodyOrHeader = directRow?.parentNode
    //     if (cardBodyOrHeader === null || cardBodyOrHeader === undefined || !(cardBodyOrHeader instanceof HTMLElement)) {
    //         return;
    //     }
    //     // let diceObject
    //     // if (cardBodyOrHeader.classList.contains('card-body')) {
    //     //     diceObject = buildRollDice(directRow, true)
    //     // } else {
    //     //     diceObject = buildRollDice(directRow)
    //     // }
    //     // if (diceObject) {
    //     //     showModalRollDice(diceObject)
    //     // }
    // }
}