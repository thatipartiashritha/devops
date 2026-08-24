Movie Picture Pipeline

A simple CI/CD project for a Movie Picture application.

Frontend: React

Backend: Python Flask

Docker: Application containers

GitHub Actions: CI/CD

AWS ECR: Docker image registry

AWS EKS + Kubernetes: Deployment

Project Structure

movie-picture-pipeline/
├── .github/workflows/
│   ├── frontend-ci.yaml
│   ├── frontend-cd.yaml
│   ├── backend-ci.yaml
│   └── backend-cd.yaml
├── setup/
└── starter/
    ├── frontend/
    └── backend/

Application

The frontend displays movies from the Flask backend.

Backend API:

GET /movies

Example response:

{
  "movies": [
    {"id": "123", "title": "Top Gun: Maverick"},
    {"id": "456", "title": "Sonic the Hedgehog"},
    {"id": "789", "title": "A Quiet Place"}
  ]
}

Frontend

Run locally:

cd starter/frontend
npm ci
npm start

Build and run with Docker:

docker build --build-arg REACT_APP_MOVIE_API_URL=http://localhost:5000 -t mp-frontend:latest .
docker run -p 3000:3000 mp-frontend:latest

Open:

http://localhost:3000

Backend

Run locally:

cd starter/backend
pipenv install
pipenv run serve

Test the API:

curl http://localhost:5000/movies

Tests and Linting

Frontend

cd starter/frontend
npm ci
CI=true npm test
npm run lint

Backend

cd starter/backend
pipenv install
pipenv run test
pipenv run lint

GitHub Actions

Frontend CI — frontend-ci.yaml

Runs on pull requests to main

Can be run manually

Runs lint and tests in parallel

Builds only when lint and tests pass

Backend CI — backend-ci.yaml

Runs on pull requests to main

Can be run manually

Runs lint and tests in parallel

Builds only when lint and tests pass

Frontend CD — frontend-cd.yaml

Runs when frontend changes are pushed to main

Can be run manually

Runs lint and tests

Builds the Docker image with REACT_APP_MOVIE_API_URL

Pushes the image to Amazon ECR

Deploys to EKS

Backend CD — backend-cd.yaml

Runs when backend changes are pushed to main

Can be run manually

Runs lint and tests

Builds the Docker image

Pushes the image to Amazon ECR

Deploys to EKS

Docker images are tagged with the Git commit SHA.

Kubernetes

Manifests:

starter/frontend/k8s/
starter/backend/k8s/

Apply frontend:

cd starter/frontend/k8s
kustomize build | kubectl apply -f -

Apply backend:

cd starter/backend/k8s
kustomize build | kubectl apply -f -

Check the deployment:

kubectl get pods
kubectl get services

Verify the Application

Backend:

http://<BACKEND-IP>:<NODEPORT>/movies

Frontend:

http://<FRONTEND-IP>:<NODEPORT>

The backend /movies endpoint should return the movie list, and the frontend should display it.

AWS / EKS

Create the AWS infrastructure:

cd setup/terraform
terraform apply

View the Terraform outputs:

terraform output

Configure kubectl:

aws eks update-kubeconfig --name <CLUSTER_NAME> --region <AWS_REGION>

GitHub Secrets

AWS credentials must be stored in GitHub Secrets and must not be written directly in workflow files.

Required secrets:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_SESSION_TOKEN

Cleanup

AWS resources can cost money. When finished:

cd setup/terraform