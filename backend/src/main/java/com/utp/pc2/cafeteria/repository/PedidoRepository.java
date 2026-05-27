package com.utp.pc2.cafeteria.repository;

import com.utp.pc2.cafeteria.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
