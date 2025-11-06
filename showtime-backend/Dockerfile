# Use the standard Eclipse Temurin (OpenJDK) 17 image
FROM openjdk:17-jdk-alpine


WORKDIR /app

# Copy the .jar file that Jenkins already built
# from the workspace (build context) into the container.
COPY showtime-backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]