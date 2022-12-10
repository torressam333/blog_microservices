#!/bin/bash

# cd into client from k8s
cd ../../comments

# Build docker image
docker build -t torressam/comments .

# Push image to dockerhub
docker push torressam/comments:latest

# cd back to k8 dir
cd ../infra/k8s

# Kubernetes apply client depl
kubectl apply -f ./comments-depl.yaml

# Kuberetes roll out
kubectl rollout restart deployment comments-depl

# List running pods
kubectl get pods