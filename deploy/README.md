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

## Public domain

<https://zawwana.com/> serves the dev portfolio through the dedicated Cloudflare
Tunnel `portfolio-dev`. The proxied apex CNAME targets the tunnel ID recorded in
`cloudflare/portfolio-dev.json`, which also records its remotely managed ingress
configuration. Two cloudflared connectors run on the dev cluster and connect to
the portfolio's ClusterIP service. Argo CD manages their deployment.

The connector token is bootstrapped directly into Kubernetes Secret
`portfolio-dev-tunnel-token` in `web-portfolio-dev`, with key `token`. It is not
stored in Git, and the connector does not need the Cloudflare account API token
or any R2 credentials. If rebuilding the cluster, retrieve the tunnel token from
Cloudflare and restore this Secret before syncing the connector deployment.

Cloudflare manages public HTTPS; no inbound router port forwarding is needed.
The existing production tunnel remains separate.
