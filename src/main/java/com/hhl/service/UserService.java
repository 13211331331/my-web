package com.hhl.service;

import com.hhl.exception.MyException;
import com.hhl.model.User;

import java.util.List;

/**
 * Created by hhl on 2014/8/16.
 */
public interface UserService {

    List<User> getUserList() throws MyException;
}
