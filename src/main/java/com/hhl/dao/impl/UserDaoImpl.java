package com.hhl.dao.impl;

import com.hhl.dao.UserDao;
import com.hhl.dao.mapper.UserModelMapper;
import com.hhl.model.mybatis.UserModel;
import com.hhl.model.mybatis.UserModelCriteria;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by hhl on 2014/8/16.
 */
@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public List<UserModel> getUserList() {
        try {
            SqlSession sqlSession = sqlSessionTemplate.getSqlSessionFactory().openSession();
            UserModelMapper userModelMapper = sqlSession.getMapper(UserModelMapper.class);
            UserModelCriteria userModelCriteria = new UserModelCriteria();
            userModelCriteria.createCriteria().andIdIsNotNull();
            return userModelMapper.selectByExample(userModelCriteria);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
