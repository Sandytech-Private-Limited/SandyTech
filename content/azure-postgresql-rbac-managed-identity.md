---
title: "Azure PostgreSQL Flexible Server: RBAC & Managed Identity Without Passwords"
slug: azure-postgresql-rbac-managed-identity
description: Learn how kothapallisandeep eliminates database passwords entirely using Azure Managed Identity and Entra ID authentication on PostgreSQL Flexible Server. Covers pg_aad_auth extension, role-based access, Entra ID groups, and .NET DefaultAzureCredential integration — zero-password database access for cloud-native apps.
imageUrl: https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: Cloud
date: 2025-02-28
readTime: 10 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "Azure PostgreSQL", "Managed Identity", "RBAC", "Entra ID", "passwordless database", "pg_aad_auth", "DefaultAzureCredential", "Azure AD authentication", "PostgreSQL Flexible Server", "zero trust"]
hashtags: ["#Azure", "#PostgreSQL", "#ManagedIdentity", "#EntraID", "#ZeroTrust", "#KothapalliSandeep", "#CloudSecurity", "#DotNet"]
---

# Azure PostgreSQL Flexible Server: RBAC & Managed Identity Without Passwords

Database connection strings with embedded passwords are one of the oldest and most preventable security risks in cloud applications. Yet I still see `Password=SuperSecret123!` sitting in app settings on projects that otherwise have mature security postures. Azure PostgreSQL Flexible Server with Entra ID authentication removes this entirely — no passwords, no rotation schedules, no accidental commits to git.

This is how we configure it at on every Azure-hosted project that uses PostgreSQL.

---

## The Architecture

```
App Service / AKS Pod
 └── System-Assigned Managed Identity (or User-Assigned)
 └── Entra ID Token (short-lived, auto-refreshed)
 └── PostgreSQL Flexible Server (pg_aad_auth validates token)
 └── DB Role mapped from Entra ID Group
```

The Managed Identity acquires a token from the IMDS endpoint (instance metadata service) at runtime. PostgreSQL validates this token against Entra ID using the `pg_aad_auth` extension. No password ever exists — there is nothing to leak, rotate, or store.

---

## Step 1: Enable Entra ID Authentication on Flexible Server

```bash
# Set an Entra ID admin at server creation time
az postgres flexible-server create \
 --resource-group rg-myapp-prod \
 --name pg-myapp-prod \
 --location eastus \
 --sku-name Standard_D2s_v3 \
 --storage-size 64 \
 --version 16 \
 --active-directory-auth Enabled \
 --password-auth Disabled # Disable password auth entirely (recommended)

# Or enable Entra ID auth on an existing server
az postgres flexible-server update \
 --resource-group rg-myapp-prod \
 --name pg-myapp-prod \
 --active-directory-auth Enabled
```

Setting `--password-auth Disabled` means no one can connect with a username/password — only Entra ID tokens are accepted. This is the zero-trust posture. If you have existing applications that need time to migrate, set both to `Enabled` temporarily.

**Assign yourself (or a group) as the Entra ID admin:**

```bash
az postgres flexible-server ad-admin create \
 --resource-group rg-myapp-prod \
 --server-name pg-myapp-prod \
 --display-name "PG Admins Group" \
 --object-id <entra-group-object-id>
```

---

## Step 2: Enable the Managed Identity on Your App

**App Service (System-Assigned):**

```bash
az webapp identity assign \
 --resource-group rg-myapp-prod \
 --name app-myapp-prod
# Outputs the principalId — save it
```

**AKS with Workload Identity (preferred for Kubernetes):**

```bash
# Create user-assigned managed identity
az identity create \
 --name id-myapp-prod \
 --resource-group rg-myapp-prod

# Federate it with the Kubernetes service account
az identity federated-credential create \
 --name fc-myapp-aks \
 --identity-name id-myapp-prod \
 --resource-group rg-myapp-prod \
 --issuer <aks-oidc-issuer-url> \
 --subject system:serviceaccount:myapp-ns:myapp-sa
```

---

## Step 3: Grant the Identity Access in PostgreSQL

Connect to the database as the Entra ID admin and create roles for your identities:

```sql
-- Connect as the Entra ID admin via psql with a token
-- (see connection string section below)

-- Create a role for the managed identity
-- The role name must exactly match the identity's display name or app registration name
SELECT * FROM pgaadauth_create_principal('app-myapp-prod', false, false);
-- Parameters: (display_name, is_azure_ad_only, is_superuser)

-- Grant schema permissions
GRANT CONNECT ON DATABASE myappdb TO "app-myapp-prod";
GRANT USAGE ON SCHEMA public TO "app-myapp-prod";
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "app-myapp-prod";
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
 GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO "app-myapp-prod";
```

