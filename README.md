# Bereikbaarheid frontend
Deze folder bevat de Bereikbaarheid frontend zoals zichtbaar op kaart.nationaalwegenbestand.nl/bereikbaarheid.

Een werkkaart kun je activeren met de parameter `expertMode=true`: kaart.nationaalwegenbestand.nl/bereikbaarheid/?expertMode=true . Hiermee heb je toegang tot extra functionaliteit wat het makkelijker maakt om de content van de kaart te checken.

## Mappen & bestanden
Deze folder is als volgt ingedeeld:

* `public`: bevat static files; worden meegenomen in `npm run build`
* `src`: bevat de React applicatie.
* `test`: bevat test utils. Deze worden gebruikt in `npm run test`
* `.env.*`: env variables voor de diverse omgevingen. Worden ingesteld door `npm run start`.
* `Dockerfile` bevat config voor de Docker omgeving.
* `nginx.*.conf`; bevat nginx configuraties voor diverse omgevingen.

## Getting Started

### To have a look around
- Make sure the API is running locally, for more info see the [bereikbaarheid-backend repo](https://github.com/GemeenteUtrecht/bereikbaarheid-backend).
- Run the docker container: `docker compose up --build`.

### Om aanpassingen aan de frontend te maken
1. Installeer [Node.js](https://nodejs.org/en/)
2. Installeer [NVM](https://github.com/nvm-sh/nvm) om te kunnen werken met verschillende Node versies op je lokale machine
3. Configureer je IDE zodat de volgende zaken ondersteund, bijv. dmv plugins:
   - [Prettier](https://prettier.io/); zodanig dat JS worden gecheckt. Voorbeeld pattern: `*.{js,ts,jsx,tsx}`
   - [ESLint](https://eslint.org/)
   - [EditorConfig](https://editorconfig.org/)
4. Gebruik de juiste Node.js versie voor deze app door commando `nvm use` te draaien in je terminal. Als je geen gebruik maakt van NVM, zorg dan dat je handmatig de correcte Node.js versie installeert zoals beschreven in `.nvmrc`
5. Installeer de app dependencies: `npm install`
6. Zorg dat de API lokaal beschikbaar is, zie de [bereikbaarheid-backend repo](https://github.com/GemeenteUtrecht/bereikbaarheid-backend) voor meer info.
7. Start de frontend development server: `npm start`.

Een hot-reloaded versie van de frontend is beschikbaar via [http://localhost:3000](http://localhost:3000). De pagina wordt ververst als je bronbestanden (in de `src` folder) wijzigt. Zowel in je IDE als in de console zijn linting en formatting errors te zien.

### Hoe is het CORS issue opgelost in de verschillende scenario's?
- Tijdens ontwikkeling van de frontend zorgt Vite voor de proxy, zie `vite.config.ts`. 
- Om CORS issues in de docker-compose setup te vermijden, wordt een aparte NGINX setup (`nginx.dockercompose.conf`) gebruikt. Via een build argument wordt bepaald welke nginx configuratie wordt geladen.

## Available Scripts
In this directory, you can run:

- `npm start`: runs the app in the development mode.
- `npm run lint`: lints the application code.
- `npm run test`: launches the test runner.
- `npm run test:watch`: launches the test runner in the interactive watch mode.
- `npm run build`: builds the app for production to the `build` folder.
- `npm run preview`: preview the built app.
