package com.hhl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by hhl on 2014/9/11.
 */
@Controller
@RequestMapping("administrator")
public class AdminController
{
    @RequestMapping(value = "")
    public String index(ModelMap modelMap){
        return "administrator/index";
    }

    @RequestMapping(value = "menu")
    public String menu(ModelMap modelMap){
        return "administrator/menu";
    }

}
