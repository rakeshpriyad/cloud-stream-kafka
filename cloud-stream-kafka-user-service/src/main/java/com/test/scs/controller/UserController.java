package com.test.scs.controller;

import com.test.scs.model.User;
import com.test.scs.service.UserService;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {

		super();
		this.userService = userService;
	}

	@PostMapping(value = "/api/sendUser")
	public String sendUser(@RequestBody User payload) {
		return userService.send(payload);
	}

	@MessageMapping("/sendMessage")
	@SendTo("/test/group")
	public User broadcastUser(@Payload User user) {
		//Sending this message to all the subscribers
		return user;
	}

	@MessageMapping("/newUser")
	@SendTo("/test/group")
	public User addUser(@Payload User user,
						   SimpMessageHeaderAccessor headerAccessor) {
		// Add user in web socket session
		headerAccessor.getSessionAttributes().put("username", user.getId());
		return user;
	}
}
