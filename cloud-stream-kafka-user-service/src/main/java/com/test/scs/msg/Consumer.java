package com.test.scs.msg;


import com.test.scs.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@EnableBinding(Sink.class)
public class Consumer {

	private static final Logger logger = LoggerFactory.getLogger(Consumer.class);
    @Autowired
    SimpMessagingTemplate template;

	@StreamListener(target = Sink.INPUT)
	public void consume(String message) {

		logger.info("Received a string message : " + message);
	}


	@StreamListener(target = Sink.INPUT, condition = "headers['type']=='user'")
	public void handle(@Payload User user) {
		logger.info("Received a User message : [{}]: {} {} {}", user.getId(), user.getAccountNo(), user.getUserName());
        template.convertAndSend("/test/group", user);
	}
}
