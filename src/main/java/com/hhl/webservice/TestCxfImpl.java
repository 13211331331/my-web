package com.hhl.webservice;

import javax.jws.WebService;

/**
 * Created by hhl on 2014/8/3.
 */

@WebService(endpointInterface= "com.hhl.webservice.TestCxf")
public class TestCxfImpl implements TestCxf {
    @Override
    public String sayHello(String name) throws Exception {
        return "Hello" + name;
    }

    @Override
    public String sss(String name) throws Exception {
        return "222";
    }
}
