package com.hhl.filter;

import com.hhl.model.mybatis.UserModel;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;


/**
 * Created by hhl on 2014/8/29.
 */
public class ShiroFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {


        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        Principal principal = httpRequest.getUserPrincipal();

        if (principal != null) {
            Subject subjects = SecurityUtils.getSubject();
            // 为了简单，这里初始化一个用户。实际项目项目中应该去数据库里通过名字取用户：
            // 例如：User user = userService.getByAccount(principal.getName());
            UserModel user = new UserModel();
            user.setUsername("shiro");
           // user.setId(new Role("member"));
            if ("admin".equals(principal.getName())) {
                UsernamePasswordToken token = new UsernamePasswordToken("admin", "123");
                subjects = SecurityUtils.getSubject();
                subjects.login(token);
                subjects.getSession();
            } else {
                // 如果用户为空，则subjects信息登出
                if (subjects != null) {
                    subjects.logout();
                }
            }
        }
        filterChain.doFilter(httpRequest, httpResponse);

    }

    @Override
    public void destroy() {

    }
}
