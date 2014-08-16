package com.hhl.controller;

import com.hhl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

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
