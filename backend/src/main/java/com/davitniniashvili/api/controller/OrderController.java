package com.davitniniashvili.api.controller;

import com.davitniniashvili.api.model.Order;
import com.davitniniashvili.api.model.OrderItem;
import com.davitniniashvili.api.repository.OrderRepository;
import com.davitniniashvili.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        // Set order reference in items
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }

        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
