package com.example.TheHeathensStore;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

import com.example.TheHeathensStore.config.EnviromentConfig;

@SpringBootApplication
public class TheHeathensStoreApplications {
	public static void main(String[] args) {
		SpringApplicationBuilder application = new SpringApplicationBuilder(TheHeathensStoreApplications.class);
		application.initializers(new EnviromentConfig());
		application.run(args);
	}
}
