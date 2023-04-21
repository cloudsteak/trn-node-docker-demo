# Docker Alapok


## Docker Desktop

Telepítési link (Mac, Linux, Windows): https://www.docker.com/products/docker-desktop

## Miért Docker Desktop?

- Egyszerűen telepíthető
- Minden szükséges komponenst feltelepít
- Erőforrásszükséglet a futtató géphez szabható
- Teljes Docker funkcionalitás (images, DockerHub)
- Helyi Kubernetes (K8s) szerver
- Kiegészítók (monitorozás, egyéb cluster megoldások)


## Alap docker parancsok

- Verzió:

```bash
docker version
```

- Docker image lista:

```bash
docker images
```

- Image törlés:

```bash
docker rmi [image neve]:[tag]
```

- Docker konténer futtatása:

```bash
docker run -d -p 80:80 docker/getting-started
```

- Futó Docker konténerek listázása:

```bash
docker ps
```

- Összes Docker konténer listázása:

```bash
docker ps -a
```

- Docker konténer törlése (csak ha le van állítva):

```bash
docker rm [konténer azonosító]
```

- Docker konténer törlése (erőltetve):

```bash
docker rm [konténer azonosító] --force
```

- Logok ellenőrzése:

```bash
docker logs [konténer azonosító]
```

- Image építése Dockerfile alapján:

```bash
docker build --tag [namespace vagy author]]/[image neve]:[verzió] .
```
