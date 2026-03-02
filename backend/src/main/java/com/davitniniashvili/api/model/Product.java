package com.davitniniashvili.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(length = 500)
    private String imageUrl;
    
    @Column(nullable = false)
    private Integer stock;
    
    @Column(length = 100)
    private String category; // e.g., "T-Shirt", "Jersey", "Rugby Ball"
    
    @Column(length = 50)
    private String size; // e.g., "S", "M", "L", "XL"
    
    @Column(length = 50)
    private String color;
    
    private Boolean active = true;
}
