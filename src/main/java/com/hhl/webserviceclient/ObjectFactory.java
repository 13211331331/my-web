
package com.hhl.webserviceclient;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.hhl.webserviceclient package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _SayHello_QNAME = new QName("http://webservice.hhl.com/", "sayHello");
    private final static QName _SayHelloResponse_QNAME = new QName("http://webservice.hhl.com/", "sayHelloResponse");
    private final static QName _Sss_QNAME = new QName("http://webservice.hhl.com/", "sss");
    private final static QName _SssResponse_QNAME = new QName("http://webservice.hhl.com/", "sssResponse");
    private final static QName _Exception_QNAME = new QName("http://webservice.hhl.com/", "Exception");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.hhl.webserviceclient
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link Exception }
     * 
     */
    public Exception createException() {
        return new Exception();
    }

    /**
     * Create an instance of {@link Sss }
     * 
     */
    public Sss createSss() {
        return new Sss();
    }

    /**
     * Create an instance of {@link SssResponse }
     * 
     */
    public SssResponse createSssResponse() {
        return new SssResponse();
    }

    /**
     * Create an instance of {@link SayHelloResponse }
     * 
     */
    public SayHelloResponse createSayHelloResponse() {
        return new SayHelloResponse();
    }

    /**
     * Create an instance of {@link SayHello }
     * 
     */
    public SayHello createSayHello() {
        return new SayHello();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SayHello }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservice.hhl.com/", name = "sayHello")
    public JAXBElement<SayHello> createSayHello(SayHello value) {
        return new JAXBElement<SayHello>(_SayHello_QNAME, SayHello.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SayHelloResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservice.hhl.com/", name = "sayHelloResponse")
    public JAXBElement<SayHelloResponse> createSayHelloResponse(SayHelloResponse value) {
        return new JAXBElement<SayHelloResponse>(_SayHelloResponse_QNAME, SayHelloResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Sss }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservice.hhl.com/", name = "sss")
    public JAXBElement<Sss> createSss(Sss value) {
        return new JAXBElement<Sss>(_Sss_QNAME, Sss.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SssResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservice.hhl.com/", name = "sssResponse")
    public JAXBElement<SssResponse> createSssResponse(SssResponse value) {
        return new JAXBElement<SssResponse>(_SssResponse_QNAME, SssResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Exception }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://webservice.hhl.com/", name = "Exception")
    public JAXBElement<Exception> createException(Exception value) {
        return new JAXBElement<Exception>(_Exception_QNAME, Exception.class, null, value);
    }

}
