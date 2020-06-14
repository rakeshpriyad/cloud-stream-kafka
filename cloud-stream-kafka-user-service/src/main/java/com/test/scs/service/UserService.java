package com.test.scs.service;

import com.test.scs.model.User;
import com.test.scs.msg.Producer;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

@Component
public class UserService {

    private Producer producer;

    public UserService(Producer producer) {
        super();
        this.producer = producer;
    }
    public String  send(User payload){

        producer.getMysource().output()
                .send(MessageBuilder.withPayload(payload)
                        .setHeader("type", "user")
                        .build());
        return "success";
    }
}
