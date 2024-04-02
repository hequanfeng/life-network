package com.lifenetwork.common.util;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.lifenetwork.common.config.AppConfig;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Response extends ResponseEntity<Object> {
    private final Map<String, Object> map;

    private Response(Map<String, Object> map, HttpStatus status) {
        super(map, status);
        this.map = map;
    }

    /**
     * 封装返回成功的方法
     * @param data
     * @return
     */
    private static Response success(Object data){
        Map<String, Object> map = new HashMap<>();
        map.put("data", data);
        return new Response(map, HttpStatus.OK);
    }

    /**
     * 封装返回失败的方法
     * @return
     */
    public static Response error(List<ObjectError> objectErrors) {
        Map<String, Object> result = Maps.newHashMap();
        List<String> errors = Lists.newArrayList();
        for (ObjectError objectError : objectErrors) {
            if (objectError.getArguments() != null && objectError.getArguments().length > 0) {
                errors.add(AppConfig.getTextValue(objectError.getCodes()[1], objectError.getArguments()));
            } else {
                errors.add(AppConfig.getTextValue(objectError.getCodes()[1]));
            }
        }
        result.put("errors", errors);
        return new Response(result, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
