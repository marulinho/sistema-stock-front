import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { Utils } from '../../Datos_Sistema/utils';
import { ModuloReportesService } from '../modulo.reportes.services';
import { BREAKPOINTS } from '@angular/flex-layout';


@Component({
    selector: 'ReporteComprasVentas',
    templateUrl: './reporte.compras.ventas.component.html',
    styleUrls: ['./reporte.compras.ventas.component.css']

})

export class ReporteComprasVentasComponent implements OnInit {

    errorMessage = '';
    snackBarRef: any;
    utils = new Utils();
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_fecha_desde = Constantes.LABEL_FECHA_DESDE;
    label_fecha_hasta = Constantes.LABEL_FECHA_HASTA;
    label_reporte_compras_ventas = Constantes.LABEL_REPORTE_COMPRAS_VENTAS;
    label_detalle_reporte_compras_ventas = Constantes.DETALLE_REPORTE_COMPRAS_VENTAS;
    label_ejemplo_reporte_compras_ventas = Constantes.LABEL_EJEMPLO_REPORTE_COMPRAS_VENTAS;
    label_compras = Constantes.LABEL_COMPRA;
    label_ventas = Constantes.LABEL_VENTA;
    label_balance = Constantes.LABEL_BALANCE;
    label_peso = Constantes.LABEL_PESO;

    boton_obtener_reporte = Constantes.BOTON_BUSCAR;
    boton_salir = Constantes.BOTON_SALIR;


    fecha_desde;
    fecha_hasta;
    compras: number = 0;
    ventas: number = 0;
    balance: number = 0;



    constructor(private router: Router,
        private moduloReporte: ModuloReportesService,
        private snackBar: MdSnackBar,
        private appService: AppService) {

        appService.getState().topnavTitle = Constantes.LABEL_REPORTE_COMPRAS_VENTAS;
    }

    ngOnInit() { }

    apretarObtenerReporte() {
        if (this.compararFechas() === true) {
            this.errorMessage = '';
            this.moduloReporte.obtenerReporteComprasVentas(this.fecha_desde, this.fecha_hasta)
                .then(
                    response => {
                        this.compras = response.datos_operacion['total_compras'];
                        this.ventas = response.datos_operacion['total_ventas'];
                        this.balance = Math.abs(response.datos_operacion['total_balance']);
                        this.errorMessage = '';
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

    compararFechas() {
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


