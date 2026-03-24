 package com.example.TheHeathensStore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;


@SpringBootApplication
public class TheHeathensStoreApplications {
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(TheHeathensStoreApplications.class, args);
//
//		String s = context.getBean("productDAO",ProductDAO.class).get(4).getDescription();
//		try {
//			Output.write(s);
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}

	}
}
