package com.hhl.dao.mapper;

import com.hhl.model.mybatis.UserModel;
import com.hhl.model.mybatis.UserModelCriteria;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

public interface UserModelMapper {
    int countByExample(UserModelCriteria example);

    int deleteByExample(UserModelCriteria example);

    int insert(UserModel record);

    int insertSelective(UserModel record);

    List<UserModel> selectByExampleWithRowbounds(UserModelCriteria example, RowBounds rowBounds);

    List<UserModel> selectByExample(UserModelCriteria example);

    int updateByExampleSelective(@Param("record") UserModel record, @Param("example") UserModelCriteria example);

    int updateByExample(@Param("record") UserModel record, @Param("example") UserModelCriteria example);
}