# Stage 1: (This part is ignored by Jenkins, but good for building standalone)
FROM maven:3.8-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the final, small image
FROM openjdk:17-slim-bullseye
WORKDIR /app

# Copy the .jar file that Jenkins built into the container
# This copies from your Jenkins workspace's target folder
COPY showtime-backend/target/*.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# The command to run your application
ENTRYPOINT ["java", "-jar", "app.jar"]