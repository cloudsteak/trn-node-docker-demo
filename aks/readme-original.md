# AKS 


## Docker image build

```
docker build --tag cloudsteak/trn-node-demo-docker . --platform linux/amd64
```

## Erőforráscsoportok

#### ACR Resource Group

```bash
az group create --name eszak-europa-acr --location northeurope
```

#### AKS Resource Group

```bash
az group create --name eszak-europa-k8s --location northeurope
```

### ACR kezelés

#### ACR létrehozás

```bash
az acr create --resource-group eszak-europa-acr --name azurehaladoacr --sku Basic
  ```


#### Bejelentkezés ACR-be

Már be kell jelentkezve lenned a megfelelő Azure előfizetésbe!

```
az acr login --name azurehaladoacr
```


#### TAG docker images: ACR

```
docker tag cloudsteak/trn-node-demo-docker:latest azurehaladoacr.azurecr.io/trn-node-demo-docker:latest
docker tag cloudsteak/trn-node-demo-docker:latest azurehaladoacr.azurecr.io/trn-node-demo-docker:1.0
```

#### Kép feltöltése ACR-be

```
docker push azurehaladoacr.azurecr.io/trn-node-demo-docker:latest
docker push azurehaladoacr.azurecr.io/trn-node-demo-docker:1.0
```

## AKS Cluster létrehozás

```
az aks create --resource-group eszak-europa-k8s --name azurehaladoaks --node-count 2 --generate-ssh-keys --attach-acr azurehaladoacr --node-vm-size Standard_B2ms
```

## AKS cluster credential letöltése

```
az aks get-credentials --resource-group eszak-europa-k8s --name azurehaladoaks
```

## AKS cluster kezelés

### Kapcsolódás

```
kubectl get nodes --kubeconfig ~/.kube/config
```

### Létező kapcsolatok lekérdezése

```
kubectl config get-contexts
```

#### Aktuális kapcsolat

```
kubectl config current-context
```

#### Másik kapcsolat aktualizálása

```
kubectl config use-context azurehaladoaks
```


## Alkalmazás létrehozás

### Névtér létrehozás

```
kubectl create namespace trn-node-demo
```

## Alapértelmezett névtér

```
kubectl config set-context --current --namespace=trn-node-demo
```

## trn-node-demo alkalmazás létrehozása

```
kubectl apply -f aks/trn-node-demo.yaml --namespace trn-node-demo
```

# Automatikus skálázás beállítása

```
kubectl autoscale deployment trn-node-demo --cpu-percent=60 --min=2 --max=10 -n trn-node-demo
```

## Check it

```
kubectl get hpa -n trn-node-demo
```