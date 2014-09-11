package com.hhl.controller;

import com.hhl.model.mybatis.Role;
import com.hhl.model.mybatis.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by hhl on 2014/8/3.
 */
@Controller
public class HelloController {


    @RequestMapping(value = "")
    public String index(ModelMap modelMap){
        modelMap.put("test","hellw");
        return "index";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login() {
        return new ModelAndView("/login");
    }

    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    public ModelAndView submit(String username, String password) {
        User user = new User("shiro", "123456");
        user.setRole(new Role("member"));
        try {
            // 如果登陆成功
            if (user.getUserName().equals(username) && user.getPassword().equals(password)) {
                UsernamePasswordToken token = new UsernamePasswordToken(user.getUserName(), user
                        .getPassword().toString());
                Subject subject = SecurityUtils.getSubject();
                subject.login(token);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ModelAndView("redirect:/index");
    }


    @RequestMapping(value = "/unauthorized", method = RequestMethod.GET)
    public ModelAndView unauthorized() {
        return new ModelAndView("/unauthorized");
    }
}
