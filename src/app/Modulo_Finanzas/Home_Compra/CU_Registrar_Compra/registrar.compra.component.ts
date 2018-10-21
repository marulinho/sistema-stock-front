import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { ModuloFinanzasService } from '../../modulo.finanzas.services';
import { ModuloConfiguracionService } from '../../../Modulo_Configuracion/modulo.configuracion.service';
import { DialogSeleccionarProductoCompraComponent } from './dialog-seleccionar-producto-compra/dialog.seleccionar.producto.compra.component';
import { DialogEditarCantidadCompraComponent } from './dialog-editar-cantidad-compra/dialog.editar.cantidad.compra.component';


@Component({
    selector: 'app-registrar-compra',
    templateUrl: './registrar.compra.component.html',
    styleUrls: ['./registrar.compra.component.scss']

})

export class RegistrarCompraComponent implements OnInit {

    errorMessage = '';
    snackBarRef: any;
    selectedOption: string;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO;
    tooltipEditarProducto = Constantes.LABEL_EDITAR_PRODUCTO;
    tooltipEliminarProducto = Constantes.LABEL_ELIMINAR_PRODUCTO;
    position = 'above';
    id_usuario = JSON.parse(localStorage.getItem('idUsuario'));
    label_registrar_compra = Constantes.LABEL_REGISTRAR_COMPRA;
    label_compra = Constantes.LABEL_COMPRA;
    label_detalle_compra = Constantes.LABEL_DETALLE_COMPRA;
    label_total = Constantes.LABEL_TOTAL;
    label_peso = Constantes.LABEL_PESO;
    label_usuario = Constantes.LABEL_USUARIO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_precio_unitario = Constantes.LABEL_PRECIO_COMPRA;
    label_subtotal = Constantes.LABEL_SUBTOTAL;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_stock_final = Constantes.LABEL_STOCK_FINAL;
    label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
    label_precio_total = Constantes.LABEL_TOTAL;
    label_descuento = Constantes.LABEL_DESCUENTO;
    label_porcentaje = Constantes.LABEL_PORCENTAJE;
    label_accion = Constantes.LABEL_ACCION;
    label_error_descuento_insuficiente = Constantes.MENSAJE_DESCUENTO_INSUFICIENTE;
    label_proveedor = Constantes.LABEL_PROVEEDOR;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;


    descuento: number = 0;
    subtotal: number = 0;
    id_proveedor: number;


    lista_precio = [];
    lista_proveedores = [];

    lista_compra = [];
    lista_compra_temp = [];

    lista_productos = [];

    lista_cantidad_productos = [];
    lista_cantidad_productos_temp = [];



    constructor(private router: Router,
        private moduloFinanzas: ModuloFinanzasService,
        private moduloConfiguracion: ModuloConfiguracionService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog,
        private appService: AppService) {

        appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_COMPRA;
    }

    ngOnInit() {
        this.obtenerListaPrecios();
        this.obtenerProveedores();
    }

