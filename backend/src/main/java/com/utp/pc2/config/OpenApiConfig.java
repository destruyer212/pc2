package com.utp.pc2.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Value("${app.openapi.server-url:}")
    private String serverUrl;

    @Bean
    public OpenAPI pc2OpenAPI() {
        OpenAPI openAPI = new OpenAPI()
                .info(new Info()
                        .title("PC2 UTP - API REST")
                        .description("""
                                API del examen PC2 - Desarrollo Web.
                                Módulos: Cafetería, Incidencias, Cursos y Tareas.
                                Base de datos: PostgreSQL (Supabase).
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Universidad Tecnológica del Perú")
                                .email("soporte@utp.edu.pe")));

        if (serverUrl != null && !serverUrl.isBlank()) {
            openAPI.servers(List.of(new Server().url(serverUrl).description("Render / Producción")));
        }

        return openAPI;
    }
}
