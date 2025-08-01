import bootstrap, {Modal} from "bootstrap";
import {GlobalVariables} from "../config/GlobalVariables";

export class AppModal {
    private readonly elementModal: HTMLElement;
    private readonly elementModalTitle: HTMLElement;
    private readonly elementModalBody: HTMLElement;
    private readonly elementModalFooter: HTMLElement;
    private readonly modalBootstrap: Modal;

    public constructor() {
        const element: HTMLElement | null = document.querySelector('#' + GlobalVariables.ELEMENT_ID_MODAL_GLOBAL)
        if (element === null) {
            throw new Error('Modal element not found')
        }
        this.elementModal = element;
        const elementModalBody: HTMLElement | null = this.elementModal.querySelector('.modal-body')
        const elementModalFooter: HTMLElement | null = this.elementModal.querySelector('.modal-footer')
        const elementModalTitle: HTMLElement | null = document.querySelector('#' + GlobalVariables.ELEMENT_ID_MODAL_GLOBAL_LABEL)
        if (elementModalBody === null || elementModalFooter === null || elementModalTitle === null) {
            throw new Error('Modal elements not found')
        }
        this.elementModalBody = elementModalBody
        this.elementModalFooter = elementModalFooter
        this.elementModalTitle = elementModalTitle
        this.resetModal()
        this.modalBootstrap = bootstrap.Modal.getOrCreateInstance(this.elementModal)
    }

    public resetModal() {
        this.elementModalTitle.innerText = ''
        this.elementModalBody.innerHTML = ''
        this.resetModalFooter()
    }

    public appendChildToBody(element: HTMLElement) {
        this.elementModalBody.appendChild(element)
    }

    public setModalTitle(title: string) {
        this.elementModalTitle.innerText = title
    }

    public addButtonFooter(button: HTMLButtonElement) {
        this.elementModalFooter.appendChild(button)
    }

    public resetModalFooter() {
        this.elementModalFooter.innerHTML = ''
        const buttonClose = document.createElement('button')
        buttonClose.type = 'button'
        buttonClose.classList.add('btn', 'btn-secondary')
        buttonClose.dataset.bsDismiss = 'modal'
        buttonClose.innerText = 'Close'
        this.elementModalFooter.appendChild(buttonClose)
    }

    public show() {
        this.modalBootstrap.show(this.elementModal)
    }

    public close() {
        this.resetModal()
        this.modalBootstrap.hide()
    }

}