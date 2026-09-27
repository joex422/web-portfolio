# Dev deployment

Push application changes to `dev`. The dev GitHub Actions workflow builds an
immutable `ghcr.io/joex422/web-portfolio:dev-<commit>` image, then commits its tag
to `deploy/dev/kustomization.yaml`. Argo CD automatically syncs that manifest to
the registered dev K3s cluster, in namespace `web-portfolio-dev`.

The initial Argo CD Application is in `deploy/argocd/web-portfolio-dev.yaml`.
Apply it to the existing Argo CD control cluster after the first dev build has
published its image and updated the manifest:

```sh
kubectl --context=kubernetes-admin@kubernetes apply -f deploy/argocd/web-portfolio-dev.yaml
```

Traefik serves the dev portfolio at <http://192.168.1.80/> on the local network.
The ingress has no hostname restriction. Add a host and DNS record when a dev
domain is available.

Production continues using `main`, `.github/workflows/docker-publish.yml`, and
`k8s/`. Dev builds do not publish the production `latest` tag.

The workflow uses the repository's temporary `GITHUB_TOKEN` to publish the image
and commit the deployment tag. Its bot commit does not start another build.
Superseded builds skip the deployment commit, and concurrency cancels older runs.
