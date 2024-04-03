package com.lifenetwork.web;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@RequiredArgsConstructor
@EnableAsync
@EnableCaching
public class LifeNetworkSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifeNetworkSystemApplication.class, args);
    }

}
