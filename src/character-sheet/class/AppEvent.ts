import {App} from "./App";
import {Collapse} from "bootstrap";
import {Feature} from "./Feature";
import {FrontFinder} from "./FrontFinder";

export class AppEvent {
    private readonly _app: App;

    constructor(app: App) {
        this._app = app;
    }

    get app(): App {
        return this._app;
    }

    public onRightClickFeatureCard(feature: Feature): void {
        const collapsible = new Collapse(FrontFinder.findFeatureCollapse(feature))
        collapsible.show()
    }

    public onChangeInputCheckPlus(event: Event): void {
        const eventTarget = event.currentTarget
        let element: HTMLInputElement | null = null;
        if (eventTarget instanceof HTMLInputElement) {
            element = eventTarget;
        }
        if (element === null) {
            return;
        }
        if (!element.dataset.linkedInputId) {
            return
        }
        let linkedElement: HTMLInputElement | null = null
        if (document.querySelector('#' + element.dataset.linkedInputId) instanceof HTMLInputElement) {
            linkedElement = document.querySelector('#' + element.dataset.linkedInputId);
        }
        if (!linkedElement) {
            return
        }
        if (!linkedElement.checked) {
            return
        }
        linkedElement.checked = false
    }

    public onClickButtonRollDice(event: MouseEvent): void {
        const eventTarget = event.currentTarget;
        let elementButton: HTMLButtonElement | null = null;
        if (eventTarget instanceof HTMLButtonElement) {
            elementButton = eventTarget;
        }
        if (elementButton === null) {
            return;
        }
        const directRow = elementButton.closest('.row'),
            cardBodyOrHeader = directRow?.parentNode
        if (cardBodyOrHeader === null || cardBodyOrHeader === undefined || !(cardBodyOrHeader instanceof HTMLElement)) {
            return;
        }
        // let diceObject
        // if (cardBodyOrHeader.classList.contains('card-body')) {
        //     diceObject = buildRollDice(directRow, true)
        // } else {
        //     diceObject = buildRollDice(directRow)
        // }
        // if (diceObject) {
        //     showModalRollDice(diceObject)
        // }
    }
}