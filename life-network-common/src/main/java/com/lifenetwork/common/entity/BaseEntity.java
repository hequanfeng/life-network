package com.lifenetwork.common.entity;

import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
public class BaseEntity {
    @Column(name="CREATED_BY")
    private String createdBy;

    @Column(name ="CREATED_DT")
    private LocalDateTime createdDt;

    @Column(name="UPDATED_BY")
    private String updatedBy;

    @Column(name ="UPDATED_DT")
    private LocalDateTime updatedDt;
}
