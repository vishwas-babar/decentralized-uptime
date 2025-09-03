# Database Package

This package contains the database schema and configuration for the project.

## Development Database

To start a PostgreSQL database for development, run the following Docker command:

```bash
docker run -d --name uptime-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=uptime-db -p 12325:5432 postgres:latest
```

This will start a PostgreSQL container with the following connection details:

- **Host**: localhost
- **Port**: 12325
- **Database**: uptime-db
- **Username**: postgres
- **Password**: postgres

**Connection String**: `postgresql://postgres:postgres@localhost:12325/uptime-db`

### Stop the database

To stop the database container:

```bash
docker stop uptime-postgres
```

### Remove the database

To remove the database container:

```bash
docker rm uptime-postgres
```
