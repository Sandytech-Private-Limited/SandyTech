---
title: Clean Architecture in .NET - Building Maintainable Applications
slug: clean-architecture-dotnet
description: Learn how to implement Clean Architecture principles in .NET applications to create maintainable, testable, and scalable software solutions. Expert insights from kothapallisandeep on SandyTech.
imageUrl: https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
category: Architecture
date: 2024-04-10
readTime: 15 min read
keywords: ["kothapallisandeep", "sandeepkothapalli", "sandytech", "sandytech org", "AI automation", "Idea to MVP", "clean architecture", ".NET", "software design", "SOLID principles", "dependency inversion", "testability", "maintainability"]
hashtags: ["#CleanArchitecture", "#DotNet", "#SoftwareDesign", "#SOLID", "#Architecture", "#SandyTech", "#KothapalliSandeep", "#IdeaToMVP"]
---

# Clean Architecture in .NET - Building Maintainable Applications

Clean Architecture, popularized by Robert C. Martin (Uncle Bob), is a software architecture pattern that emphasizes separation of concerns and independence from frameworks, UI, and databases. This guide shows how to implement Clean Architecture in .NET applications.

## What is Clean Architecture?

Clean Architecture organizes code into layers with clear dependencies, ensuring that:

- **Business logic is independent** of frameworks, UI, and databases
- **Dependencies point inward** toward the core business logic
- **Frameworks are tools**, not the foundation of your application
- **Testability** is built-in from the start

## The Dependency Rule

The fundamental rule of Clean Architecture is the **Dependency Rule**: source code dependencies can only point inward. Nothing in an inner circle can know anything about something in an outer circle.

```
┌─────────────────────────────────────┐
│         Frameworks & Drivers        │  ← Web, DB, External Services
├─────────────────────────────────────┤
│      Interface Adapters             │  ← Controllers, Gateways, Presenters
├─────────────────────────────────────┤
│         Use Cases                    │  ← Application Business Rules
├─────────────────────────────────────┤
│         Entities                     │  ← Enterprise Business Rules
└─────────────────────────────────────┘
```

## Project Structure

A typical Clean Architecture solution in .NET:

```
CleanArchitecture/
├── Domain/                          # Core business entities
│   ├── Entities/
│   ├── ValueObjects/
│   ├── Interfaces/
│   └── Exceptions/
├── Application/                      # Use cases and business logic
│   ├── UseCases/
│   ├── Interfaces/
│   ├── DTOs/
│   └── Mappings/
├── Infrastructure/                   # External concerns
│   ├── Persistence/
│   ├── Messaging/
│   └── ExternalServices/
└── WebAPI/                           # Presentation layer
    ├── Controllers/
    ├── Middleware/
    └── Program.cs
```

## Domain Layer

The innermost layer containing enterprise business rules:

```csharp
// Domain/Entities/Order.cs
namespace Domain.Entities;

public class Order
{
    public Guid Id { get; private set; }
    public Guid CustomerId { get; private set; }
    public OrderStatus Status { get; private set; }
    public Money TotalAmount { get; private set; }
    private readonly List<OrderItem> _items = new();
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();
    
    public Order(Guid customerId)
    {
        Id = Guid.NewGuid();
        CustomerId = customerId;
        Status = OrderStatus.Draft;
        TotalAmount = Money.Zero;
    }
    
    public void AddItem(Product product, int quantity)
    {
        if (Status != OrderStatus.Draft)
            throw new InvalidOperationException("Cannot modify confirmed order");
        
        var item = new OrderItem(product.Id, product.Name, quantity, product.Price);
        _items.Add(item);
        RecalculateTotal();
    }
    
    public void Confirm()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Cannot confirm empty order");
        
        Status = OrderStatus.Confirmed;
    }
    
    private void RecalculateTotal()
    {
        TotalAmount = new Money(
            _items.Sum(i => i.Subtotal.Amount),
            "USD"
        );
    }
}

// Domain/ValueObjects/Money.cs
namespace Domain.ValueObjects;

public class Money : ValueObject
{
    public decimal Amount { get; }
    public string Currency { get; }
    
    public Money(decimal amount, string currency)
    {
        if (amount < 0)
            throw new ArgumentException("Amount cannot be negative");
        
        Amount = amount;
        Currency = currency ?? throw new ArgumentNullException(nameof(currency));
    }
    
    public static Money Zero(string currency) => new(0, currency);
    
    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Amount;
        yield return Currency;
    }
}
```

## Application Layer

Contains use cases and application-specific business rules:

