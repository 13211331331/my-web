package com.hhl.service;

import com.hhl.exception.MyException;
import com.hhl.model.mybatis.UserModel;

import java.util.List;

/**
 * Created by hhl on 2014/8/16.
 */
public interface UserService {

    List<UserModel> getUserList() throws MyException;
}
