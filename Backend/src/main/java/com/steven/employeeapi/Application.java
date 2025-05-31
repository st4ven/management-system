package com.steven.employeeapi;

import com.steven.employeeapi.s3.S3Buckets;
import com.steven.employeeapi.s3.S3Service;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

//	@Bean
//	CommandLineRunner runner() {
//		return args -> {
//			// testBucketUploadandDownload(s3Service, s3Buckets);
//		};
//	}

	private static void testBucketUploadandDownload(S3Service s3Service, S3Buckets s3Buckets) {
		s3Service.putObject(s3Buckets.getEmployee(),
				"foo",
				"Hello World".getBytes());

		byte[] obj = s3Service.getObject(s3Buckets.getEmployee(),
				"foo");

		System.out.println("Hooray: " + new String(obj));
	}
}
