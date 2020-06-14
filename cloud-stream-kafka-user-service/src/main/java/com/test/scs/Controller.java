package com.test.scs;

import com.test.scs.model.User;
import com.test.scs.msg.Producer;
import com.test.scs.service.UserService;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class Controller {

	private UserService userService;

	public Controller(UserService userService) {

		super();
		this.userService = userService;
	}

	@PostMapping(value = "/api/sendUser")
	public String sendUser(@RequestBody User payload) {
		return userService.send(payload);
	}


	/*// get the String message via HTTP, publish it to broker using spring cloud stream
	@RequestMapping(value = "/sendMessage/string", method = RequestMethod.POST)
	public String publishMessageString(@RequestBody String payload) {

		// send message to channel
		producer.getMysource()
			.output()
			.send(MessageBuilder.withPayload(payload)
				.setHeader("type", "string")
				.build());

		return "success";
	}*/

	//    -------------- WebSocket API ----------------
	@MessageMapping("/sendMessage")
	@SendTo("/test/group")
	public User broadcastGroupMessage(@Payload User user) {
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
