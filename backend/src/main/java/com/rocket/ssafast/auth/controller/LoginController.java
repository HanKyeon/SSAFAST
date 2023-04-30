package com.rocket.ssafast.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}

	@GetMapping("/target-page")
	public ModelAndView targetPage() {
		return new ModelAndView("target-page");
	}
}