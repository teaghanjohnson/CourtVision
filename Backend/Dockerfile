FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Copy the maven wrapper and pom first so dependency downloads are cached
# in their own layer, separate from source changes
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy the rest of the source and build the jar
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app

# Run as a non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=builder /app/target/nba-fantasy-*.jar app.jar

# Configure these at runtime — never bake credentials into the image:
#   DB_URL, DB_USERNAME, DB_PASSWORD (required)
#   CORS_ALLOWED_ORIGINS, DDL_AUTO (optional, have sane defaults)
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
