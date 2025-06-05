# Docker Setup for MongoDB

This directory contains Docker-related configuration for running MongoDB in development.

- `docker-compose.yml`: Defines the MongoDB service.
- `mongo-init/`: Place any MongoDB initialization scripts here (they will be run automatically on container startup).

## Usage

To start MongoDB:

```bash
docker compose up -d
```

MongoDB will be available at `localhost:27017` with username `root` and password `example`.
