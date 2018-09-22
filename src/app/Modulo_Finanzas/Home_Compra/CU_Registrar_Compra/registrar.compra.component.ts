import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { ModuloFinanzasService } from '../../modulo.finanzas.services';
import { ModuloConfiguracionService } from '../../../Modulo_Configuracion/modulo.configuracion.service';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';


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
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;
    

    descuento: number;
    subtotal: number = 0;


    lista_precio = [];
    lista_precio_temp = [];

    lista_productos = [];
    lista_productos_temp = [];
    lista_cantidad_productos = [];
    lista_cantidad_productos_temp = [];

    

    constructor(private router:Router,
                private moduloFinanzas: ModuloFinanzasService,
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_COMPRA;
    }

    ngOnInit(){
        this.obtenerListaPrecios();
    }

    obtenerListaPrecios() {
        this.moduloConfiguracion.obtenerListaPrecioVigente()
            .then(
                response => {
                    this.lista_precio = response.datos_operacion['lista_precio_detalles'];
                    let longitud = this.lista_precio.length;
                    for(var i = 0; i < longitud ; i++){
                        this.lista_cantidad_productos_temp.push(0);
                    }
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

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.lista_precio_temp.filter(function (d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.lista_precio = temp;
    }

    apretarEditarProductoCompra(row) {
        this.openDialogEditarProducto(row);
    }

    openDialogEditarProducto(row) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.descipcion_lista_precio = Constantes.DESCRIPCION_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.cantidad = this.lista_cantidad_productos_temp[row.$$index];
        dialogRef.componentInstance.compra_seleccionado = true;
        dialogRef.componentInstance.stock_deposito = row.stock_deposito;
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
                        this.subtotal = 0;
                        let codigo_producto = this.lista_precio[row.$$index]['codigo_producto']
                        this.lista_productos_temp.push(codigo_producto);
                        this.lista_cantidad_productos_temp[row.$$index] = dialogRef.componentInstance.cantidad;

                        let longitud_x = this.lista_productos_temp.length;
                        let longitud_y = this.lista_precio.length; 
                        for(var x = 0; x < longitud_x ; x++){
                            for(var y = 0; y < longitud_y; y++){
                                if(this.lista_productos_temp[x] === this.lista_precio[y]['codigo_producto']){
                                    this.subtotal += this.lista_precio[y]['precio_compra'] * this.lista_cantidad_productos_temp[x];
                                }
                            }

                        }
                    }
                }
                
            }
        );
    }


    apretarRegistrarCompra() {
        this.lista_cantidad_productos = [];
        this.lista_productos = [];
        this.llenarArrays();
        if(this.descuento == null){
            this.descuento = 0;
        }
        this.moduloFinanzas.registrarCompra(this.id_usuario,this.descuento,this.lista_productos,this.lista_cantidad_productos)
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

    llenarArrays(){
        let longitud = this.lista_productos_temp.length;
        for(var i = 0; i< longitud; i++){
            this.lista_productos.push(this.lista_productos_temp[i]);
            this.lista_cantidad_productos.push(this.lista_cantidad_productos_temp[i]);
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_COMPRA]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_COMPRA]);
    }
}


