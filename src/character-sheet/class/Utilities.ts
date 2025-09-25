import {Skill} from './Skill'
import {Feature} from './Feature'
import {CharacterJsonDataInterface} from "../interface/CharacterJsonDataInterface";
import {CharacterStatisticsInterface} from "../interface/CharacterStatisticsInterface";

export class Utilities {
    public static isFeatureClass(object: unknown): boolean {
        if (!object) {
            return false
        }
        return object instanceof Feature
    }

    public static isSkillClass(object: unknown): boolean {
        if (!object) {
            return false
        }
        return object instanceof Skill
    }

    public static castHasSkillClass(object: unknown): Skill {
        if (!Utilities.isSkillClass(object)) {
            throw new Error('object is not supported.')
        }
        return object as Skill
    }

    public static findFeatureWhitObject(object: CharacterStatisticsInterface): Feature | never {
        if (Utilities.isFeatureClass(object)) {
            return object as Feature
        }
        if (Utilities.isSkillClass(object)) {
            return Utilities.castHasSkillClass(object).feature
        }
        throw new Error(
            'The feature could not be found to construct the input field ID for the number of dice for the skill or feature "' +
            object.name + '".')
    }

    public static isValidCharacterJSON(data: CharacterJsonDataInterface): void | never {
        if (!data) {
            throw new Error('Invalid character json.');
        }
        if (!data.name) {
            throw new Error('Invalid character json (name).');
        }
        if (!data.features) {
            throw new Error('Invalid character json (features).');
        }
        if (!Array.isArray(data.features)) {
            throw new Error('Invalid character json (features).');
        }
        if (data.features.length === 0) {
            throw new Error('Invalid character json (features).');
        }
        data.features.forEach(feature => {
            if (!feature.id) {
                throw new Error('Invalid character json (feature id).');
            }
            if (!feature.name) {
                throw new Error('Invalid character json (feature name).');
            }
            if (!feature.dice) {
                throw new Error('Invalid character json (feature dice).');
            }
            if (isNaN(feature.dice.bonus)) {
                throw new Error('Invalid character json (feature dice).');
            }
            if (isNaN(feature.dice.numberOf)) {
                throw new Error('Invalid character json (feature dice).');
            }
            if (!feature.skills) {
                throw new Error('Invalid character json (skills).');
            }
            if (!Array.isArray(feature.skills)) {
                throw new Error('Invalid character json (skills).');
            }
            if (feature.skills.length === 0) {
                throw new Error('Invalid character json (skills).');
            }
            feature.skills.forEach(skill => {
                if (!skill.id) {
                    throw new Error('Invalid character json (skill id).');
                }
                if (!skill.name) {
                    throw new Error('Invalid character json (skill name).');
                }
                if (!skill.dice) {
                    throw new Error('Invalid character json (skill dice).');
                }
                if (isNaN(skill.dice.bonus)) {
                    throw new Error('Invalid character json (skill dice).');
                }
                if (isNaN(skill.dice.numberOf)) {
                    throw new Error('Invalid character json (skill dice).');
                }
            })
        })
    }

    public static getDefaultFeatures(): Feature[] {
        const agility = new Feature('agility', 'Agilité'),
            knowledge = new Feature('knowledge', 'Connaissances'),
            ability = new Feature('ability', 'Adresse'),
            perception = new Feature('perception', 'Perception'),
            power = new Feature('power', 'Puissance'),
            presence = new Feature('presence', 'Présence')
        agility.skills = [
            new Skill('acrobaties', 'Acrobaties'),
            new Skill('fight', 'Bagarre'),
            new Skill('contortion', 'Contorsion'),
            new Skill('discretion', 'Discrétion'),
            new Skill('riding', 'Equitation'),
            new Skill('dodge', 'Esquive'),
            new Skill('climbing', 'Grimper'),
            new Skill('scrum', 'Mêlée'),
            new Skill('jump', 'Sauter'),
        ]
        knowledge.skills = [
            new Skill('business', 'Affaires'),
            new Skill('counterfeiting', 'Contrefaçon'),
            new Skill('demolition', 'Démolition'),
            new Skill('electronic', 'Électronique'),
            new Skill('erudition', 'Érudition'),
            new Skill('computing', 'Informatique'),
            new Skill('languages', 'Langues', null, true),
            new Skill('medical', 'Médecine'),
            new Skill('shipping', 'Navigation'),
            new Skill('security', 'Sécurité'),
            new Skill('occult-sciences', 'Sciences occultes'),
        ]
        ability.skills = [
            new Skill('firearms', 'Armes à feu'),
            new Skill('throwing-weapons', 'Armes de jet'),
            new Skill('hook', 'Crochetage'),
            new Skill('dexterity', 'Dextérité'),
            new Skill('throw', 'Lancer'),
            new Skill('control', 'Pilotage', null, true),
            new Skill('repair', 'Réparer', null, true),
        ]
        perception.skills = [
            new Skill('artist', 'Artiste'),
            new Skill('camouflage', 'Camouflage'),
            new Skill('search', 'Chercher'),
            new Skill('street-knowledge', 'Connaissance de la rue'),
            new Skill('investigation', 'Investigation'),
            new Skill('games', 'Jeux'),
            new Skill('track', 'Pister'),
            new Skill('survival', 'Survie'),
        ]
        power.skills = [
            new Skill('run', 'Courir'),
            new Skill('stamina', 'Endurance'),
            new Skill('swim', 'Nager'),
            new Skill('lift', 'Soulever'),
        ]
        presence.skills = [
            new Skill('charm', 'Charmer'),
            new Skill('order', 'Commander'),
            new Skill('disguise', 'Déguisement'),
            new Skill('dressage', 'Dressage'),
            new Skill('empathy', 'Empathie'),
            new Skill('scam', 'Escroquerie'),
            new Skill('bullying', 'Intimidation'),
            new Skill('persuasion', 'Persuasion'),
            new Skill('willpower', 'Volonté'),
        ]
        return [agility, knowledge, ability, perception, power, presence]
    }
}