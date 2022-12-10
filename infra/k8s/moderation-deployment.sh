#!/bin/bash

# cd into client from k8s
cd ../../moderation

# Build docker image
docker build -t torressam/moderation .

# Push image to dockerhub
docker push torressam/moderation:latest

# cd back to k8 dir
cd ../infra/k8s

# Kubernetes apply client depl
kubectl apply -f ./moderation-depl.yaml

# Kuberetes roll out
kubectl rollout restart deployment moderation-depl

# List running pods
kubectl get pods