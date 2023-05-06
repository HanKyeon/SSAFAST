package com.rocket.ssafast.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoConfig {
	@Value("${spring.data.mongodb.url}")
	private String connectionUrl;

	@Bean
	public MongoDatabaseFactory mongoDatabaseFactory() {
		return new SimpleMongoClientDatabaseFactory(connectionUrl);
	}

	@Bean
	public MongoTemplate mongoTemplate() {
		return new MongoTemplate(mongoDatabaseFactory());
	}
}
