# Le Galoya · site démo

Proposition de site pour **Le Galoya**, bistronomie et rooftop sur la Corniche Ouest à Dakar.

- Carte complète en ligne (entrées, plats signatures, braises, accompagnements, sauces, desserts, boissons, brunch)
- Réservation de table et commande à emporter / livraison sur WhatsApp
- Horaires avec « Ouvert / Fermé », itinéraire Google Maps et Waze, liens Instagram
- HTML, CSS et JavaScript purs : aucun serveur, aucune base de données

Démo à valider avec le restaurant : la page est exclue du référencement Google (`noindex`).

## Mettre en ligne

Site statique : publier ce dossier tel quel (Netlify, Cloudflare Pages ou GitHub Pages), sans commande de build.

## Modifier la carte

Les plats et les prix sont dans `app.js` (constante `MENU`). Le numéro WhatsApp est dans la constante `WA`.
