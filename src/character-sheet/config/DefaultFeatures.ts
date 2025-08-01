import {Feature} from "../class/Feature";
import {Skill} from "../class/Skill";

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
    new Skill('languages', 'Langues'),
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
    new Skill('control', 'Pilotage'),
    new Skill('repair', 'Réparer'),
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
export const defaultFeatures: Feature[] = [agility, knowledge, ability, perception, power, presence];