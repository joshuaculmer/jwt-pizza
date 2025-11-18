# What is Kubernetes? <img src = Kubernetes_logo_without_workmark.svg.png height = "50">  How does it differ from Docker? 

Kubernetes website ([https://kubernetes.io/](kubernetes.io)) vaguely explains Kubernetes as an open source system for automating deployment, scaling, and management of containerized applications. 

What this really means is that 


## What does Kubernetes do?

Kubernetes seems to act like a management system for pods of images. So if you wanted to run 5 images of your server, then you could configure a pod to run five of those images and have kubernetes manage the creation, load balancing, etc of that pod and its five images.

Pods(containers of images)


## Deployments

Kubernetes instructions are defined in a manifest file written in yaml. This manifest is basicaly the  configuration of the desired state, which Kubernetes then takes and manages its pods and images accordingly. Kubernetes takes the deployment file and works to create and maintain that

## Who made Kubernetes?

## Who users Kubernetes?

## Docker

Docker takes a program and builds it into a container. This container is used to make a runnign image of the program that will work in any environment.

Kubernetes is an environment for managing these images. 