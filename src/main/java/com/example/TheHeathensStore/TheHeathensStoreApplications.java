package com.example.TheHeathensStore;

import com.example.TheHeathensStore.config.EnvironmentConfig;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class TheHeathensStoreApplications {
    public static void main(String[] args) {
        SpringApplicationBuilder application = new SpringApplicationBuilder(TheHeathensStoreApplications.class);
        application.initializers(new EnvironmentConfig());
        application.run(args);
    }
}
