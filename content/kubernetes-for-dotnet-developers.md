---
title: Kubernetes for .NET Developers - A Practical Guide
slug: kubernetes-for-dotnet-developers
description: Learn how to deploy, manage, and scale .NET applications on Kubernetes with practical examples and best practices. Guide from kothapallisandeep on SandyTech.
imageUrl: https://images.pexels.com/photos/1181299/pexels-photo-1181299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: DevOps
date: 2024-03-25
readTime: 13 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "sandytech", "sandytech org", "AI automation", "Idea to MVP", "Kubernetes", ".NET", "containerization", "Docker", "AKS", "orchestration", "microservices", "DevOps"]
hashtags: ["#Kubernetes", "#DotNet", "#Docker", "#Containerization", "#DevOps", "#AKS", "#SandyTech", "#KothapalliSandeep"]
---

# Kubernetes for .NET Developers - A Practical Guide

Kubernetes has become the standard platform for orchestrating containerized applications. As a .NET developer, understanding Kubernetes is essential for deploying modern, scalable applications. This guide provides practical insights for .NET developers working with Kubernetes.

## Why Kubernetes for .NET?

- **Scalability**: Automatically scale your .NET applications based on demand
- **High Availability**: Self-healing capabilities ensure your apps stay running
- **Portability**: Run the same containers across different cloud providers
- **Resource Efficiency**: Better utilization of infrastructure resources

## Containerizing .NET Applications

### Dockerfile for .NET

```dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Api/Api.csproj", "Api/"]
RUN dotnet restore "Api/Api.csproj"
COPY . .
WORKDIR "/src/Api"
RUN dotnet build "Api.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "Api.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api.dll"]
```

### Multi-stage Builds

Multi-stage builds reduce image size and improve security:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# ... build steps

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
# ... runtime steps
```

## Kubernetes Basics for .NET

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dotnet-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dotnet-api
  template:
    metadata:
      labels:
        app: dotnet-api
    spec:
      containers:
      - name: api
        image: myregistry.azurecr.io/dotnet-api:latest
        ports:
        - containerPort: 8080
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: "Production"
        - name: ConnectionStrings__DefaultConnection
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: connection-string
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: dotnet-api-service
spec:
  selector:
    app: dotnet-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
```

### Health Checks in .NET

```csharp
// Program.cs
builder.Services.AddHealthChecks()
    .AddCheck("liveness", () => HealthCheckResult.Healthy())
    .AddCheck("readiness", () => 
    {
        // Check database connectivity, external dependencies
        return HealthCheckResult.Healthy();
    });

app.MapHealthChecks("/health");
app.MapHealthChecks("/ready", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("readiness")
});
```

## Configuration Management

### ConfigMaps

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  appsettings.json: |
    {
      "Logging": {
        "LogLevel": "Information"
      },
      "AllowedHosts": "*"
    }
```

### Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  connection-string: <base64-encoded-value>
```

### Using in .NET

```csharp
// Load from environment variables (Kubernetes injects these)
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");

// Or use IConfiguration
var connectionString = configuration.GetConnectionString("DefaultConnection");
```

## Scaling

### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: dotnet-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: dotnet-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

## Logging and Monitoring

### Structured Logging

```csharp
// Use Serilog for structured logging
builder.Host.UseSerilog((context, configuration) =>
{
    configuration
        .ReadFrom.Configuration(context.Configuration)
        .Enrich.FromLogContext()
        .WriteTo.Console()
        .WriteTo.Seq("http://seq-service:5341");
});
```

### Metrics

```csharp
// Prometheus metrics
builder.Services.AddSingleton<IMetricsFactory, PrometheusMetricsFactory>();
app.UseMetricServer(); // Exposes /metrics endpoint
```

## Best Practices

1. **Resource Limits**: Always set CPU and memory limits
2. **Health Checks**: Implement liveness and readiness probes
3. **Graceful Shutdown**: Handle SIGTERM signals properly
4. **Stateless Design**: Keep applications stateless
5. **Configuration**: Use ConfigMaps and Secrets, not hardcoded values
6. **Logging**: Use structured logging for better observability
7. **Security**: Run containers as non-root users
8. **Image Optimization**: Use multi-stage builds and minimal base images

## Deployment Strategies

### Rolling Update

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

### Blue-Green Deployment

Use separate deployments and switch traffic between them.

### Canary Deployment

Gradually roll out new versions to a subset of users.

## Troubleshooting

### Common Issues

1. **Pods Not Starting**: Check resource limits and image pull policies
2. **CrashLoopBackOff**: Review logs and health check configurations
3. **Service Not Accessible**: Verify selectors and port mappings
4. **High Memory Usage**: Optimize .NET application memory usage

### Useful Commands

```bash
# View pods
kubectl get pods

# View logs
kubectl logs <pod-name>

# Describe pod
kubectl describe pod <pod-name>

# Execute command in pod
kubectl exec -it <pod-name> -- /bin/bash
```

## Conclusion

Kubernetes provides powerful capabilities for deploying and managing .NET applications at scale. By following these practices and understanding Kubernetes concepts, .NET developers can build robust, scalable cloud-native applications.

