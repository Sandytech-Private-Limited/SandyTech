---
title: "Securing CI/CD Pipelines: GitHub Actions & Azure DevOps Best Practices"
slug: cicd-security-github-actions-azure-devops
description: Learn how senior architects at SandyTech (kothapallisandeep) harden CI/CD pipelines using GitHub Actions and Azure DevOps. Covers OIDC authentication, secret scanning, SLSA supply chain security, branch protection, and least-privilege service principals — practical security patterns from 13+ years of cloud-native delivery at sandytech.
imageUrl: https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: DevOps
date: 2025-04-20
readTime: 10 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "sandytech", "CI/CD security", "GitHub Actions", "Azure DevOps", "OIDC", "secret scanning", "SLSA", "supply chain security", "branch protection", "DevSecOps", "least privilege", "cloud-native"]
hashtags: ["#DevSecOps", "#GitHubActions", "#AzureDevOps", "#CICD", "#OIDC", "#SLSA", "#SandyTech", "#KothapalliSandeep", "#CloudSecurity"]
---

# Securing CI/CD Pipelines: GitHub Actions & Azure DevOps Best Practices

After 13+ years of building and shipping cloud-native systems, I can tell you the most common vector I see in post-incident reviews is not misconfigured infrastructure — it is the CI/CD pipeline itself. A compromised pipeline is a direct line to production. At SandyTech, every engagement we take on includes a pipeline security review as part of the architecture phase, not an afterthought.

This post covers the patterns I apply across every project, whether it is GitHub Actions, Azure DevOps, or a hybrid.

---

## 1. Kill Long-Lived Credentials with OIDC

The single biggest improvement you can make today costs zero money and takes about 20 minutes. Stop storing cloud credentials as static secrets in your CI system. Use **OpenID Connect (OIDC)** to exchange a short-lived JWT from GitHub/ADO for a cloud token at runtime.

### GitHub Actions → Azure (no client secret required)

```yaml
# .github/workflows/deploy.yml
permissions:
  id-token: write   # Required for OIDC
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: azure/login@v2
        with:
          client-id: ${{ vars.AZURE_CLIENT_ID }}
          tenant-id: ${{ vars.AZURE_TENANT_ID }}
          subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}
          # No client-secret here. Azure trusts the OIDC JWT.
```

On the Azure side, create a federated credential on your App Registration pointing to `repo:your-org/your-repo:ref:refs/heads/main`. The credential is scoped to a specific branch, so a compromised feature branch cannot deploy to production.

For Azure DevOps, the same principle applies via a **Workload Identity Federation** service connection — tick "Federated" instead of "Secret" when creating the service connection.

---

## 2. Secret Scanning: Defense at Every Layer

Secrets committed to git are effectively public, even in private repos. The attack surface is wide: forked branches, accidental public visibility changes, insider threats.

**Layer 1 — Pre-commit (developer machine)**

```bash
# Install gitleaks as a pre-commit hook
brew install gitleaks

# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.2
    hooks:
      - id: gitleaks
```

**Layer 2 — GitHub Advanced Security**

Enable secret scanning at the org level. Push protection will block a push containing a known secret pattern before it ever reaches the remote. Configure custom patterns for internal tokens (your JWT signing keys, internal API tokens) that GitHub does not natively recognise.

**Layer 3 — Azure DevOps**

ADO does not have built-in secret scanning, but you can add a pipeline step using the same `gitleaks` binary or use Microsoft's **CredScan** task (part of SDL extension):

```yaml
- task: CredScan@3
  inputs:
    toolMajorVersion: 'V2'
    suppressionsFile: 'CredScanSuppressions.json'
```

---

## 3. Branch Protection and Environment Approvals

Deploying to production should require human review, not just a green pipeline. This is table stakes.

**GitHub — Required rules per branch**

