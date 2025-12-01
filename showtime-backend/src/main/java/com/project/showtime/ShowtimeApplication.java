package com.project.showtime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ShowtimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShowtimeApplication.class, args);
	}

}
