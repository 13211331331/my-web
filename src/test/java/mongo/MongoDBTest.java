package mongo;

import com.mongodb.DB;
import com.mongodb.Mongo;
import com.mongodb.MongoException;
import org.junit.Test;

import java.net.UnknownHostException;

/**
 * Created by hhl on 2014/8/15.
 */
public class MongoDBTest {

   // @Test
    public void test01()
    {
        Mongo mongo = null;
        try
        {
            //通过连接字符串得到一个数据库实例的连接
            mongo = new Mongo("127.0.0.1",27017);
        }
        catch (UnknownHostException e)
        {
            e.printStackTrace();
        }
        catch (MongoException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        //获得一个数据库对象
        DB db = mongo.getDB("mydb");
        //指定安全授权信息
        db.authenticate("bbyshp", "123456".toCharArray());

    }

}
