package com.lifenetwork.common.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.Properties;


@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.lifenetwork.common"})
public class AppConfig implements WebMvcConfigurer {
    public static final String SYSTEM_ERROR = "请联系系统管理处理.";

    /**
     * 获取国际化资源文件
     * @param key
     * @return
     */
    public static String getTextValue(String key) {
        return getResourceValue(key, null, "com/mtrc/trm/ApplicationResources.properties");
    }
    /**
     * 获取国际化资源文件
     * @param key
     * @return
     */
    public static String getTextValue(String key, Object[] args) {
        return getResourceValue(key, args, "com/lifenetwork/common/messages_zh_CN.properties");
    }

    public static String getResourceValue(String key, Object[] args, String resourceName) {
        Properties properties;
        try {
            properties = PropertiesLoaderUtils.loadAllProperties(resourceName);
        } catch (IOException e) {
            return SYSTEM_ERROR;
        }

        String value = properties.getProperty(key);
        if (value != null && args != null && args.length > 0) {
            return MessageFormat.format(value, args);
        }
        return value;
    }
}
