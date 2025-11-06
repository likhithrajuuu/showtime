# 1. Use the SAME Java version as your pom.xml (Java 17)
#    We use 'alpine' to keep the image small
FROM openjdk:17-jdk

WORKDIR /app

# 2. Copy the correct .jar file.
#    Our Jenkins build runs from the root, so the path is 'showtime-backend/target/*.jar'
#    We copy it and rename it to 'app.jar' to make the ENTRYPOINT simple.
COPY target/*.jar app.jar

EXPOSE 8080

# 3. Run the 'app.jar' file we just copied
ENTRYPOINT ["java", "-jar", "app.jar"]