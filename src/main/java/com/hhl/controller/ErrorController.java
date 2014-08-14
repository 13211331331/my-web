package com.hhl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by hhl on 2014/8/3.
 */
@Controller
@RequestMapping(value = "error")
public class ErrorController {


    @RequestMapping(value = "{code}", method = RequestMethod.GET)
    public String index(@PathVariable("code")
                        String code, ModelMap modelMap) {
        modelMap.put("test", "hellw");
        return "error/" + code;
    }
}
