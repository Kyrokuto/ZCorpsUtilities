import {App} from "./class/App";

let myApplication: App | null = null;
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    myApplication = new App();
}