import {Feature} from "./Feature";
import {FrontBuilder} from "./FrontBuilder";

export class FrontFinder {
    public static findFeatureCard(feature: Feature): HTMLElement {
        const element = document.querySelector('#' + FrontBuilder.buildCardFeatureId(feature));
        if (!element) {
            throw new Error(`Could not find card element with id '${feature.id}'`);
        }
        return element as HTMLElement;
    }

    public static findFeatureCollapse(feature: Feature): HTMLElement {
        const card = FrontFinder.findFeatureCard(feature),
            element = card.querySelector('.collapse');
        if (!element) {
            throw new Error(`Could not find collapse element with id '${feature.id}'`);
        }
        return element as HTMLElement;
    }
}