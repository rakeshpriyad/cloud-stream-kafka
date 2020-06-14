package com.test.scs.service;

import com.test.scs.model.Account;
import com.test.scs.msg.Producer;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

@Component
public class AccountService {

    private Producer producer;

    public AccountService(Producer producer) {
        super();
        this.producer = producer;
    }
    public String  send(Account payload){

        producer.getMysource().output()
                .send(MessageBuilder.withPayload(payload)
                        .setHeader("type", "account")
                        .build());
        return "success";
    }
}
