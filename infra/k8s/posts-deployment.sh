#!/bin/bash

# cd into client from k8s
cd ../../posts

# Build docker image
docker build -t torressam/posts .

# Push image to dockerhub
docker push torressam/posts:latest

# cd back to k8 dir
cd ../infra/k8s

# Kubernetes apply client depl
kubectl apply -f ./posts-depl.yaml

# Kuberetes roll out
kubectl rollout restart deployment posts-depl

# List running pods
kubectl get pods