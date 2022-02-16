# .NET 6.0 - User Registration and Login Tutorial with Example API
Creating .NET 6.0 API that supports user registration, login with JWT authentication and user CRUD operations
## .NET 6.0 Tutorial Project Structure
The .NET tutorial project is organised into the following folders:

**Authorization**   
Contains the classes responsible for implementing custom JWT authentication and authorization in the API.

**Controllers**   
Define the end points / routes for the API, controller action methods are the entry points into the API for client applications via HTTP requests.

**Migrations**  
Database migration files based on the classes in the `/Entities` folder that are used to automatically create and update the database for the API. Migrations are generated with the Entity Framework Core Tools for the .NET CLI (dotnet ef), the migrations in this example were generated with the following commands for the different database providers.   
* SQLite EF Core Migrations (Windows/MacOS):
```
dotnet ef migrations add InitialCreate --context SqliteDataContext --output-dir Migrations/SqliteMigrations
```
- SQL Server EF Core Migrations (**Windows Command**):    
`set ASPNETCORE_ENVIRONMENT=Production`
```
dotnet ef migrations add InitialCreate --context DataContext --output-dir Migrations/SqlServerMigrations
```
* SQL Server EF Core Migrations (**Windows PowerShell**):   
`$env:ASPNETCORE_ENVIRONMENT="Production"`
```
dotnet ef migrations add InitialCreate --context DataContext --output-dir Migrations/SqlServerMigrations
```
* SQL Server EF Core Migrations (MacOS):
```
ASPNETCORE_ENVIRONMENT=Production dotnet ef migrations add InitialCreate --context DataContext --output-dir Migrations/SqlServerMigrations.
```

**Models**   
Represent *request* and *response* models for controller methods, request models define the parameters for incoming requests, and response models define the data that is returned.

**Services**   
Contain business logic, validation and database access code.

**Entities**   
Represent the application data that is stored in the database.
Entity Framework Core (EF Core) maps relational data from the database to instances of C# entity objects in the application for data management and CRUD operations.

**Helpers**   
Anything that doesn't fit into the above folders.

**Properties**   
Contains the launchSettings.json file that sets the environment (ASPNETCORE_ENVIRONMENT) to Development by default when running the API on your local machine.

## References
- [Inspired from](https://jasonwatmore.com/post/2022/01/07/net-6-user-registration-and-login-tutorial-with-example-api)