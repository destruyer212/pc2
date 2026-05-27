package com.utp.pc2.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${app.cors.allowed-origins:http://localhost:4200}")
    private String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                List<String> exactOrigins = new ArrayList<>();
                for (String origin : allowedOrigins.split(",")) {
                    String trimmed = origin.trim();
                    if (!trimmed.isEmpty() && !trimmed.contains("*")) {
                        exactOrigins.add(trimmed);
                    }
                }

                var cors = registry.addMapping("/api/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowedOriginPatterns(
                                "http://localhost:4200",
                                "http://localhost:*",
                                "https://*.vercel.app"
                        );

                if (!exactOrigins.isEmpty()) {
                    cors.allowedOrigins(exactOrigins.toArray(new String[0]));
                }
            }
        };
    }
}
