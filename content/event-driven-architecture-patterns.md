---
title: Event-Driven Architecture Patterns for Modern Applications
slug: event-driven-architecture-patterns
description: Explore event-driven architecture patterns and learn how to build scalable, decoupled systems using events, message brokers, and event sourcing. Guide from kothapallisandeep on SandyTech.
imageUrl: https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: Architecture
date: 2024-04-05
readTime: 14 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "sandytech", "sandytech org", "AI automation", "Idea to MVP", "event driven architecture", "EDA", "pub/sub", "event sourcing", "message brokers", "distributed systems", "microservices"]
hashtags: ["#EventDriven", "#EDA", "#PubSub", "#EventSourcing", "#Microservices", "#DistributedSystems", "#SandyTech", "#KothapalliSandeep"]
---

# Event-Driven Architecture Patterns for Modern Applications

Event-Driven Architecture (EDA) is a design pattern that promotes the production, detection, consumption, and reaction to events. This architecture is particularly well-suited for distributed systems, microservices, and applications that need to respond to changes in real-time.

## What is Event-Driven Architecture?

Event-Driven Architecture is a software architecture pattern that uses events to trigger and communicate between decoupled services. An event is a significant change in state that something has happened.

### Key Benefits

- **Loose Coupling**: Services communicate through events, not direct calls
- **Scalability**: Services can scale independently
- **Resilience**: Failure in one service doesn't cascade
- **Flexibility**: Easy to add new event consumers

## Core Concepts

### Events

Events represent something that has happened in the system:

```csharp
public abstract class DomainEvent
{
    public Guid EventId { get; } = Guid.NewGuid();
    public DateTime OccurredOn { get; } = DateTime.UtcNow;
    public string EventType => GetType().Name;
}

public class OrderCreatedEvent : DomainEvent
{
    public Guid OrderId { get; }
    public Guid CustomerId { get; }
    public decimal TotalAmount { get; }
    
    public OrderCreatedEvent(Guid orderId, Guid customerId, decimal totalAmount)
    {
        OrderId = orderId;
        CustomerId = customerId;
        TotalAmount = totalAmount;
    }
}
```

### Event Producers

Services that generate and publish events:

```csharp
public class OrderService
{
    private readonly IEventPublisher _eventPublisher;
    
    public async Task<Order> CreateOrder(CreateOrderRequest request)
    {
        var order = new Order
        {
            Id = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            Items = request.Items,
            TotalAmount = CalculateTotal(request.Items)
        };
        
        // Save order
        await _orderRepository.SaveAsync(order);
        
        // Publish event
        await _eventPublisher.PublishAsync(new OrderCreatedEvent(
            order.Id,
            order.CustomerId,
            order.TotalAmount
        ));
        
        return order;
    }
}
```

### Event Consumers

Services that react to events:

```csharp
public class InventoryService : IEventHandler<OrderCreatedEvent>
{
    private readonly IInventoryRepository _inventoryRepository;
    
    public async Task HandleAsync(OrderCreatedEvent @event)
    {
        // Update inventory based on order
        foreach (var item in @event.OrderItems)
        {
            await _inventoryRepository.ReserveAsync(
                item.ProductId,
                item.Quantity
            );
        }
    }
}
```

## Event-Driven Patterns

### 1. Pub/Sub Pattern

Publishers send messages to topics, and subscribers receive messages from topics:

```csharp
// Publisher
public class OrderEventPublisher
{
    private readonly IMessageBus _messageBus;
    
    public async Task PublishOrderCreated(Order order)
    {
        var message = new OrderCreatedMessage
        {
            OrderId = order.Id,
            CustomerId = order.CustomerId,
            TotalAmount = order.TotalAmount
        };
        
        await _messageBus.PublishAsync("orders.created", message);
    }
}

// Subscriber
public class OrderCreatedHandler : IMessageHandler<OrderCreatedMessage>
{
    public async Task HandleAsync(OrderCreatedMessage message)
    {
        // Process order created event
        await SendConfirmationEmail(message.CustomerId);
        await UpdateInventory(message.OrderId);
    }
}
```

### 2. Event Sourcing

Store all changes as a sequence of events:

```csharp
public class OrderAggregate
{
    private readonly List<DomainEvent> _events = new();
    
    public Guid Id { get; private set; }
    public OrderStatus Status { get; private set; }
    
    public void CreateOrder(Guid customerId, List<OrderItem> items)
    {
        Apply(new OrderCreatedEvent(Id, customerId, items));
    }
    
    public void ConfirmOrder()
    {
        if (Status != OrderStatus.Draft)
            throw new InvalidOperationException();
        
        Apply(new OrderConfirmedEvent(Id));
    }
    
    private void Apply(DomainEvent @event)
    {
        _events.Add(@event);
        When(@event);
    }
    
    private void When(OrderCreatedEvent @event)
    {
        Id = @event.OrderId;
        Status = OrderStatus.Draft;
    }
    
    private void When(OrderConfirmedEvent @event)
    {
        Status = OrderStatus.Confirmed;
    }
    
    public IReadOnlyCollection<DomainEvent> GetUncommittedEvents() => _events;
}
```

### 3. CQRS with Events

Separate read and write models using events:

