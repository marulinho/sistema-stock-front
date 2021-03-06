import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { ModuloFinanzasService } from '../../modulo.finanzas.services';
import { ModuloConfiguracionService } from '../../../Modulo_Configuracion/modulo.configuracion.service';
import { DialogYesNoComponent } from '../../../Datos_Sistema/dialog-yes-no/dialog.yes.no.component';
import { DialogSeleccionarProductoVentaComponent } from './dialog-seleccionar-productos-venta/dialog.seleccionar.productos.venta.component';
import { DialogSeleccionarClienteVentaComponent } from './dialog-seleccionar-cliente-venta/dialog.seleccionar.cliente.venta.component';
import { DialogEditarCantidadVentaComponent } from './dialog-editar-cantidad-venta/dialog.editar.cantidad.venta.component';


@Component({
    selector: 'app-registrar-venta',
    templateUrl: './registrar.venta.component.html',
    styleUrls: ['./registrar.venta.component.scss']

})

export class RegistrarVentaComponent implements OnInit {
    
    errorMessage = '';
    snackBarRef: any;
    selectedOption: string;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO_VENTA;
    tooltipEditarProducto = Constantes.LABEL_EDITAR_PRODUCTO;
    tooltipEliminarProducto = Constantes.LABEL_ELIMINAR_PRODUCTO;
    tooltipAgregarCliente = Constantes.LABEL_AGREGAR_CLIENTE;
    position = 'above';
    id_usuario = JSON.parse(localStorage.getItem('idUsuario'));
    label_registrar_venta = Constantes.LABEL_REGISTRAR_VENTA;
    label_venta = Constantes.LABEL_COMPRA;
    label_total = Constantes.LABEL_TOTAL;
    label_descuento = Constantes.LABEL_DESCUENTO;
    label_subtotal = Constantes.LABEL_SUBTOTAL;
    label_peso = Constantes.LABEL_PESO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_accion = Constantes.LABEL_ACCION;
    label_error_descuento = Constantes.MENSAJE_DESCUENTO_INSUFICIENTE;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;

    label_productos_disponibles = Constantes.LABEL_PRODUCTOS_DISPONIBLES;
    label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
    label_precio_total = Constantes.LABEL_TOTAL;
    
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;
    
    label_medio_pago = Constantes.LABEL_MEDIO_PAGO;
    label_cliente = Constantes.LABEL_CLIENTE;


    medios_pagos: Array<{nombre:string}> = [{nombre:Constantes.LABEL_EFECTIVO},{nombre:Constantes.LABEL_CUENTA_CORRIENTE}];
    medio_pago: string;

    descuento: number = 0;
    subtotal: number = 0;
    id_cliente : number;
    cliente:string;
    clientes =[];

    lista_precio = [];
    lista_precio_temp = [];

    productos_venta = [];
    productos_venta_temp = [];

    lista_productos = [];
    lista_combos = [];
    lista_combos_ventas = [];
    lista_cantidad_combos = [];
    lista_cantidad_productos = [];
    lista_cantidad_productos_temp = [];

    lista_productos_venta: Array<{codigo_producto:number,
                                  nombre_producto:string,
                                  marca_producto:string,
                                  medida:string,
                                  nombre_medida:string,
                                  stock_local:string,
                                  precio_venta:number,
                                  is_combo:boolean}> = [];

    constructor(private router:Router,
                private moduloFinanzas: ModuloFinanzasService,
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_VENTA;
    }

    ngOnInit(){
        this.obtenerListaPrecios();
        this.obtenerCombos();
    }

    getCuentaCorriente(){
        if(this.medio_pago === Constantes.LABEL_CUENTA_CORRIENTE){
            return true;
        }
        else{
            return false;
        }
    }

