# Realtime Collaborative Task Board

A production-ready, scalable micro event-driven system for realtime task management.

## 🏗 Architecture Overview

The system follows a **Clean Architecture** approach with modular task and board domain logic, separated into:
- **Modules**: Contain domain models, controllers, and services.
- **Events**: Domain events that decouple business logic from infrastructure side-effects.
- **Infrastructure**: Handles external concerns like Redis Pub/Sub, WebSockets (Socket.io), and the database (PostgreSQL).

### Event Flow (PATCH /tasks/:id/move)
1. **Controller**: Validates the request and calls the `TaskService`.
2. **Service**: Updates the PostgreSQL database using **Optimistic Locking** (version field validation).
3. **Domain Event**: `TaskMoved` is dispatched via the AdonisJS Emitter.
4. **Event Dispatcher**: Listens for domain events and publishes a JSON payload to **Redis Pub/Sub**.
5. **WebSocket Server**: All instances subscribed to Redis receive the message and broadcast it via **Socket.io** to clients in the specific board room (`board:{id}`).
6. **Statistics Service**: An independent service listening to Redis updates metrics (e.g., total tasks, completion rates).

## 🚀 Scaling and Deployment

### Horizontal Scaling
- **Redis Pub/Sub**: Acts as the message broker between multiple Node.js instances. Even if a user is connected to Instance A and a task is moved via Instance B, both users receive the update.
- **Socket.io Redis Adapter**: Synchronizes Socket.io rooms across instances.

### AWS ECS Deployment
1. **Dockerize**: Build the multi-stage Docker image using the provided `Dockerfile`.
2. **Infrastructure**: Provision an RDS instance (PostgreSQL) and an ElastiCache instance (Redis).
3. **ECS/Fargate**: Run the Node.js API container. Use a Load Balancer with **Sticky Sessions** (not strictly required if only using WebSockets, but recommended for Socket.io's polling fallback).
4. **Environment Variables**: Use Secrets Manager for DB and Redis credentials.

## 🛠 Running Locally

1. Ensure you have Docker and Node.js installed.
2. Clone the repository.
3. run `npm install`.
4. Start infrastructure: `docker-compose up -d`.
5. Run migrations: `node ace migration:run`.
6. Start dev server: `npm run dev`.

### Example WebSocket Client
```javascript
import { io } from "socket.io-client";
const socket = io("http://localhost:3333");

socket.emit("join_board", 1);
socket.on("task_event", ({ type, payload }) => {
  console.log("New task event:", type, payload);
});
```

## 🧠 Evolution to Microservices
- The `src/modules` structure allows easy extraction of `statistics` or `tasks` into separate Node.js services.
- Replace Redis Pub/Sub with **RabbitMQ** or **Apache Kafka** for more persistent event streaming and guaranteed delivery.
- Move the WebSocket layer into a dedicated **Realtime Gateway** service.
