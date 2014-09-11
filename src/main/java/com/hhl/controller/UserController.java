package com.hhl.controller;

import com.hhl.model.mybatis.Role;
import com.hhl.model.mybatis.User;
import com.hhl.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by hhl on 2014/8/16.
 */
@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("index")
    public String index(ModelMap modelMap) throws Exception
    {
        modelMap.put("list",userService.getUserList());
        return "user/user_index";
    }




}
