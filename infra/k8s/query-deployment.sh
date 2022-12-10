#!/bin/bash

# cd into client from k8s
cd ../../query

# Build docker image
docker build -t torressam/query .

# Push image to dockerhub
docker push torressam/query:latest

# cd back to k8 dir
cd ../infra/k8s

# Kubernetes apply client depl
kubectl apply -f ./query-depl.yaml

# Kuberetes roll out
kubectl rollout restart deployment query-depl

# List running pods
kubectl get pods