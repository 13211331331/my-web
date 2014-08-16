package mongo;

import com.mongodb.DB;
import com.mongodb.Mongo;
import org.junit.Test;

import java.net.UnknownHostException;

/**
 * Created by hhl on 2014/8/15.
 */
public class MongoDBTest {

    @Test
    public void accessControllTest()
    {
        Mongo mongo = null;
        try {
            mongo = new Mongo("127.0.0.41",27017);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        DB db = mongo.getDB("test");

    }

}
