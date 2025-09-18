import {App} from "./class/App";
import {FrontBuilder} from "./class/FrontBuilder";

let myApplication: App
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    App.loadApp().then((app) => {
        myApplication = app;
        try {
            FrontBuilder.initCards(myApplication.currentCharacter.features)
        } catch (e) {
            if (e instanceof Error) {
                myApplication.toast.showError(e)
            } else {
                console.error(e);
            }
        }
    }).catch((err) => {
        console.error(err);
    })
}