package com.lifenetwork.app;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@RequiredArgsConstructor
@EnableAsync
@EnableCaching
public class LifeNetworkAPPApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifeNetworkAPPApplication.class, args);
    }

}
