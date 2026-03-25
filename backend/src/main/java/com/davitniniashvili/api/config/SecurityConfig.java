package com.davitniniashvili.api.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${admin.username:#{null}}")
    private String adminUsername;

    @Value("${admin.password.hash:#{null}}")
    private String adminPasswordHash;

    @Value("${spring.web.cors.allowed-origins:http://localhost:5173,http://localhost:3000}")
    private String allowedOrigins;

    // Addition #2: fail-fast on missing env vars
    @PostConstruct
    public void validateAdminCredentials() {
        if (adminUsername == null || adminUsername.isBlank()) {
            throw new IllegalStateException(
                "FATAL: admin.username is not configured. " +
                "Set the ADMIN_USERNAME environment variable before starting the application."
            );
        }
        if (adminPasswordHash == null || adminPasswordHash.isBlank()) {
            throw new IllegalStateException(
                "FATAL: admin.password.hash is not configured. " +
                "Set the ADMIN_PASSWORD_HASH environment variable before starting the application."
            );
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        return username -> {
            if (!adminUsername.equals(username)) {
                throw new org.springframework.security.core.userdetails.UsernameNotFoundException(username);
            }
            return User.builder()
                    .username(adminUsername)
                    .password(adminPasswordHash)
                    .roles("ADMIN")
                    .build();
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService uds,
                                                       PasswordEncoder encoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(uds);
        provider.setPasswordEncoder(encoder);
        return new ProviderManager(provider);
    }

    // Addition #1: centralized CORS — covers ALL controllers
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(allowedOrigins.split(",")));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // CSRF: enabled, cookie-based — frontend reads XSRF-TOKEN cookie
        CookieCsrfTokenRepository csrfRepo = CookieCsrfTokenRepository.withHttpOnlyFalse();
        CsrfTokenRequestAttributeHandler csrfHandler = new CsrfTokenRequestAttributeHandler();
        csrfHandler.setCsrfRequestAttributeName(null);

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf
                .csrfTokenRepository(csrfRepo)
                .csrfTokenRequestHandler(csrfHandler)
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            .authorizeHttpRequests(auth -> auth
                // Auth bootstrap — permitAll so CSRF cookie is issued before login
                .requestMatchers("/api/admin/auth/me").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/admin/auth/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/admin/auth/logout").permitAll()

                // Explicit public whitelist
                .requestMatchers("/api/content/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/player/awards").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/player/highlights").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/shop/products/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/orders").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/orders/**").permitAll()

                // Lock all /api/admin/** to ROLE_ADMIN
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // All other requests — permit by default (unlike previous strict fallback)
                .anyRequest().permitAll()
            )
            // 401 response — JSON, no redirect
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write("{\"error\":\"Unauthorized\",\"authenticated\":false}");
                })
                // 403 response — JSON
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setStatus(HttpStatus.FORBIDDEN.value());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write("{\"error\":\"Forbidden\"}");
                })
            )
            // Disable form login and HTTP Basic — JSON API only
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}
