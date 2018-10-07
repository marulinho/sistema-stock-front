import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService } from '../../../Modulo_Configuracion/modulo.configuracion.service';
import { ModuloFinanzasService } from '../../modulo.finanzas.services';
import { DialogRegistrarRemitoComponent } from './dialog-registrar-remito/dialog-seleccionar-productos/dialog.registrar.remito.component';
import { DialogEditarCantidadRemitoComponent } from './dialog-registrar-remito/dialog-editar-cantidad/dialog.editar.cantidad.remito.component';


@Component({
    selector: 'app-registrar-remito',
    templateUrl: './registrar.remito.component.html',
    styleUrls: ['./registrar.remito.component.scss']

})

export class RegistrarRemitoComponent implements OnInit {

    snackBarRef: any;
    arrayVerificar = [];
    id_usuario = JSON.parse(localStorage.getItem('idUsuario'));
    utils = new Utils();
    errorMessage = '';
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    tooltipEditarProducto = Constantes.LABEL_EDITAR_PRODUCTO_CANTIDAD;
    tooltipEliminarProducto = Constantes.LABEL_ELIMINAR_PRODUCTO;
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO;
    position = 'above';
    selectedOption: string;
    label_registrar_remito = Constantes.LABEL_REGISTRAR_REMITO;
    label_datos_remito = Constantes.LABEL_DATOS_REMITO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_stock_deposito = Constantes.LABEL_STOCK_DEPOSITO;
    label_stock_local = Constantes.LABEL_STOCK_LOCAL;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_accion = Constantes.LABEL_ACCION;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;
    
    lista_productos_precio = [];

    lista_productos_remito = [];
    lista_productos_remito_temp = [];

    lista_productos = [];
    lista_cantidad_productos = [];



    constructor(private appService: AppService,
        private moduloConfiguracion: ModuloConfiguracionService,
        private moduloFinanzas: ModuloFinanzasService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog,
        private router: Router) {

        appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_REMITO;
    }

    ngOnInit() {
        this.obtenerListaPrecios();
    }

    obtenerListaPrecios() {
        //llamo a lista precio vigente, porque solo puedo crear remito de productos que tengan un precio.
        this.moduloConfiguracion.obtenerListaPrecioVigente()
            .then(
                response => {
                    let longitud = response.datos_operacion['lista_precio_detalles'].length;
                    
                    for(var i = 0; i<longitud; i++){
                        if(response.datos_operacion['lista_precio_detalles'][i]['stock_deposito']>0){
                            this.lista_productos_precio.push(response.datos_operacion['lista_precio_detalles'][i]);
                            //this.lista_cantidad_prp.push(0;
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
        const temp = this.lista_productos_remito_temp.filter(function (d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.lista_productos_remito = temp;
    }

    apretarAgregarProducto(){
        let dialogRef = this.dialog.open(DialogRegistrarRemitoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_PRODUCTOS_DISPONIBLES;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_PRODUCTOS_DISPONIBLES;
        dialogRef.componentInstance.productos = this.lista_productos_precio; 
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    let longitud = dialogRef.componentInstance.productos.length;
                    for(var i=0; i<longitud; i++){
                        if (dialogRef.componentInstance.productos[i]['checked']) {
                            this.lista_productos_remito.push(dialogRef.componentInstance.productos[i]);
                            this.lista_productos.push(this.lista_productos_remito[i]['codigo_producto']);
                            this.lista_cantidad_productos.push(1);
                        }
                    }
                    this.lista_productos_remito_temp = [...this.lista_productos_remito];
                    this.sacarRepetidos();        
                }
                
            }
        );
    }

    sacarRepetidos(){
        let longitud = this.lista_productos_precio.length;
        let lista_aux = [];
        for(var i=0; i<longitud; i++){
            if(!(this.lista_productos_remito.includes(this.lista_productos_precio[i]))){
                lista_aux.push(this.lista_productos_precio[i]);
            }
        }
        this.lista_productos_precio = lista_aux;
    }  
    
    apretarEditarProductoRemito(row) {
        let dialogRef = this.dialog.open(DialogEditarCantidadRemitoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.stock_deposito = row.stock_deposito;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    if (dialogRef.componentInstance.cantidad <= 0) {
                        //no editamos las cantidades del remito
                    }
                    else {
                        //let codigo_producto = this.lista_productos_remito[row.$$index]['codigo_producto']
                        //this.lista_productos.push(codigo_producto);
                        this.lista_cantidad_productos[row.$$index] = dialogRef.componentInstance.cantidad;
                    }
                }
                
            }
        );
    }

    apretarRegistrarRemito(){
        this.llenarArrays();
        if(this.lista_productos.length == this.lista_cantidad_productos.length){
            this.moduloFinanzas.registrarRemito(this.id_usuario,this.lista_productos,this.lista_cantidad_productos)
                .then(
                    response => {
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_REGISTRACION_EXITOSA, Constantes.MENSAJE_OK, { duration: 3000, });
                        this.router.navigate([Constantes.URL_HOME_REMITO]);
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

    apretarEliminarProductoRemito(codigo){
        let lista_cantidad_productos_aux = [];
        let lista_productos_precio_aux : Array<{codigo_producto:number,
            nombre_producto: string,
            marca_producto: string,
            nombre_medida: string,
            stock_deposito: number,
            stock_local: number}> = [];
        let lista_remito_aux = [];
        let longitud = this.lista_productos_remito.length;
    
        for(var i=0; i<longitud; i++){
            if(this.lista_productos_remito[i]['codigo_producto']  === codigo){
                lista_productos_precio_aux.push({codigo_producto:this.lista_productos_remito[i]['codigo_producto'],
                                                nombre_producto:this.lista_productos_remito[i]['nombre_producto'],
                                                marca_producto:this.lista_productos_remito[i]['marca_producto'],
                                                nombre_medida:this.lista_productos_remito[i]['nombre_medida'],
                                                stock_deposito:this.lista_productos_remito[i]['stock_deposito'],
                                                stock_local:this.lista_productos_remito[i]['stock_local']});
            }
            else{
                lista_cantidad_productos_aux.push(this.lista_cantidad_productos[i]);
                this.lista_productos_remito[i]['checked'] = false;
                lista_remito_aux.push(this.lista_productos_remito[i]);
            }
        }
        
        this.lista_productos_remito = lista_remito_aux;
        this.lista_productos_precio = this.lista_productos_precio.concat(lista_productos_precio_aux);
        this.lista_cantidad_productos = lista_cantidad_productos_aux;
        this.lista_productos_remito_temp = [...this.lista_productos_remito];
        
    }

    llenarArrays(){
        let longitud = this.lista_productos_remito.length;
        if(longitud === 0 || this.lista_productos_remito == null){
            this.errorMessage = Constantes.ERROR_CANTIDAD_INCOMPLETA;
        }
        for(var i = 0; i< longitud; i++){
            if(this.lista_cantidad_productos[i]<=0){
                this.lista_productos.pop();
                this.lista_cantidad_productos.pop();
            }
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_REMITO]);
    }

    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME_REMITO]);
    }


}



