# Davit Niniashvili Official Website

Official website for Georgian rugby star Davit Niniashvili featuring biography, statistics, gallery, and merchandise shop.

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.2
- PostgreSQL 15
- Maven

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Axios

### Infrastructure
- Docker & Docker Compose

## Getting Started

### Prerequisites
- Docker Desktop installed
- Git

### Running with Docker

1. Clone the repository
2. Navigate to project directory
3. Run:
```bash
docker-compose up --build
```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api

### Running Locally (Development)

#### Backend
```bash
cd backend
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /api/content/bio` - Player biography
- `GET /api/content/stats` - Career statistics
- `GET /api/content/media` - Gallery media
- `GET /api/shop/products` - All products
- `GET /api/shop/products/{id}` - Single product
- `POST /api/orders` - Create order

## Features

- ✅ Responsive design (Mobile & Desktop)
- ✅ Dark theme with Georgian team colors
- ✅ Animated UI components
- ✅ Player biography & statistics
- ✅ Media gallery
- ✅ E-commerce shop
- ✅ Shopping cart system
- ✅ RESTful API backend
- ✅ PostgreSQL database

## License

© 2024 Davit Niniashvili Official. All rights reserved.