```csharp
// Application/Interfaces/IOrderRepository.cs
namespace Application.Interfaces;

public interface IOrderRepository
{
    Task<Order> GetByIdAsync(Guid id);
    Task AddAsync(Order order);
    Task UpdateAsync(Order order);
}

// Application/UseCases/CreateOrder/CreateOrderCommand.cs
namespace Application.UseCases.CreateOrder;

public record CreateOrderCommand(
    Guid CustomerId,
    List<OrderItemDto> Items
) : IRequest<OrderDto>;

// Application/UseCases/CreateOrder/CreateOrderHandler.cs
namespace Application.UseCases.CreateOrder;

public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, OrderDto>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;
    
    public CreateOrderHandler(
        IOrderRepository orderRepository,
        IProductRepository productRepository,
        IUnitOfWork unitOfWork)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
    }
    
    public async Task<OrderDto> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var order = new Order(request.CustomerId);
        
        foreach (var itemDto in request.Items)
        {
            var product = await _productRepository.GetByIdAsync(itemDto.ProductId);
            if (product == null)
                throw new ProductNotFoundException(itemDto.ProductId);
            
            order.AddItem(product, itemDto.Quantity);
        }
        
        order.Confirm();
        
        await _orderRepository.AddAsync(order);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        
        return new OrderDto
        {
            Id = order.Id,
            CustomerId = order.CustomerId,
            Status = order.Status.ToString(),
            TotalAmount = order.TotalAmount.Amount,
            Items = order.Items.Select(i => new OrderItemDto
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                Price = i.Price.Amount
            }).ToList()
        };
    }
}
```

## Infrastructure Layer

Implements interfaces defined in the Application layer:

```csharp
// Infrastructure/Persistence/Repositories/OrderRepository.cs
namespace Infrastructure.Persistence.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly ApplicationDbContext _context;
    
    public OrderRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<Order> GetByIdAsync(Guid id)
    {
        return await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);
    }
    
    public async Task AddAsync(Order order)
    {
        await _context.Orders.AddAsync(order);
    }
    
    public Task UpdateAsync(Order order)
    {
        _context.Orders.Update(order);
        return Task.CompletedTask;
    }
}

// Infrastructure/Persistence/ApplicationDbContext.cs
namespace Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }
    
    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
```

## Presentation Layer

The outermost layer containing controllers and API configuration:

```csharp
// WebAPI/Controllers/OrdersController.cs
namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IMediator _mediator;
    
    public OrdersController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder(
        [FromBody] CreateOrderCommand command)
    {
        var order = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrder(Guid id)
    {
        var query = new GetOrderQuery(id);
        var order = await _mediator.Send(query);
        
        if (order == null)
            return NotFound();
        
        return order;
    }
}

// WebAPI/Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Application layer
builder.Services.AddApplication();

// Infrastructure layer
builder.Services.AddInfrastructure(builder.Configuration);

// MediatR for CQRS
builder.Services.AddMediatR(typeof(CreateOrderHandler));

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## Dependency Injection Setup

```csharp
// Application/ApplicationServiceCollectionExtensions.cs
namespace Application;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(typeof(ApplicationServiceCollectionExtensions));
        services.AddAutoMapper(typeof(ApplicationServiceCollectionExtensions));
        return services;
    }
}

// Infrastructure/InfrastructureServiceCollectionExtensions.cs
namespace Infrastructure;

public static class InfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
        
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        
        return services;
    }
}
```

## Testing

Clean Architecture makes testing easier:

```csharp
// Application.Tests/UseCases/CreateOrderHandlerTests.cs
public class CreateOrderHandlerTests
{
    [Fact]
    public async Task Handle_ValidCommand_CreatesOrder()
    {
        // Arrange
        var orderRepository = new Mock<IOrderRepository>();
        var productRepository = new Mock<IProductRepository>();
        var unitOfWork = new Mock<IUnitOfWork>();
        
        var product = new Product(Guid.NewGuid(), "Test Product", new Money(10, "USD"));
        productRepository.Setup(r => r.GetByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(product);
        
        var handler = new CreateOrderHandler(
            orderRepository.Object,
            productRepository.Object,
            unitOfWork.Object
        );
        
        var command = new CreateOrderCommand(
            Guid.NewGuid(),
            new List<OrderItemDto>
            {
                new OrderItemDto { ProductId = product.Id, Quantity = 2 }
            }
        );
        
        // Act
        var result = await handler.Handle(command, CancellationToken.None);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(20, result.TotalAmount);
        orderRepository.Verify(r => r.AddAsync(It.IsAny<Order>()), Times.Once);
    }
}
```

## Benefits of Clean Architecture

1. **Independence**: Business logic is independent of frameworks
2. **Testability**: Easy to test business logic without external dependencies
3. **Flexibility**: Easy to swap out frameworks or databases
4. **Maintainability**: Clear separation of concerns
5. **Scalability**: Well-organized code scales better

## Best Practices

1. **Keep domain pure**: No dependencies on external libraries
2. **Use interfaces**: Define contracts in Application layer
3. **Implement in Infrastructure**: Concrete implementations in Infrastructure
4. **Dependency Injection**: Use DI container for all dependencies
5. **CQRS**: Consider separating commands and queries
6. **Validation**: Validate at boundaries (commands, DTOs)

## Conclusion

Clean Architecture provides a solid foundation for building maintainable, testable, and scalable .NET applications. By following the dependency rule and organizing code into clear layers, you can create applications that are easier to understand, test, and evolve over time.

