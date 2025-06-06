
# Environment Configuration

This directory contains configuration files for different deployment environments. Each subdirectory or file represents a specific environment setup for the application.

## Environments

- **default/**  
  Base configuration shared by all environments. Used as a fallback if a specific value is not set elsewhere.

- **development/**  
  For local development. Typically used when running the application directly on your machine (not in Docker).  
  Example: local database URIs, debug settings.

- **testing/**  
  Used for automated tests and CI pipelines. Runs in Docker to simulate production-like conditions.  
  Example: test database URIs, mock services.

- **staging/**  
  For deployment testing before production. Runs in Docker, closely mirroring the production environment.  
  Example: pre-production database, external service endpoints.

- **production/**  
  Configuration for the live, user-facing application. Runs in Docker.  
  Example: production database URIs, secure credentials, optimized settings.

## Usage

- Place environment-specific configuration files (e.g., `.env`, `config.json`) in the appropriate subdirectory.
- The application should load configuration based on the current environment (e.g., using an `ENV` variable).
- Sensitive information (like credentials) should be managed securely and not committed to version control.