package com.project.showtime;

import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI showtimeApi() {
        return new OpenAPI()
                .components(new Components().addSecuritySchemes("basicAuth",
                        new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("basic")))
                .addSecurityItem(new SecurityRequirement().addList("basicAuth"))
                .info(new Info().title("Showtime API")
                        .version("1.0.0")
                        .description("API Endpoint Decoration")
                );
    }
}