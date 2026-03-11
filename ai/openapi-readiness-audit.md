# OpenAPI Readiness Audit

## 1. Current State
**Status:** Not Installed.

An audit of `backend/pom.xml` confirms that there are no OpenAPI, Swagger, or `springdoc` dependencies currently installed in the Spring Boot application. The application does not auto-generate API documentation.

## 2. Minimal Requirements for Documentation
To document the current and near-term athlete platform endpoints (e.g., player, stats, awards, highlights, content blocks), the standard and most minimal approach for Spring Boot 3.x is to introduce the `springdoc-openapi` starter.

**Required Dependency (if approved):**
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

**What this provides:**
- Auto-generates the OpenAPI v3 specification based on existing `@RestController` and `@RequestMapping` annotations.
- Provides an interactive Swagger UI out-of-the-box (typically at `http://localhost:8080/swagger-ui.html`).

## 3. Minimal Configuration (Post-Installation)
If the dependency is approved in the future, the only necessary configuration required to separate the active athlete platform scope from the reserved commerce scope would be configuring grouped OpenAPI definitions in an `@Configuration` class, for example:

```java
@Bean
public GroupedOpenApi athletePlatformApi() {
    return GroupedOpenApi.builder()
            .group("Athlete Platform")
            .pathsToMatch("/api/player/**", "/api/content/**")
            .build();
}
```

## 4. Conclusion
**No code or `pom.xml` changes have been made.** The backend is not currently OpenAPI ready. Documenting the endpoints will require adding the `springdoc-openapi-starter-webmvc-ui` dependency. 

**Next Steps Request:**
If OpenAPI documentation is desired, please explicitly approve adding the `springdoc-openapi-starter-webmvc-ui` dependency to `pom.xml`.