    obtenerListaPrecios() {
        this.moduloConfiguracion.obtenerListaPrecioVigente()
            .then(
                response => {
                    this.lista_precio = response.datos_operacion['lista_precio_detalles'];
                    let longitud = this.lista_precio.length;
                    for (var i = 0; i < longitud; i++) {
                        this.lista_cantidad_productos_temp.push(1);
                    }
                }
            )
            .catch(
                error => {
                    if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, { duration: 3000, });
                        this.router.navigate([Constantes.URL_LOGIN]);
                    }
                    else {
                        this.errorMessage = error.error_description;
                    }

                }
            );
    }

    obtenerProveedores(){
        this.moduloConfiguracion.obtenerClientes()
        .then(
            response => {
                let lista = response.datos_operacion;
                let longitud = lista.length;
                for (var i = 0; i < longitud; i++) {
                    if(lista[i]['tipo_cliente'] === Constantes.LABEL_PROVEEDOR){
                        this.lista_proveedores.push(lista[i]);
                    }
                }
            }
        )
        .catch(
            error => {
                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                    this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, { duration: 3000, });
                    this.router.navigate([Constantes.URL_LOGIN]);
                }
                else {
                    this.errorMessage = error.error_description;
                }

            }
        );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.lista_compra_temp.filter(function (d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.lista_compra = temp;
    }


    apretarAgregarProducto() {
        let dialogRef = this.dialog.open(DialogSeleccionarProductoCompraComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_PRODUCTOS_DISPONIBLES;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_PRODUCTOS_DISPONIBLES_COMPRA;
        dialogRef.componentInstance.productos = this.lista_precio;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    let longitud = dialogRef.componentInstance.productos.length;
                    for(var i=0; i<longitud; i++){
                        if(dialogRef.componentInstance.productos[i]['checked']===true){
                            this.lista_productos.push(dialogRef.componentInstance.productos[i]['codigo_producto']);
                            this.lista_compra.push(dialogRef.componentInstance.productos[i]);
                            this.lista_cantidad_productos_temp.push(1);
                        }
                    }
                    this.lista_compra_temp = [...this.lista_compra];
                    this.sacarRepetidos();
                    this.calcularTotal();
                }

            }
        );
    }

    sacarRepetidos(){
        let longitud = this.lista_precio.length;
        let lista_aux = [];
        
        for(var i=0; i<longitud; i++){
            if(!(this.lista_compra.includes(this.lista_precio[i]))){
                lista_aux.push(this.lista_precio[i]);
            }
        }
        this.lista_precio = lista_aux;
    }  

    apretarEditarProductoCompra(row) {
        let dialogRef = this.dialog.open(DialogEditarCantidadCompraComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.cantidad = this.lista_cantidad_productos_temp[row.$$index];
        dialogRef.componentInstance.stock_actual = row.stock_deposito + row.stock_local;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    if (dialogRef.componentInstance.cantidad <= 0) {
                        //no editamos las cantidades de la compra
                    }
                    else {
                        this.lista_cantidad_productos_temp[row.$$index] = dialogRef.componentInstance.cantidad;

                        }
                    }
                    this.calcularTotal();
                }
        );
    }

    apretarEliminarProductoCompra(row){
        this.lista_compra = this.lista_compra.filter(item => item.codigo_producto !== row.codigo_producto);
        this.lista_precio.push(row); 
        this.calcularTotal();
        this.lista_compra_temp = [...this.lista_compra];
    }

    calcularTotal(){
        this.subtotal = 0;
        let longitud = this.lista_compra.length;
        for(var i = 0; i < longitud; i++){
            this.subtotal += this.lista_compra[i]['precio_compra'] * this.lista_cantidad_productos_temp[i];
        }
        
    }
    
    apretarRegistrarCompra() {
        this.lista_cantidad_productos = [];
        this.lista_productos = [];
        this.llenarArrays();
        if (this.descuento == null) {
            this.descuento = 0;
        }
        this.moduloFinanzas.registrarCompra(this.id_usuario, this.id_proveedor, this.descuento, this.lista_productos, this.lista_cantidad_productos)
            .then(
                response => {
                    this.router.navigate([Constantes.URL_HOME_COMPRA]);
                    this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                }
            )
            .catch(
                error => {
                    if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, { duration: 3000, });
                        this.router.navigate([Constantes.URL_LOGIN]);
                    }
                    else {
                        this.errorMessage = error.error_description;
                    }

                }
            );
    }

    llenarArrays() {
        let longitud = this.lista_compra.length;
        for (var i = 0; i < longitud; i++) {
            this.lista_productos.push(this.lista_compra[i]['codigo_producto']);
            this.lista_cantidad_productos.push(this.lista_cantidad_productos_temp[i]);
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_COMPRA]);
    }

    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME_COMPRA]);
    }
}


