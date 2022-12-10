#!/bin/bash

# cd into client from k8s
cd ../../event-bus

# Build docker image
docker build -t torressam/event-bus .

# Push image to dockerhub
docker push torressam/event-bus:latest

# cd back to k8 dir
cd ../infra/k8s

# Kubernetes apply client depl
kubectl apply -f ./event-bus-depl.yaml

# Kuberetes roll out
kubectl rollout restart deployment event-bus-depl

# List running pods
kubectl get pods