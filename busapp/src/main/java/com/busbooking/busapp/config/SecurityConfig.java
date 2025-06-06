package com.busbooking.busapp.config;

import com.busbooking.busapp.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
        	.authorizeHttpRequests(auth -> auth
        	    .requestMatchers("/api/users/login", "/api/users/register").permitAll()
        	    .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
        	    .requestMatchers("/api/admin/**").authenticated() // ⬅️ already covered by your setup
        	    .anyRequest().authenticated()
        	)

            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