**Using Entra ID Groups for Role Management**

For environments with multiple apps or multiple team members:

```sql
-- Create a principal for an Entra ID group
SELECT * FROM pgaadauth_create_principal('myapp-db-readwrite', false, false);
-- 'myapp-db-readwrite' is the Entra ID group display name

GRANT CONNECT ON DATABASE myappdb TO "myapp-db-readwrite";
GRANT USAGE ON SCHEMA public TO "myapp-db-readwrite";
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "myapp-db-readwrite";
```

Now you manage database access by adding or removing members from the Entra ID group in Azure Portal — no SQL `GRANT`/`REVOKE` required when an employee joins or leaves.

---

## Step 4: Connecting from .NET with DefaultAzureCredential

The `Azure.Identity` library handles token acquisition transparently across environments — local dev (uses your `az login` session), CI (uses environment variables), and production (uses Managed Identity).

```csharp
// Install: Azure.Identity, Npgsql.EntityFrameworkCore.PostgreSQL
using Azure.Identity;
using Azure.Core;

public static class DatabaseExtensions
{
 public static IServiceCollection AddPostgresWithManagedIdentity(
 this IServiceCollection services,
 IConfiguration config)
 {
 services.AddDbContext<AppDbContext>(options =>
 {
 var connectionString = config["ConnectionStrings:Postgres"];
 // connectionString = "Host=pg-myapp-prod.postgres.database.azure.com;
 // Database=myappdb;Username=app-myapp-prod;Ssl Mode=Require;"
 // Note: NO Password= in the connection string

 options.UseNpgsql(connectionString, npgsqlOptions =>
 {
 npgsqlOptions.UseAzureAdAuthentication(
 new DefaultAzureCredential());
 });
 });

 return services;
 }
}
```

`DefaultAzureCredential` tries a chain of credential sources in order:
1. `AZURE_CLIENT_ID` / `AZURE_CLIENT_SECRET` environment variables (CI/CD)
2. Workload Identity (AKS)
3. Managed Identity (App Service, Azure Functions)
4. Azure CLI (`az login`) — local development

This means the same code works in every environment with zero changes.

**Connection string in `appsettings.json`:**

```json
{
 "ConnectionStrings": {
 "Postgres": "Host=pg-myapp-prod.postgres.database.azure.com;Database=myappdb;Username=app-myapp-prod;Ssl Mode=Require;Trust Server Certificate=false"
 }
}
```

There is no `Password` field. If someone extracts this connection string, they cannot connect without a valid Entra ID token bound to the identity.

---

## Step 5: Local Development Access

Developers on the team need access too. Add each developer's Entra ID account as a principal:

```sql
SELECT * FROM pgaadauth_create_principal('developer@yourcompany.com', false, false);
GRANT myapp-db-readwrite TO "developer@yourcompany.com";
```

Or better — add them to the `myapp-db-readwrite` Entra ID group and let PostgreSQL resolve group membership at connection time.

Connecting via psql locally:

```bash
# Get a token via Azure CLI
TOKEN=$(az account get-access-token \
 --resource-type oss-rdbms \
 --query accessToken -o tsv)

PGPASSWORD=$TOKEN psql \
 "host=pg-myapp-prod.postgres.database.azure.com \
 dbname=myappdb \
 user=developer@yourcompany.com \
 sslmode=require"
```

Use a shell alias or a script to wrap this — the token is short-lived (60 minutes) so developers will need to refresh it periodically.

---

## Common Issues and Solutions

**"pg_aad_auth extension not found"**
The extension is pre-installed on Flexible Server but not auto-loaded. Add it via server parameters:

```bash
az postgres flexible-server parameter set \
 --resource-group rg-myapp-prod \
 --server-name pg-myapp-prod \
 --name shared_preload_libraries \
 --value "pg_aad_auth"
```

A server restart is required.

**"role does not exist" error**
The role name must exactly match the Managed Identity's display name (not its client ID). Check with `az identity show --name id-myapp-prod --resource-group rg-myapp-prod --query name`.

**Token expiry in long-running apps**
Npgsql with `UseAzureAdAuthentication` handles token refresh automatically at connection open. For raw ADO.NET or connection pool edge cases, implement a `PeriodicTimer` to refresh the connection pool every 45 minutes.

---

## Why This Matters

On a recent project, we went through a security audit. The auditor specifically asked about database credential rotation. The answer was "there are no credentials to rotate" — that is a conversation-ender in the best possible way. Managed Identity authentication is not just a security improvement; it eliminates an entire category of operational burden.
