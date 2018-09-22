import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService } from '../../../Modulo_Configuracion/modulo.configuracion.service';
import { ModuloFinanzasService } from '../../modulo.finanzas.services';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';


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
    
    lista_precio = [];
    lista_precio_temp = [];

    lista_productos = [];
    lista_productos_temp = [];
    lista_cantidad_productos = [];
    lista_cantidad_productos_temp = [];



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
        this.moduloConfiguracion.obtenerListaPrecioVigente()
            .then(
                response => {
                    let longitud = response.datos_operacion['lista_precio_detalles'].length;
                    
                    for(var i = 0; i<longitud; i++){
                        if(response.datos_operacion['lista_precio_detalles'][i]['stock_deposito']>0){
                            this.lista_precio.push(response.datos_operacion['lista_precio_detalles'][i]);
                            this.lista_cantidad_productos_temp.push(0);
                        }
                    }

                    this.lista_precio_temp = [...response.datos_operacion];
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
            return d.producto_nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.lista_precio = temp;
    }

    apretarEditarProductoRemito(row) {
        this.openDialogEditarProducto(row);
    }

    openDialogEditarProducto(row) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.descipcion_lista_precio = Constantes.DESCRIPCION_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.cantidad = this.lista_cantidad_productos_temp[row.$$index];
        dialogRef.componentInstance.remito_seleccionado = true;
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
                        let codigo_producto = this.lista_precio[row.$$index]['codigo_producto']
                        this.lista_productos_temp.push(codigo_producto);
                        this.lista_cantidad_productos_temp[row.$$index] = dialogRef.componentInstance.cantidad;
                        
                    }
                }
                
            }
        );
    }

    apretarRegistrarRemito(){
        this.lista_cantidad_productos = [];
        this.lista_productos = [];
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

    llenarArrays(){
        let longitud = this.lista_precio.length;
        for(var i = 0; i< longitud; i++){
            this.lista_productos.push(this.lista_productos_temp[i]);
            this.lista_cantidad_productos.push(this.lista_cantidad_productos_temp[i]);
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_REMITO]);
    }

    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME_REMITO]);
    }


}



