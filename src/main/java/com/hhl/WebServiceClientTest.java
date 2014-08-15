package com.hhl;

import com.hhl.webservice.ClienLoginInterceptor;
import com.hhl.webserviceclient.Exception_Exception;
import com.hhl.webserviceclient.TestCxf;
import com.hhl.webserviceclient.TestCxfImplService;
import org.apache.cxf.endpoint.Client;
import org.apache.cxf.frontend.ClientProxy;

import java.lang.*;

/**
 * Created by hhl on 2014/8/14.
 */
public class WebServiceClientTest {
    public static void main(String[] args)
    {
        TestCxfImplService factory = new TestCxfImplService();
        try {
            TestCxf testCxf = factory.getTestCxfImplPort();
            Client client = ClientProxy.getClient(testCxf);
            client.getOutInterceptors().add(new ClienLoginInterceptor("admin","123"));
            String sss = testCxf.sayHello("SS");
            System.out.println(sss);
        } catch (Exception_Exception e) {
            e.printStackTrace();
        }
    }
}
