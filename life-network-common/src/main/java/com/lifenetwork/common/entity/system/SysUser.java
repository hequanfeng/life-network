package com.lifenetwork.common.entity.system;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "sys_user")
public class SysUser {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name="user_name")
    private String userName;

    @Column(name="created_by")
    private String createdBy;

    @Column(name ="created_at")
    private LocalDateTime createdAt;
}
