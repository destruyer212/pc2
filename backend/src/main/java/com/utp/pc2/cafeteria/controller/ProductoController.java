package com.utp.pc2.cafeteria.controller;

import com.utp.pc2.cafeteria.dto.PedidoRequest;
import com.utp.pc2.cafeteria.model.Pedido;
import com.utp.pc2.cafeteria.model.Producto;
import com.utp.pc2.cafeteria.service.PedidoService;
import com.utp.pc2.cafeteria.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Pregunta 1 - Cafetería", description = "Productos y pedidos")
public class ProductoController {

    private final ProductoService productoService;
    private final PedidoService pedidoService;

    @Operation(summary = "Listar productos")
    @GetMapping("/productos")
    public List<Producto> listarProductos() {
        return productoService.listarTodos();
    }

    @Operation(summary = "Obtener producto por ID")
    @GetMapping("/productos/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoService.obtenerPorId(id);
    }

    @Operation(summary = "Registrar pedido")
    @PostMapping("/pedidos")
    public ResponseEntity<Pedido> registrarPedido(@Valid @RequestBody PedidoRequest request) {
        Pedido pedido = pedidoService.registrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }
}
