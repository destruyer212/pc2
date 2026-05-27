package com.utp.pc2.cafeteria.repository;

import com.utp.pc2.cafeteria.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
