import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { Utils } from '../../Datos_Sistema/utils';
import { ModuloReportesService } from '../modulo.reportes.services';


@Component({
    selector: 'ReporteGananciaProductos',
    templateUrl: './reporte.ganancia.productos.component.html',
    styleUrls: ['./reporte.ganancia.productos.component.css']

})

export class ReporteGananciaProductosComponent implements OnInit {

    errorMessage = '';
    snackBarRef: any;
    utils = new Utils();
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_fecha_desde = Constantes.LABEL_FECHA_DESDE;
    label_fecha_hasta = Constantes.LABEL_FECHA_HASTA;
    label_reporte_ganancia_productos = Constantes.LABEL_REPORTE_GANANCIA_PRODUCTOS;
    label_detalle_reporte_ganancia_productos = Constantes.DETALLE_REPORTE_GANANCIA_PRODUCTOS;
    label_ejemplo_reporte_ganancia_productos = Constantes.LABEL_EJEMPLO_REPORTE_GANANCIA_PRODUCTOS;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_ganancia = Constantes.LABEL_GANANCIA;
    label_peso = Constantes.LABEL_PESO;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;

    boton_obtener_reporte = Constantes.BOTON_BUSCAR;
    boton_salir = Constantes.BOTON_SALIR;


    fecha_desde ="";
    fecha_hasta ="";

    productos = [];
    productos_temp = [];



    constructor(private router: Router,
        private moduloReporte: ModuloReportesService,
        private snackBar: MdSnackBar,
        private appService: AppService) {

        appService.getState().topnavTitle = Constantes.LABEL_REPORTE_GANANCIA_PRODUCTOS;
    }

    ngOnInit() { }

    apretarObtenerReporte() {
        if (this.compararFechas() === true) {
            this.errorMessage = '';
            this.moduloReporte.obtenerReporteGananciaProductos(this.fecha_desde, this.fecha_hasta)
                .then(
                    response => {
                        this.productos = response.datos_operacion;
                        console.log(this.productos);
                        this.productos_temp = [...this.productos];
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

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_temp.filter(function(d) {
            return d.nombre[0].toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos = temp;
    }


    compararFechas() {
        if (this.fecha_desde === null || this.fecha_desde === '' || this.fecha_hasta === null || this.fecha_hasta === ''){
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        let resultado: boolean = true;
        let fechaInicializacion = [];
        let fechaInicial;
        fechaInicializacion = this.fecha_desde.split("-");
        fechaInicial = parseInt(fechaInicializacion[0] + "" + fechaInicializacion[1] + "" + fechaInicializacion[2]);

        let fechaFinalizacion = [];
        let fechaFinal;
        fechaFinalizacion = this.fecha_hasta.split("-");
        fechaFinal = parseInt(fechaFinalizacion[0] + "" + fechaFinalizacion[1] + "" + fechaFinalizacion[2]);

        if (fechaInicial > fechaFinal) {
            this.errorMessage = Constantes.ERROR_FECHA_DESDE_MAYOR_HASTA;
            resultado = false;
        }


        return resultado;
    }

    apretarAtras() {
        this.router.navigate([Constantes.URL_HOME_REPORTE]);
    }

    apretarSalir(){
        this.router.navigate([Constantes.URL_HOME_REPORTE]);
    }
}


