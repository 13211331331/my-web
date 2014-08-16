package com.hhl.service.impl;

import com.hhl.exception.MyException;
import com.hhl.model.User;
import com.hhl.service.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hhl on 2014/8/16.
 */
@Service
public class UserServiceImpl implements UserService{

    @Override
    public List<User> getUserList() throws MyException {
        List<User> list = new ArrayList<User>();
        User u = new User();
        u.setId(1);
        u.setEmail("3223@123.com");
        u.setMobile("13211331332");
        u.setUserName("bbyshp");
        list.add(u);

        User u1 = new User();
        u1.setId(2);
        u1.setEmail("232332323");
        u1.setMobile("1122233");
        u1.setUserName("55nnb");
        list.add(u1);

        return list;
    }
}
