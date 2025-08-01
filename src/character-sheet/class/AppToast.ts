import bootstrap, {Toast} from "bootstrap";
import {GlobalVariables} from "../config/GlobalVariables"

export class AppToast {
    private static readonly allowedTypes: string[] = ['success', 'danger', 'warning', 'info']
    private readonly elementToast: HTMLElement;
    private readonly elementToastBody: HTMLElement;
    private readonly toastBootstrap: Toast;

    public constructor() {
        let element: HTMLElement | null = document.querySelector('#' + GlobalVariables.ELEMENT_ID_TOAST)
        if (element === null) {
            throw new Error('Toast element not found')
        }
        this.elementToast = element
        this.toastBootstrap = bootstrap.Toast.getOrCreateInstance(this.elementToast)
        element = this.elementToast.querySelector('.toast-body')
        if (element === null) {
            throw new Error('Toast body element not found')
        }
        this.elementToastBody = element;
    }

    private _type: string = '';

    public get type(): string {
        return this._type;
    }

    public set type(value: string) {
        value = value.trim()
        if (!AppToast.allowedTypes.includes(value)) {
            throw new Error('Toast type must be one of ' + AppToast.allowedTypes.join(', '))
        }
        if (this.type !== value) {
            this._type = value;
            AppToast.allowedTypes.forEach(allowedType => {
                if (!this.elementToast.classList.contains('text-bg-' + allowedType)) {
                    return
                }
                this.elementToast.classList.remove('text-bg-' + allowedType)
            })
            this.elementToast.classList.add('text-bg-' + this.type)
        }
    }

    private _message: string = '';

    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
        this.elementToastBody.innerHTML = ''
        this.elementToastBody.innerText = this.message
    }

    public show() {
        this.toastBootstrap.show()
    }

    public showError(error: Error) {
        this.type = 'danger'
        this.message = 'Internal error : ' + error.message
        this.show()
    }

    public showMessageWhitType(message: string, type: string = 'success') {
        this.type = type
        this.message = message
        this.show()
    }
}