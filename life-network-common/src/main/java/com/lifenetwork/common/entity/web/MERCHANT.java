package com.lifenetwork.common.entity.web;

import com.lifenetwork.common.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "MERCHANT")
public class MERCHANT extends BaseEntity {
    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name="STATUS")
    private String status;

    @Column(name="USER_NAME")
    private String userName;

    @Column(name="PHONE")
    private String phone;

    @Column(name="PASSWORD")
    private String password;

    @Column(name="UPDATED_PASSWORD_DATE")
    private LocalDateTime updatedPasswordDate;

    @Column(name="PHOTO_PATH")
    private String photoPath;

    @Column(name="ROLE_ID")
    private Long roleId;
}
