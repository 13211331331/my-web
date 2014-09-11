package com.hhl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
