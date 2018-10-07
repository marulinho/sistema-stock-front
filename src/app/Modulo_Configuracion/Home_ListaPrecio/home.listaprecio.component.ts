import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { DialogYesNoComponent } from '../../Datos_Sistema/dialog-yes-no/dialog.yes.no.component';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService, Producto } from '../modulo.configuracion.service';

@Component({
    selector: 'homeListaPrecio',
    templateUrl: './home.listaprecio.component.html',
    styleUrls: ['./home.listaprecio.component.css']

})

export class HomeListaPrecioComponent implements OnInit {

    errorMessage = '';
    snackBarRef: any;
    selectedOption: string;
    tooltipAgregarListaPrecio = Constantes.LABEL_AGREGAR_LISTA_PRECIO;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_lista_precio = Constantes.LABEL_LISTA_PRECIO;
    label_detalle_lista_precio = Constantes.DESCRIPCION_LISTA_PRECIO;
    label_tabla_lista_precio = Constantes.LABEL_BUSCAR_TABLA_LISTA_PRECIO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_DESCRIPCION;
    label_medida = Constantes.LABEL_MEDIDA;
    label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
    label_margen_ganancia = Constantes.LABEL_MARGEN_GANANCIA;
    label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
    label_peso = Constantes.LABEL_PESO;
    label_porcentaje = Constantes.LABEL_PORCENTAJE;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    tooltipEliminarListaPrecio = Constantes.LABEL_ELIMINAR_LISTA_PRECIO;
    lista_precio_cabecera = [];
    lista_precio_detalles = [];
    lista_precio_detalles_temp = [];
    codigo_lista_precio: number;
    estado_lista_precio:string;


    constructor(private router: Router,
        private moduloConfiguracion: ModuloConfiguracionService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog,
        private appService: AppService) {

        appService.getState().topnavTitle = Constantes.LABEL_LISTA_PRECIO;
    }

    ngOnInit() {
        this.obtenerListaPrecios();
    }

    obtenerListaPrecios() {
        this.moduloConfiguracion.obtenerListaPrecioVigente()
            .then(
                response => {
                    this.lista_precio_cabecera = response.datos_operacion['lista_precio_cabecera'];
                    this.estado_lista_precio = this.lista_precio_cabecera['estado'];
                    this.codigo_lista_precio = this.lista_precio_cabecera['codigo'];
                    this.lista_precio_detalles = response.datos_operacion['lista_precio_detalles'];
                    this.lista_precio_detalles_temp = [...this.lista_precio_detalles];
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
        const temp = this.lista_precio_detalles_temp.filter(function (d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.lista_precio_detalles = temp;
    }
    
    getEstadoHabilitado(){
        if(this.estado_lista_precio === Constantes.ESTADO_HABILITADO){
            return true;
        }
        else{
            return false;
        }
    }

    apretarEliminarListaPrecio() {
        let dialogRef = this.dialog.open(DialogYesNoComponent);
        dialogRef.componentInstance.title = Constantes.TITLE_ELIMINAR_LISTA_PRECIO;
        dialogRef.componentInstance.description = Constantes.PREGUNTA_ELIMINAR_LISTA_PRECIO;
        dialogRef.componentInstance.option1 = Constantes.BOTON_ACEPTAR;
        dialogRef.componentInstance.option2 = Constantes.BOTON_CANCELAR;
        dialogRef.afterClosed().subscribe(
            result => {
                this.selectedOption = result;
                if (this.selectedOption === Constantes.OPCION_ACEPTAR) {
                    this.moduloConfiguracion.eliminarListaPrecio(this.codigo_lista_precio)
                        .then(
                            response => {
                                this.router.navigate([Constantes.URL_HOME_LISTA_PRECIO]);
                                this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_LISTA_PRECIO_ELIMINADA, Constantes.MENSAJE_OK, { duration: 3000, });
                                this.obtenerListaPrecios()
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
            });
    }

    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME]);
    }

    apretarAgregarListaPrecio() {
        this.router.navigate([Constantes.URL_AGREGAR_LISTA_PRECIO]);
    }
}


