# NodeJS alapú webalkalmazás Azure-hoz

## Támogatott NodeJS verziók

- Node 14 LTS
- Node 16 LTS
- Node 18 LTS

## Kapcsolódó projekt

Nem Docker verzió: https://github.com/cloudsteak/trn-node-demo


## Docker alapok

[docker-alapok.md](./docs/docker-alapok.md)

## Megoldás

A megoldás "Embedded JavaScript templating"-re épül. https://ejs.co

https://ejs.co/#install

## Teszt lépések

**[eslint](https://eslint.org/)** tesztelés előkészítve.
Ha CI pipeline-t telepítesz, akkor ellemőrzi a kódodban (példa alapján app.js) a pontosvesszők helyességét. A CD rész, csak akkor fut le, ha a CI (a teszt) sikeres.

Kézzel is futtatható a teszt:

```bash
npm run test
```

vagy

```bash
eslint ./app.js
```

## Azure Pipeline létrehozás és kapcsolat GitHub-al

1. Personal Acces Token létrehozás: https://github.com/settings/tokens
2. "Generate new token (classic)"
   - Note: A token neve. Adj valami értelmezhető nevet. Pl.: AZPIPELINEPAT
   - Expiration: Token lejárati ideje. Tesztelés esetén választhatod a "No expiration". Éles rendszer esetén adj lejárati időt!!!
   - Az alábbi részeket válaszd ki a jelölönégyzeteknél
     - "repo": mindegyiket alatta
     - "admin:repo_hook": mindegyiket alatta
     - "user": mindegyiket alatta
3. "Generate token" gombra kattintéssal a token létrejön.
4. A tokent másold biztonságos helyre! Nem visszafejthető.
5. Menj át az Azure DevOps-ba, a saját organization és project alapján. Pl.: https://cloudsteak.visualstudio.com/MentorKlub/_settings/adminservices (Project Settings > Service connections)
6. "Create service connection"
7. "New Azure service connection" résznél válaszd a GitHub-ot
8. "New GitHub service connection" résznél az alábbi módon töltsd ki
   - "Personal Access Token Authentication"
   - "Personal access token" mezőbe illeszd be a GitHub-on generált token értékét
   - "Service connection name" mezőbe adj egy nevet. Pl.: GITADOCONN
   - Jelöld be a "Grant access permission to all pipelines" jelölő négyzetet
   - Kattints a "Verify and Save" gombra
9. Menj a Pipeline részbe. Pl.: https://cloudsteak.visualstudio.com/MentorKlub/_build
10. "Create Pipeline"
11. GitHub (Yaml)
12. Select lapon görgess a lapaljára és kattints az utolsó sorban a linkre: "You may also select a specific connection."
13. Választd a "GITADOCONN"-t
14. Keresd meg a GitHub repo-k között, amivel kapcsolódni szeretnél.
15. Létező YAML esetén a Run gomb melletti nyilra kattins és válaszd a "Save" lehetőséget.
16. Várd meg míg a pipeline létrejön. Ezzel a kapcsolt kész.
17. Ha GitHub-on módosítasz a kódon, akkor a pipeline elindul és a benne lévő kód lefut.

## NodeJs alkalmazás Docker-izálása

Dockerfile: leírja az alkalmazás környezet kialakításának feltételeit és lépéseit.
.dockerignore: tartalmazza azon fájlok, mappák és minták lerását, amit a docker image készítő figyelmen kívül hagy.

### Helyi "Build and run"

Helyi gépen hogyan tesztelhetem.

#### 1. Image build

```bash
docker build --tag cloudsteak/trn-node-demo-docker .
```

Megjegyzés: 
- Ha az image fájlt Apple Silicon processzoros gépen készítem, de utána Intel processzoros gépen használom, akkor a fenti parancshoz adjuk hozzá ezt: `--platform linux/amd64`
- Több platformos build: `docker buildx build --tag cloudsteak/trn-node-demo-docker --push . --platform linux/amd64,linux/arm64,linux/arm/v7`
#### 2. Docker konténer létrehozás és futtatás

```bash
docker run -d -p 80:3000 --name nodedemo cloudsteak/trn-node-demo-docker:latest
```

#### 3. Eredmény tesztelése

http://localhost

### Azure-ban futtatás

1. Azure Container Registry létrehozás

```bash
# Erőforráscsoport létrehozás - ha szükséges
az group create --name mentorklub2023 --location northeurope

# ACR létrehozás
az acr create --resource-group mentorklub2023 --name mentorklubacr --sku Basic

# Admin engedlyezése
az acr update -n mentorklubacr --admin-enabled true
```

2. Pipeline építés Azure DevOps-ban
  
3. Pipeline azure-pipelines.yml fájl módosítás

Hogy csak a Push esetén fusson le. Illesszük be a `condition: eq(variables['Build.reason'], 'IndividualCI')` sort.

```yaml
stages:
  - stage: Build
    displayName: Build and push stage
    condition: eq(variables['Build.reason'], 'IndividualCI')
    jobs:
```

A tag-ekhez tegyük be a `latest` értéket is.

```yaml
containerRegistry: $(dockerRegistryServiceConnection)
tags: |
  $(tag)
  latest
```

4. Webalkalmazás létrehozása (Docker)

5. Webalkalmazás módosítása

   1. Üzembehelyezési központban állítsuk át a `Folyamatos telepítés` értékés `Bekalcsolva`-ra.
   2. Konfiguráció > Általános beállítások > Mindig bekapcsolva: Be



## AKS

AKS-en való futtatáshoz itt találsz leírást: [aks/readme.md](aks/readme.md)
