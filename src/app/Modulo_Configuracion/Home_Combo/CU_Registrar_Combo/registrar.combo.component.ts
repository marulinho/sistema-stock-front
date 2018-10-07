import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService } from '../../modulo.configuracion.service';
import { DialogRegistrarComboComponent } from './dialog-registrar-combo/dialog.registrar.combo.component';
import { DialogEditarPrecioComboComponent } from './dialog-editar-precio-combo/dialog.editar.precio.combo.component';

@Component({
    selector: 'app-registrar-combo',
    templateUrl: './registrar.combo.component.html',
    styleUrls: ['./registrar.combo.component.scss']

})

export class RegistrarComboComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    utils = new Utils();
    errorMessage = '';
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO;
    tooltipEliminarProducto = Constantes.LABEL_ELIMINAR_PRODUCTO;
    tooltipEditarProducto = Constantes.LABEL_EDITAR_PRODUCTO_CANTIDAD;
    position = 'above';
    selectedOption: string;
    label_registrar_combo = Constantes.LABEL_REGISTRAR_COMBO;
    label_datos_obligatorios = Constantes.LABEL_DATOS_OBLIGATORIOS;
    label_datos_combo = Constantes.LABEL_DATOS_COMBO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_total = Constantes.LABEL_TOTAL;
    label_precio_combo = Constantes.LABEL_PRECIO_VENTA;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_tabla_lista_combo = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
    label_margen_ganancia = Constantes.LABEL_MARGEN_GANANCIA;
    label_porcentaje = Constantes.LABEL_PORCENTAJE;
    label_peso = Constantes.LABEL_PESO;
    label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_accion = Constantes.LABEL_ACCION;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;

    lista_precio = [];
    lista_precio_temp = [];


    nombre: string;
    total: number = 0;

    productos_combo = [];
    productos_combo_temp = [];

    lista_productos = [];
    lista_cantidad_productos = [];
    lista_cantidad_productos_temp = [];
    lista_margen_ganancia = [];



    constructor(private appService: AppService,
        private moduloConfiguracion: ModuloConfiguracionService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog,
        private router: Router) {

        appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_COMBO;
    }

    ngOnInit() {
        this.obtenerListaPrecios();
    }

    obtenerListaPrecios() {
        this.moduloConfiguracion.obtenerListaPrecioVigente()
            .then(
                response => {
                    this.lista_precio = response.datos_operacion['lista_precio_detalles'];
                    this.lista_precio_temp = [...this.lista_precio];
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

    updateFilterListaPrecio(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.lista_precio_temp.filter(function (d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.lista_precio = temp;
    }

    updateFilterCombo(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_combo_temp.filter(function (d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos_combo = temp;
    }

    apretarAgregarProducto(){
        let dialogRef = this.dialog.open(DialogRegistrarComboComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_PRODUCTOS_DISPONIBLES;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_PRODUCTOS_DISPONIBLES_COMBO;
        dialogRef.componentInstance.productos = this.lista_precio; 
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    let longitud = dialogRef.componentInstance.productos.length;
                    for(var i=0; i<longitud; i++){
                        if (dialogRef.componentInstance.productos[i]['checked']) {
                            this.productos_combo.push(this.lista_precio[i]);
                            this.lista_cantidad_productos_temp.push(1);
                            this.calcularTotal();
                        }
                    }
                    this.productos_combo_temp = [...this.productos_combo];
                    this.sacarRepetidos();
                }
                
            }
        );
    }

    sacarRepetidos(){
        let longitud = this.lista_precio.length;
        let lista_aux = [];
        
        for(var i=0; i<longitud; i++){
            if(!(this.productos_combo.includes(this.lista_precio[i]))){
                lista_aux.push(this.lista_precio[i]);
            }
        }
        this.lista_precio = lista_aux;
    }  

    apretarEditarProductoCombo(row) {
        let dialogRef = this.dialog.open(DialogEditarPrecioComboComponent);
        dialogRef.componentInstance.title = Constantes.LABEL_EDITAR_PRECIO;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_EDITAR_PRECIO_LISTA;
        dialogRef.componentInstance.precio_compra = row.precio_compra;
        dialogRef.componentInstance.margen_ganancia = row.margen_ganancia;
        dialogRef.componentInstance.cantidad = this.lista_cantidad_productos_temp[row.$$index];
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    if (dialogRef.componentInstance.precio_compra <= 0 || dialogRef.componentInstance.margen_ganancia <= 0 || dialogRef.componentInstance.cantidad <= 0) {
                        //no editamos los precios
                    }
                    else {
                        this.productos_combo[row.$$index]['precio_compra'] = dialogRef.componentInstance.precio_compra;
                        this.productos_combo[row.$$index]['precio_venta'] = dialogRef.componentInstance.getPrecioVenta();
                        this.productos_combo[row.$$index]['precio_venta'] = parseFloat(this.productos_combo[row.$$index]['precio_venta']).toFixed(2);
                        this.productos_combo[row.$$index]['margen_ganancia'] = dialogRef.componentInstance.margen_ganancia;
                        this.productos_combo[row.$$index]['margen_ganancia'] = parseFloat(this.productos_combo[row.$$index]['margen_ganancia']).toFixed(2);
                        this.lista_cantidad_productos_temp[row.$$index] = dialogRef.componentInstance.cantidad;
                        this.calcularTotal();
                    }
                }
            }
        );
    }


    
    apretarEliminarProductoCombo(row){
        this.productos_combo = this.productos_combo.filter(item => item.codigo_producto !== row.codigo_producto);
        this.lista_precio.push(row); 
        this.calcularTotal();
    }
    
    calcularTotal(){
        this.total = 0;
        let longitud = this.productos_combo.length;
        for(var i = 0; i < longitud; i++){
            this.total += this.productos_combo[i]['precio_venta'] * this.lista_cantidad_productos_temp[i];
        }
        
    }

    apretarRegistrarCombo(){
        this.lista_cantidad_productos = [];
        this.lista_productos = [];
        this.lista_margen_ganancia = [];
        this.llenarArrays();
        if(this.lista_productos.length == this.lista_margen_ganancia.length &&  this.lista_cantidad_productos.length == this.lista_margen_ganancia.length){
            this.moduloConfiguracion.registrarCombo(this.nombre,this.lista_productos,this.lista_cantidad_productos,this.lista_margen_ganancia)
                .then(
                    response => {
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                        this.router.navigate([Constantes.URL_HOME_COMBO]);
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
        else{
            this.errorMessage = Constantes.ERROR_LISTAS_DIFERENTES;
        }
        
    }

    llenarArrays(){
        let longitud = this.productos_combo.length;
        for(var i = 0; i< longitud; i++){
            this.lista_productos.push(this.productos_combo[i]['codigo_producto']);
            this.lista_margen_ganancia.push(this.productos_combo[i]['margen_ganancia']);
            this.lista_cantidad_productos.push(this.lista_cantidad_productos_temp[i]);
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_COMBO]);
    }

    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME_COMBO]);
    }


}



