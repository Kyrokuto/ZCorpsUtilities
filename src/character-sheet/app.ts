import {App} from "./class/App";

let myApplication: App
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    App.loadApp().then((app) => {
        myApplication = app;
        try {
            myApplication.addEvents();
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