```csharp
// Write side - Command
public class CreateOrderCommandHandler
{
    private readonly IOrderRepository _orderRepository;
    private readonly IEventStore _eventStore;
    
    public async Task Handle(CreateOrderCommand command)
    {
        var order = new OrderAggregate();
        order.CreateOrder(command.CustomerId, command.Items);
        
        var events = order.GetUncommittedEvents();
        await _eventStore.SaveEventsAsync(order.Id, events);
    }
}

// Read side - Query
public class OrderProjectionHandler : IEventHandler<OrderCreatedEvent>
{
    private readonly IOrderReadRepository _readRepository;
    
    public async Task HandleAsync(OrderCreatedEvent @event)
    {
        var orderView = new OrderView
        {
            OrderId = @event.OrderId,
            CustomerId = @event.CustomerId,
            TotalAmount = @event.TotalAmount,
            Status = "Created"
        };
        
        await _readRepository.SaveAsync(orderView);
    }
}
```

## Message Brokers

### Azure Service Bus

```csharp
public class AzureServiceBusEventPublisher : IEventPublisher
{
    private readonly ServiceBusClient _client;
    
    public async Task PublishAsync<T>(T @event) where T : DomainEvent
    {
        var sender = _client.CreateSender(GetTopicName<T>());
        var message = new ServiceBusMessage(JsonSerializer.Serialize(@event))
        {
            MessageId = @event.EventId.ToString(),
            Subject = @event.EventType
        };
        
        await sender.SendMessageAsync(message);
    }
}
```

### RabbitMQ

```csharp
public class RabbitMqEventPublisher : IEventPublisher
{
    private readonly IConnection _connection;
    
    public async Task PublishAsync<T>(T @event) where T : DomainEvent
    {
        using var channel = _connection.CreateModel();
        channel.ExchangeDeclare("domain-events", ExchangeType.Topic);
        
        var message = JsonSerializer.Serialize(@event);
        var body = Encoding.UTF8.GetBytes(message);
        
        channel.BasicPublish(
            exchange: "domain-events",
            routingKey: GetRoutingKey<T>(),
            body: body
        );
    }
}
```

## Best Practices

### 1. Event Design

- **Make events immutable**: Events represent past occurrences
- **Use clear naming**: Event names should clearly describe what happened
- **Include context**: Events should contain enough information for consumers
- **Version events**: Support multiple versions of events

```csharp
public class OrderCreatedEventV2 : DomainEvent
{
    public Guid OrderId { get; }
    public Guid CustomerId { get; }
    public decimal TotalAmount { get; }
    public string Currency { get; } // New field in V2
    public List<OrderItemDto> Items { get; }
}
```

### 2. Idempotency

Ensure event handlers are idempotent:

```csharp
public class OrderCreatedHandler : IEventHandler<OrderCreatedEvent>
{
    private readonly IProcessedEventsRepository _processedEvents;
    
    public async Task HandleAsync(OrderCreatedEvent @event)
    {
        // Check if already processed
        if (await _processedEvents.ExistsAsync(@event.EventId))
            return;
        
        // Process event
        await ProcessOrder(@event);
        
        // Mark as processed
        await _processedEvents.SaveAsync(@event.EventId);
    }
}
```

### 3. Error Handling

Implement retry and dead letter queues:

```csharp
public class ResilientEventHandler<T> : IEventHandler<T> where T : DomainEvent
{
    private readonly IEventHandler<T> _innerHandler;
    private readonly ILogger<ResilientEventHandler<T>> _logger;
    
    public async Task HandleAsync(T @event)
    {
        var retryCount = 0;
        const int maxRetries = 3;
        
        while (retryCount < maxRetries)
        {
            try
            {
                await _innerHandler.HandleAsync(@event);
                return;
            }
            catch (Exception ex)
            {
                retryCount++;
                _logger.LogWarning(ex, 
                    "Failed to handle event {EventId}, retry {RetryCount}/{MaxRetries}",
                    @event.EventId, retryCount, maxRetries);
                
                if (retryCount >= maxRetries)
                {
                    await SendToDeadLetterQueue(@event, ex);
                    throw;
                }
                
                await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, retryCount)));
            }
        }
    }
}
```

## Monitoring and Observability

Track event flow and processing:

```csharp
public class InstrumentedEventPublisher : IEventPublisher
{
    private readonly IEventPublisher _inner;
    private readonly IMetrics _metrics;
    
    public async Task PublishAsync<T>(T @event) where T : DomainEvent
    {
        using var activity = Activity.StartActivity("PublishEvent");
        activity?.SetTag("event.type", typeof(T).Name);
        
        try
        {
            await _inner.PublishAsync(@event);
            _metrics.IncrementCounter("events.published", 
                new[] { ("type", typeof(T).Name) });
        }
        catch (Exception ex)
        {
            _metrics.IncrementCounter("events.publish.failed",
                new[] { ("type", typeof(T).Name) });
            throw;
        }
    }
}
```

## When to Use Event-Driven Architecture

Event-Driven Architecture is ideal when:

- You need real-time responsiveness
- Systems are distributed across multiple services
- You want loose coupling between components
- You need to handle high volumes of events
- Multiple systems need to react to the same events

## Conclusion

Event-Driven Architecture provides a powerful pattern for building scalable, decoupled systems. By using events to communicate between services, you can create flexible systems that can evolve and scale independently. Proper implementation requires careful event design, idempotency handling, and robust error handling.

