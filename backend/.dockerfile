# Step 1: Use Maven image to build the project
FROM maven:3.9.3-jdk-19 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Step 2: Use lightweight JDK image for running
FROM eclipse-temurin:19-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=$PORT"]