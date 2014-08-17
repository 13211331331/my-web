package com.hhl.dao;

import com.hhl.model.mybatis.UserModel;

import java.util.List;

/**
 * Created by hhl on 2014/8/16.
 */
public interface UserDao {

    List<UserModel> getUserList();
}
