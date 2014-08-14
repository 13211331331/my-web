package com.hhl;

import javax.xml.namespace.QName;

import org.apache.cxf.binding.soap.SoapMessage;
import org.apache.cxf.headers.Header;
import org.apache.cxf.helpers.DOMUtils;
import org.apache.cxf.interceptor.Fault;
import org.apache.cxf.phase.AbstractPhaseInterceptor;
import org.apache.cxf.phase.Phase;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.List;

/**
 * Created by hhl on 2014/8/14.
 */
public class ClienLoginInterceptor extends AbstractPhaseInterceptor<SoapMessage>  {


    private String username;
    private String password;

    public ClienLoginInterceptor(String username, String password) {
        super(Phase.PREPARE_SEND);
        this.username = username;
        this.password = password;
    }

    @Override
    public void handleMessage(SoapMessage soap) throws Fault {
        // TODO Auto-generated method stub
        List<Header> headers = soap.getHeaders();

        Document doc = DOMUtils.createDocument();

        Element auth = doc.createElement("authrity");
        Element username = doc.createElement("username");
        Element password = doc.createElement("password");

        username.setTextContent(this.username);
        password.setTextContent(this.password);

        auth.appendChild(username);
        auth.appendChild(password);
        //doc.appendChild(auth);

        headers.add(0, new Header(new QName("tiamaes"),auth));
    }
}
