import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { ModuloFinanzasService } from '../../../Modulo_Finanzas/modulo.finanzas.services';
import { ModuloConfiguracionService } from '../../modulo.configuracion.service'
import { DialogSeleccionarProductoSorteoComponent } from './dialog-seleccionar-producto-sorteo/dialog.seleccionar.producto.sorteo.component';
import { DialogEditarCantidadSorteoComponent } from './dialog-editar-cantidad-sorteo/dialog.editar.cantidad.sorteo.component';
import { DialogRealizarSorteoComponent } from './dialog-realizar-sorteo/dialog.realizar.sorteo.component';
import { utils } from 'protractor';
import { Utils } from '../../../Datos_Sistema/utils';


@Component({
    selector: 'app-registrar-sorteo',
    templateUrl: './registrar.sorteo.component.html',
    styleUrls: ['./registrar.sorteo.component.scss']

})

export class RegistrarSorteoComponent implements OnInit {

    errorMessage = '';
    snackBarRef: any;
    selectedOption: string;
    utils = new Utils();
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO;
    tooltipEditarProducto = Constantes.LABEL_EDITAR_PRODUCTO;
    tooltipEliminarProducto = Constantes.LABEL_ELIMINAR_PRODUCTO;
    tooltipRealizarSorteo = Constantes.LABEL_SORTEAR;
    position = 'above';
    label_registrar_sorteo = Constantes.LABEL_REGISTRAR_SORTEO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_accion = Constantes.LABEL_ACCION;
    label_posicion = Constantes.LABEL_POSICION;
    label_lugar = Constantes.LABEL_LUGAR;
    label_ganador = Constantes.LABEL_GANANDOR;
    label_participantes = Constantes.LABEL_PARTICIPANTES;
    label_descripcion_participantes = Constantes.LABEL_DESCRIPCION_PARTICIPANTES;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;


    nombre: string;
    posicion: number;


    lista_precio = [];

    lista_sorteo = [];
    lista_sorteo_temp = [];
    lista_sorteo_enviar: Array<{posicion:number,
                                ganador:string,
                                producto:number,
                                cantidad:number}> = [];

    lista_productos = [];
    lista_ganadores =[];

    lista_cantidad_productos = [];
    lista_cantidad_productos_temp = [];



    constructor(private router: Router,
        private moduloFinanzas: ModuloFinanzasService,
        private moduloConfiguracion: ModuloConfiguracionService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog,
        private appService: AppService) {

        appService.getState().topnavTitle = Constantes.LABEL_REGISTRAR_SORTEO;
    }

    ngOnInit() {
        this.obtenerListaPrecios();
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

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.lista_sorteo_temp.filter(function (d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.lista_sorteo = temp;
    }

    apretarRealizarSorteo() {
        let dialogRef = this.dialog.open(DialogRealizarSorteoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_SORTEO;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_PARTICIPANTES;
        dialogRef.componentInstance.cantidad_premios = this.lista_sorteo.length;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.lista_ganadores = dialogRef.componentInstance.ganadores;
                }

            }
        );
    }


    apretarAgregarProducto() {
        let dialogRef = this.dialog.open(DialogSeleccionarProductoSorteoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_PRODUCTOS_DISPONIBLES;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_PRODUCTOS_DISPONIBLES_SORTEO;
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
                            this.lista_sorteo.push(dialogRef.componentInstance.productos[i]);
                            this.lista_cantidad_productos_temp.push(1);
                        }
                    }
                    this.lista_sorteo_temp = [...this.lista_sorteo];
                    this.sacarRepetidos();
                }

            }
        );
    }

    sacarRepetidos(){
        let longitud = this.lista_precio.length;
        let lista_aux = [];
        
        for(var i=0; i<longitud; i++){
            if(!(this.lista_sorteo.includes(this.lista_precio[i]))){
                lista_aux.push(this.lista_precio[i]);
            }
        }
        this.lista_precio = lista_aux;
    }  

    apretarEditarProductoSorteo(row) {
        let dialogRef = this.dialog.open(DialogEditarCantidadSorteoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.description = Constantes.DESCRIPCION_EDITAR_CANTIDAD_PRODUCTO;
        dialogRef.componentInstance.cantidad = this.lista_cantidad_productos_temp[row.$$index];
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
                }
        );
    }

    apretarEliminarProductoSorteo(row){
        this.lista_sorteo = this.lista_sorteo.filter(item => item.codigo_producto !== row.codigo_producto);
        this.lista_precio.push(row); 
        this.lista_sorteo_temp = [...this.lista_sorteo];
    }

    
    apretarRegistrarSorteo() {
        this.lista_sorteo_enviar = [];
        this.llenarArrays();
        let arraryVerificar = [];
        arraryVerificar.push(this.nombre);
        if(this.utils.verificarDatosIncompletos(arraryVerificar) === true){
            this.errorMessage=Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else{
            this.moduloConfiguracion.registrarSorteo(this.nombre,this.lista_sorteo_enviar)
            .then(
                response => {
                    this.router.navigate([Constantes.URL_HOME_SORTEO]);
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
    }

    llenarArrays() {
        let longitud = this.lista_sorteo.length;
        for (var i = 0; i < longitud; i++) {
            this.lista_sorteo_enviar.push({ posicion:i+1,
                                            ganador:this.lista_ganadores[i],
                                            producto:this.lista_sorteo[i]['codigo_producto'],
                                            cantidad:this.lista_cantidad_productos_temp[i]});
        }
    }

    apretarSalir() {
        this.router.navigate([Constantes.URL_HOME_SORTEO]);
    }

    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME_SORTEO]);
    }
}