- Require pull request reviews (minimum 1, dismiss stale reviews on new commits)
- Require status checks to pass (your CI workflow)
- Restrict who can push directly — no one, not even admins in high-trust environments
- Enable "Do not allow bypassing the above settings"

**Environment-gated deployments in GitHub Actions**

```yaml
jobs:
  deploy-prod:
    environment:
      name: production
      url: https://kothapallisandeep.com
    runs-on: ubuntu-latest
    # This job will pause until a reviewer approves in the GitHub UI
    steps:
      - run: echo "Deploying to production"
```

In Azure DevOps, use **Stage approvals** on your release pipeline or YAML `environment` resource with approval checks. I also add a **Business hours** check on production environments — no automated deploys between midnight and 6 AM.

---

## 4. Dependency Pinning and Supply Chain Attacks (SLSA)

The `tj-actions/changed-files` incident in 2024 was a wake-up call. A widely used GitHub Action was compromised to exfiltrate secrets from thousands of pipelines. The fix is simple: **pin every action to a full commit SHA, not a mutable tag**.

```yaml
# Bad — "v3" tag can be moved
- uses: actions/checkout@v3

# Good — pinned to a specific commit
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

Automate this with Dependabot or Renovate. In your `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      actions:
        patterns: ["*"]
```

**SLSA (Supply-chain Levels for Software Artifacts)**

For your own build artifacts, target SLSA Level 2 as a minimum. This means your build runs on a hosted runner (not self-hosted), and you generate **provenance attestations** for container images:

```yaml
- uses: actions/attest-build-provenance@v1
  with:
    subject-name: ghcr.io/your-org/your-image
    subject-digest: ${{ steps.build.outputs.digest }}
```

---

## 5. Least-Privilege Service Principals

Every CI/CD service principal should be scoped to exactly what the job requires — nothing more.

For a deployment that pushes a container image and updates an AKS deployment:

```bash
# Create a dedicated SP per pipeline/environment
az ad sp create-for-rbac --name "sp-deploy-myapp-prod" --role "" --scopes ""

# Assign only what is needed
az role assignment create \
  --assignee <sp-object-id> \
  --role "AcrPush" \
  --scope /subscriptions/.../resourceGroups/rg-myapp/providers/Microsoft.ContainerRegistry/registries/myacr

az role assignment create \
  --assignee <sp-object-id> \
  --role "Azure Kubernetes Service Cluster User Role" \
  --scope /subscriptions/.../resourceGroups/rg-myapp/providers/Microsoft.ContainerService/managedClusters/aks-myapp
```

Never use `Contributor` at the subscription scope for a deployment SP. I see this constantly on new projects. The blast radius of a compromised token with subscription-level Contributor is devastating.

---

## 6. Audit Logs and Anomaly Detection

Enable Azure Monitor alerts for your ADO organisation and GitHub audit log streaming to a Log Analytics workspace. Alert on:

- New federated credentials added to App Registrations
- Service connection secret regeneration
- Pipeline YAML changes on protected branches
- Any `git push --force` to main

The signal-to-noise ratio is good if you scope alerts tightly. These alerts have caught real issues on client projects — once a contractor's account was used to modify a pipeline YAML outside business hours.

---

## Summary Checklist

| Control | GitHub Actions | Azure DevOps |
|---|---|---|
| No long-lived credentials | OIDC federated identity | Workload Identity Federation |
| Secret scanning | GitHub Advanced Security + gitleaks | CredScan + gitleaks |
| Deployment gates | Environment protection rules | Stage approvals + business hours check |
| Dependency pinning | Dependabot SHA pinning | Azure Artifacts feed policies |
| Least-privilege | SP per pipeline, scoped roles | SP per pipeline, scoped roles |
| Supply chain | SLSA provenance attestations | SBOM generation |

Building secure pipelines is not glamorous work, but it is foundational. At SandyTech, we bake these controls into the project scaffold so that every MVP we ship starts from a secure baseline, not a debt to pay down later.
