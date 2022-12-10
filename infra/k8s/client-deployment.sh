#!/bin/bash

# cd into client from k8s
cd ../../client

# Build docker image
docker build -t torressam/client .

# Push image to dockerhub
docker push torressam/client:latest

# cd back to k8 dir
cd ../infra/k8s

# Kubernetes apply client depl
kubectl apply -f ./client-depl.yaml

# Kuberetes roll out
kubectl rollout restart deployment client-depl

# List running pods
kubectl get pods