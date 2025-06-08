# NestJS-MinIO File Storage API

A professional and scalable RESTful API built with **NestJS** for managing file storage using **MinIO** object storage and **PostgreSQL** for metadata persistence. This project provides endpoints for uploading, downloading, and deleting files in MinIO, while storing file metadata in a PostgreSQL database for efficient tracking and retrieval.

## Features
- **File Management**: Upload, download, and delete files in MinIO with corresponding metadata stored in PostgreSQL.
- **Environment Configuration**: Utilizes `@nestjs/config` for managing MinIO and database settings via `.env` files.
- **Customizable Base Path**: Supports a configurable `startPath` (e.g., `/uploads`) for organizing files in MinIO buckets.
- **Database Integration**: Stores file metadata (e.g., file name, path, size) in a PostgreSQL `files` model using TypeORM.
- **Easy Deployment**: Includes a `start.bat` script and `docker-compose.yml` for simplified setup and execution.
- **Scalable Architecture**: Built with NestJS for modular, maintainable, and type-safe code.

## Tech Stack
- **NestJS**: Progressive Node.js framework for building efficient server-side applications.
- **MinIO**: High-performance, S3-compatible object storage.
- **PostgreSQL**: Robust relational database for storing file metadata.
- **TypeORM**: ORM for seamless database integration with PostgreSQL.
- **TypeScript**: Ensures type safety and better code maintainability.
- **Docker**: Containerized setup for easy deployment.

## Prerequisites
- Node.js (v16 or higher)
- Yarn package manager
- Docker and Docker Compose (optional, for containerized setup)
- MinIO server (local or remote)
- PostgreSQL database

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/theatefe/nestjs-minio.git
cd nestjs-minio
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Configure Environment Variables
Copy the `.env.example` file to `.env` and update it with your MinIO and PostgreSQL credentials:
```env
# MinIO Configuration
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=your_access_key
MINIO_SECRET_KEY=your_secret_key
MINIO_BUCKET=mybucket
MINIO_START_PATH=/uploads

# PostgreSQL Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=nestjs_minio
```

### 4. Run the Application

#### Option 1: Using Yarn
```bash
yarn start
```

#### Option 2: Using start.bat (Windows)
```bash
./start.bat
```

#### Option 3: Using Docker Compose
```bash
docker-compose up -d
```

The API will be available at `http://localhost:3000` (or the port specified in `.env`).

## API Endpoints
- **POST /files/upload**: Upload a file to MinIO and save its metadata in PostgreSQL.
  - Body: `multipart/form-data` with a `file` field.
  - Response: `{ filePath: string }`
- **GET /files/:fileName**: Download a file from MinIO using its name.
  - Response: File stream or buffer.
- **DELETE /files/:fileName**: Delete a file from MinIO and its metadata from PostgreSQL.
  - Response: `{ message: string }`

## Database Schema
The `files` model in PostgreSQL stores the following metadata:
- `id`: Unique identifier (auto-generated).
- `fileName`: Name of the file stored in MinIO.
- `filePath`: Path of the file in MinIO (includes `startPath`).
- `size`: File size in bytes.
- `createdAt`: Timestamp of file upload.

## Project Structure
```
nestjs-minio/
├── src/
│   ├── files/                # Module for file-related logic
│   ├── minio/                # MinIO service and configuration
│   ├── app.module.ts         # Main application module
├── .env.example              # Example environment file
├── start.bat                 # Windows script for starting the app
├── docker-compose.yml        # Docker Compose configuration
├── README.md                 # Project documentation
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss improvements or bugs.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.