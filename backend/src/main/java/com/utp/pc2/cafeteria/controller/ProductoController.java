package com.utp.pc2.cafeteria.controller;

import com.utp.pc2.cafeteria.dto.PedidoRequest;
import com.utp.pc2.cafeteria.model.Pedido;
import com.utp.pc2.cafeteria.model.Producto;
import com.utp.pc2.cafeteria.service.PedidoService;
import com.utp.pc2.cafeteria.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;
    private final PedidoService pedidoService;

    @GetMapping("/productos")
    public List<Producto> listarProductos() {
        return productoService.listarTodos();
    }

    @GetMapping("/productos/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoService.obtenerPorId(id);
    }

    @PostMapping("/pedidos")
    public ResponseEntity<Pedido> registrarPedido(@Valid @RequestBody PedidoRequest request) {
        Pedido pedido = pedidoService.registrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }
}
