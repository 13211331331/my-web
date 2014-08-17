package com.hhl.service.impl;
import com.hhl.dao.UserDao;
import com.hhl.exception.MyException;
import com.hhl.model.mybatis.UserModel;
import com.hhl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Created by hhl on 2014/8/16.
 */
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

    @Override
    public List<UserModel> getUserList() throws MyException {
        return userDao.getUserList();
    }
}
