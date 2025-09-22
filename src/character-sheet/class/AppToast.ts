import {Toast} from 'bootstrap'
import {GlobalVariables} from '../config/GlobalVariables'
import {App} from './App'
import {ToastType} from '../enum/ToastType'

export class AppToast {
    private readonly _app: App
    private readonly elementToast: HTMLElement
    private readonly elementToastBody: HTMLElement
    private readonly toastBootstrap: Toast

    public constructor(app: App) {
        let element: HTMLElement | null = document.querySelector(
            '#' + GlobalVariables.ELEMENT_ID_TOAST)
        if (element === null) {
            throw new Error('Toast element not found')
        }
        this.elementToast = element
        this.toastBootstrap = Toast.getOrCreateInstance(this.elementToast)
        element = this.elementToast.querySelector('.toast-body')
        if (element === null) {
            throw new Error('Toast body element not found')
        }
        this.elementToastBody = element
        this._app = app
    }

    private _type: ToastType = ToastType.info

    get type(): ToastType {
        return this._type
    }

    set type(value: ToastType) {
        if (this.type !== value) {
            const oldValue = this.type
            this._type = value
            this.elementToast.classList.remove('text-bg-' + oldValue)
            this.elementToast.classList.add('text-bg-' + value)
        }
    }

    private _message: string = ''

    public get message(): string {
        return this._message
    }

    public set message(value: string) {
        this._message = value
        this.elementToastBody.innerHTML = ''
        this.elementToastBody.innerText = this.message
    }

    get app(): App {
        return this._app
    }

    public show() {
        this.toastBootstrap.show()
    }

    public showError(error: Error) {
        this.type = ToastType.danger
        this.message = 'Internal error : ' + error.message
        this.show()
    }

    public showMessageWhitType(
        message: string, type: ToastType = ToastType.success) {
        this.type = type
        this.message = message
        this.show()
    }
}