    obtenerListaPrecios() {
        this.moduloConfiguracion.obtenerListaPrecioVigente()
            .then(
                response => {
                    let lista = [];
                    lista = response.datos_operacion['lista_precio_detalles'];
                    let longitud = lista.length;
                    for(var i = 0; i < longitud ; i++){
                        if(lista[i]['stock_local'] > 0){
                            this.lista_precio.push(lista[i]);
                        }
                        
                        //this.lista_cantidad_productos_temp.push(0);
                    }
                    this.lista_precio_temp = [...this.lista_precio];

                    longitud = this.lista_precio.length;

                    for(var i=0;i<longitud;i++){
                        this.lista_productos_venta.push({codigo_producto:this.lista_precio[i]['codigo_producto'],
                                                         nombre_producto:this.lista_precio[i]['nombre_producto'],
                                                         marca_producto:this.lista_precio[i]['marca_producto'],
                                                         medida:this.lista_precio[i]['medida'],
                                                         nombre_medida:this.lista_precio[i]['nombre_medida'],
                                                         stock_local:this.lista_precio[i]['stock_local'],
                                                         precio_venta:this.lista_precio[i]['precio_venta'],
                                                         is_combo:false});
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

    obtenerCombos() {
        this.moduloConfiguracion.obtenerCombosVigentes()
            .then(
                response => {
                    let lista = [];
                    lista = response.datos_operacion;
                    let longitud = lista.length;
                    for(var i = 0; i < longitud ; i++){
                        let long_y = lista[i]['combo_detalles'].length;
                        let resultado = true;
                        for(var y=0; y < long_y; y++){
                            if(lista[i]['combo_detalles'][y]['stock_local']<=0){
                                resultado = false;
                            }
                        }   
                        if(resultado == true){
                            this.lista_combos.push(lista[i]['combo_cabecera']);
                        }
                    }

                    longitud = this.lista_combos.length;

                    for(var i=0;i<longitud;i++){
                        this.lista_productos_venta.push({codigo_producto:this.lista_combos[i]['codigo'],
                                                         nombre_producto:this.lista_combos[i]['nombre'],
                                                         marca_producto:'----',
                                                         medida:'-----',
                                                         nombre_medida:'----',
                                                         stock_local:'----',
                                                         precio_venta:this.lista_combos[i]['precio'],
                                                         is_combo:true});
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

    updateFilterProductosVenta(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_venta_temp.filter(function (d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos_venta = temp;
    }

        
    getPrecioTotal(){
        return (this.subtotal - (this.subtotal * this.descuento / 100)).toFixed(2);
    }

    obtenerClientes(){
        this.moduloConfiguracion.obtenerClientes()
        .then(
            response => {
                this.clientes = response.datos_operacion;
                this.apretarAgregarCliente();
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

    apretarAgregarCliente(){
        let dialogRef = this.dialog.open(DialogSeleccionarClienteVentaComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_CLIENTES_DISPONIBLES;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_CLIENTES_DISPONIBLES;
        dialogRef.componentInstance.clientes = this.clientes;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    
                    let longitud = dialogRef.componentInstance.clientes.length;
                    for(var i = 0; i < longitud ; i++){
                        if(dialogRef.componentInstance.clientes[i]['checked']===true){
                            this.id_cliente = dialogRef.componentInstance.clientes[i]['codigo'];
                            this.cliente = dialogRef.componentInstance.clientes[i]['nombre'].concat(' ',dialogRef.componentInstance.clientes[i]['apellido']);
                        }
                    }
                }
            }
        );
    }

    apretarAgregarProductoVenta(row) {
        let dialogRef = this.dialog.open(DialogSeleccionarProductoVentaComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_PRODUCTOS_DISPONIBLES;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_LISTA_PRECIO_VENTA;
        dialogRef.componentInstance.productos = this.lista_productos_venta;//this.lista_precio;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    
                    let longitud = dialogRef.componentInstance.productos.length;
                    for(var i = 0; i < longitud ; i++){
                        if(dialogRef.componentInstance.productos[i]['checked']===true){
                            this.productos_venta.push(dialogRef.componentInstance.productos[i]);
                            this.lista_cantidad_productos_temp.push(1);
                        }
                    }
                    this.sacarRepetidos();
                    this.calcularTotal();
                    this.productos_venta_temp = [...this.productos_venta];
                }
                
            }
        );
    }


    sacarRepetidos(){
        //let longitud = this.lista_precio.length;
        let longitud = this.lista_productos_venta.length;
        let lista_aux = [];
        
        for(var i=0; i<longitud; i++){
            /*if(!(this.productos_venta.includes(this.lista_precio[i]))){
                lista_aux.push(this.lista_precio[i]);
            }*/

            if(!(this.productos_venta.includes(this.lista_productos_venta[i]))){
                lista_aux.push(this.lista_productos_venta[i]);
            }
        }
        //this.lista_precio = lista_aux;
        this.lista_productos_venta = lista_aux
    } 

    calcularTotal(){
        this.subtotal = 0;
        let longitud = this.productos_venta.length;
        for(var i = 0; i < longitud; i++){
            this.subtotal += this.productos_venta[i]['precio_venta'] * this.lista_cantidad_productos_temp[i];
        }
        
    }

    apretarEditarProductoVenta(row) {
        let dialogRef = this.dialog.open(DialogEditarCantidadVentaComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.cantidad = this.lista_cantidad_productos_temp[row.$$index];
        dialogRef.componentInstance.combo = this.productos_venta[row.$$index].is_combo;
        dialogRef.componentInstance.stock_local = row.stock_local;
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
                        this.calcularTotal();
                    }
                }
            }
        );
    }


    apretarRegistrarVenta(){
        this.lista_cantidad_productos = [];
        this.lista_productos = [];
        this.lista_cantidad_combos = [];
        this.lista_combos_ventas = [];
        this.llenarArrays();
        if(this.descuento == null){
            this.descuento = 0;
        }
        
        //verificamos si existe una caja abierta
        this.moduloFinanzas.obtenerUltimaCaja()
            .then(
                response=>{
                    if(response.datos_operacion['caja_cabecera']['estado'] === Constantes.ESTADO_ABIERTA){
                        this.openDialogRegistrarVenta();
                    }
                    else{
                        this.openDialogAbrirCaja();
                    }
                }
            )
            .catch(
                error=>{
                    this.openDialogAbrirCaja();
                }
            )     
    }

    apretarEliminarProductoVenta(row){
        this.productos_venta = this.productos_venta.filter(item => item.codigo_producto !== row.codigo_producto);
        //this.lista_precio.push(row); 
        this.lista_productos_venta.push(row);
        this.calcularTotal();
        this.productos_venta_temp = [...this.productos_venta];
    }


    openDialogRegistrarVenta(){
        let dialogRef = this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_REGISTRAR_VENTA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_REGISTRAR_VENTA;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.registrarVenta(this.id_usuario,this.descuento,this.lista_productos,this.lista_cantidad_productos,this.lista_cantidad_combos,this.lista_combos_ventas,this.id_cliente,this.medio_pago)
                        .then(
                            response => {
                                if(response.datos_operacion['estado'] === Constantes.ESTADO_CREADO && this.medio_pago === Constantes.LABEL_EFECTIVO){
                                    this.cobrarVenta(response.datos_operacion['codigo']);
                                }
                                else{
                                    this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_PAGO_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                                    this.router.navigate([Constantes.URL_HOME_VENTA]);
                                }
                            }
                        )
                        .catch(
                            error => {
                                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                                    this.router.navigate([Constantes.URL_LOGIN]);
                                }
                                else {
                                    this.errorMessage = error.error_description;
                                }
                            }
                        );
                }
                this.selectedOption = '';
            }
        );
    }

    cobrarVenta(codigo){
        this.moduloFinanzas.cobrarVenta(codigo)
        .then(
            response => {
                if(response.datos_operacion['estado'] === Constantes.ESTADO_PAGADO){
                    this.generarMovimientoCapital(response.datos_operacion['codigo']);
                }
            }
        )
        .catch(
            error => {
                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                    this.router.navigate([Constantes.URL_LOGIN]);
                }
                else {
                    this.errorMessage = error.error_description;
                }
            }
        );
    }

    generarMovimientoCapital(codigo){
        this.moduloFinanzas.generarMovimientoStockEntradaCapital(codigo)
            .then(
                response=>{
                    if(response.datos_operacion['estado'] === Constantes.ESTADO_PAGADO){
                        let codigo = response.datos_operacion['codigo'];
                        this.generarDetalleCaja(codigo);
                    }
                }
            )
            .catch(
                error=>{
                    //la venta esta en estado pagado, por lo tanto hay que devolverle el estado a creado para que se pueda reintentar cobrar la venta
                    let estado = Constantes.ESTADO_CREADO;
                    this.moduloFinanzas.cambiarEstadoVenta(codigo,estado)
                        .then(
                            response=>{
                                this.errorMessage = Constantes.ERROR_COBRO_NO_REALIZADO;
                            }
                        )
                        .catch(
                            error=>{}
                        )
                }
            )
        
    }

    generarDetalleCaja(codigo:number){
        this.moduloFinanzas.generarDetalleCaja(codigo)
        .then(
            response=>{
                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_PAGO_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                this.router.navigate([Constantes.URL_HOME_VENTA]);
            }
        )
        .catch(
            error=>{
                
            }
        )
    }
    
    openDialogAbrirCaja(){
        let dialogRef = this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ABRIR_CAJA;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ABRIR_CAJA_NO_EXISTE;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloFinanzas.abrirCaja()
                        .then(
                            response => {
                                this.openDialogRegistrarVenta();
                                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_APERTURA, Constantes.MENSAJE_OK, { duration: 3000, });
                            }
                        )
                        .catch(
                            error => {
                                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                                    this.router.navigate([Constantes.URL_LOGIN]);
                                }
                                else {
                                    this.errorMessage = error.error_description;
                                }
                            }
                        );
                }
                this.selectedOption = '';
            }
        );
    }


    llenarArrays(){
        let longitud = this.productos_venta.length;
        for(var i = 0; i< longitud; i++){
            if(this.productos_venta[i]['is_combo']===true){
                this.lista_combos_ventas.push(this.productos_venta[i]['codigo_producto']);
                this.lista_cantidad_combos.push(this.lista_cantidad_productos_temp[i])
            }
            else{
                this.lista_productos.push(this.productos_venta[i]['codigo_producto']);
                this.lista_cantidad_productos.push(this.lista_cantidad_productos_temp[i]);    
            }
            
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_VENTA]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_VENTA]);
    }
}


