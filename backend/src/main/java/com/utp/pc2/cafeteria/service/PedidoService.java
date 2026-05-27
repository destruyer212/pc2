package com.utp.pc2.cafeteria.service;

import com.utp.pc2.cafeteria.dto.PedidoRequest;
import com.utp.pc2.cafeteria.model.Pedido;
import com.utp.pc2.cafeteria.model.Producto;
import com.utp.pc2.cafeteria.repository.PedidoRepository;
import com.utp.pc2.cafeteria.repository.ProductoRepository;
import com.utp.pc2.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;

    @Transactional
    public Pedido registrar(PedidoRequest request) {
        Producto producto = productoRepository.findById(request.getProductoId())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + request.getProductoId()));

        if (producto.getStock() < request.getCantidad()) {
            throw new IllegalArgumentException("Stock insuficiente para el producto: " + producto.getNombre());
        }

        producto.setStock(producto.getStock() - request.getCantidad());
        productoRepository.save(producto);

        Pedido pedido = Pedido.builder()
                .nombreEstudiante(request.getNombreEstudiante())
                .producto(producto)
                .cantidad(request.getCantidad())
                .observacion(request.getObservacion())
                .build();

        return pedidoRepository.save(pedido);
    }
}
