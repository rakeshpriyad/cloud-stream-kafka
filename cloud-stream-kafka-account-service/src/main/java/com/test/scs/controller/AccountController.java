package com.test.scs.controller;

import com.test.scs.model.Account;
import com.test.scs.service.AccountService;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class AccountController {

	private AccountService accountService;

	public AccountController(AccountService accountService) {
		super();
		this.accountService = accountService;
	}

	@PostMapping(value = "/api/sendAcc")
	public String sendAccount(@RequestBody Account payload) {
		return accountService.send(payload);
	}



	//    -------------- WebSocket API ----------------
	@MessageMapping("/sendAcc")
	@SendTo("/test/group")
	public Account broadcastGroupMessage(@Payload Account account) {
		//Sending this message to all the subscribers
		return account;
	}

	@MessageMapping("/newAccount")
	@SendTo("/test/group")
	public Account addUser(@Payload Account account,
						   SimpMessageHeaderAccessor headerAccessor) {
		// Add user in web socket session
		headerAccessor.getSessionAttributes().put("username", account.getId());
		return account;
	}
}
