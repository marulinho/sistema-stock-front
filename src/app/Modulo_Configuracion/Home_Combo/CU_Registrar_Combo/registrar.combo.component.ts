import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Constantes } from '../../../Datos_Sistema/constantes';
import { Utils } from '../../../Datos_Sistema/utils';
import { ModuloConfiguracionService } from '../../modulo.configuracion.service';
import { DialogExampleComponent } from '../../../shared/dialog/dialog-example/dialog-example.component';


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
    position = 'above';
    selectedOption: string;
    label_registrar_combo = Constantes.LABEL_REGISTRAR_COMBO;
    label_datos_obligatorios = Constantes.LABEL_DATOS_OBLIGATORIOS;
    label_datos_combo = Constantes.LABEL_DATOS_COMBO;

    label_nombre = Constantes.LABEL_NOMBRE;
    label_precio_combo = Constantes.LABEL_PRECIO_VENTA;
    boton_registrar = Constantes.BOTON_REGISTRAR;
    boton_salir = Constantes.BOTON_SALIR;

    //LISTA_PRECIO
    label_lista_precio = Constantes.LABEL_LISTA_PRECIO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    label_tabla_lista_precio = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
    label_margen_ganancia = Constantes.LABEL_MARGEN_GANANCIA;
    label_porcentaje = Constantes.LABEL_PORCENTAJE;
    label_peso = Constantes.LABEL_PESO;
    label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_descripcion_lista_precio_combo = Constantes.DESCRIPCION_LISTA_PRECIO_COMBO;
    label_accion = Constantes.LABEL_ACCION;
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO;
    lista_precio = [];
    lista_precio_temp = [];


    nombre: string;
    precio_combo: number;

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
                    this.lista_precio = response.datos_operacion;
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

    updateFilterListaPrecio(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.lista_precio_temp.filter(function (d) {
            return d['producto'].nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.lista_precio = temp;
    }

    updateFilterCombo(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_combo_temp.filter(function (d) {
            return d['producto'].nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos_combo = temp;
    }

    apretarAgregarProductoCombo(row) {
        this.openDialogAgregarProducto(Constantes.TITLE_ASIGNAR_PRODUCTO_COMBO, Constantes.PREGUNTA_ASIGNAR_PRODUCTO_COMBO, row);
    }


    openDialogAgregarProducto(title, description, row) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = description;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    let lista = [];
                    let longitud = this.lista_precio.length;
                    let codigo_producto = this.lista_precio[row.$$index]['producto']['codigo'];
                    for (var i = 0; i < longitud; i++) {
                        if (this.lista_precio[i]['producto']['codigo'] == codigo_producto) {
                            this.productos_combo.push(this.lista_precio[row.$$index]);
                            this.productos_combo_temp = [...this.productos_combo];
                            this.lista_cantidad_productos_temp.push(1);
                        }
                        else {
                            lista.push(this.lista_precio[i]);
                        }
                    }
                    this.lista_precio = lista;
                    this.lista_precio_temp = [...this.lista_precio];
                }
                
            }
        );
    }

    apretarEditarProductoCombo(row) {
        this.openDialogEditarProducto(Constantes.TITLE_EDITAR_PRECIO_LISTA, Constantes.DESCRIPCION_EDITAR_PRECIO_LISTA, row);
    }

    openDialogEditarProducto(title, description, row) {
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.descipcion_lista_precio = description;
        dialogRef.componentInstance.precio_compra = row.precio_unitario_compra;
        dialogRef.componentInstance.margen_ganancia = (row.precio_unitario_venta / row.precio_unitario_compra) - 1;
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
                        this.productos_combo[row.$$index]['precio_unitario_compra'] = dialogRef.componentInstance.precio_compra;
                        this.productos_combo[row.$$index]['precio_unitario_venta'] = dialogRef.componentInstance.precio_compra * (1 + dialogRef.componentInstance.margen_ganancia);
                        this.lista_cantidad_productos_temp[row.$$index] = dialogRef.componentInstance.cantidad;
                    }
                }
            }
        );
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
            let margen_ganancia = this.productos_combo[i]['precio_unitario_venta']/this.productos_combo[i]['precio_unitario_compra']-1;
            this.lista_productos.push(this.productos_combo[i]['producto']['codigo']);
            this.lista_margen_ganancia.push(margen_ganancia);
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



