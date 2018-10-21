import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService } from '../modulo.configuracion.service';

@Component({
    selector:'homeSorteoDetalle',
    templateUrl: './home.sorteo.detalle.component.html',
    styleUrls:['./home.sorteo.detalle.component.css']
    
})

export class HomeSorteoDetalleComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    codigo_sorteo : number;
    position = 'above';
    label_sorteo_detalle = Constantes.LABEL_SORTEO_DETALLE;
    label_codigo = Constantes.LABEL_CODIGO;
    label_fecha = Constantes.LABEL_FECHA;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_producto = Constantes.LABEL_PRODUCTO;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_ganador = Constantes.LABEL_GANANDOR;
    label_posicion = Constantes.LABEL_POSICION;
    label_lugar = Constantes.LABEL_LUGAR;    
    
    sorteo_cabecera = [];
    sorteo_detalles = [];
    
    
    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private appService:AppService){
            
                this.route.params.subscribe(params => {
                this.codigo_sorteo = (params['id_sorteo']) 
                this.obtenerSorteo();
                });    
                appService.getState().topnavTitle = Constantes.LABEL_SORTEO_DETALLE;
    }

    ngOnInit(){}

    obtenerSorteo() {
        this.moduloConfiguracion.obtenerSorteoId(this.codigo_sorteo)
            .then(
                response => {
                    this.sorteo_cabecera = response.datos_operacion['sorteo_cabecera'];
                    this.sorteo_cabecera['fecha_creacion'] = this.sorteo_cabecera['fecha_creacion'].substring(0,10).concat('  ',this.sorteo_cabecera['fecha_creacion'].substring(11,19));
                    this.sorteo_detalles= response.datos_operacion['sorteo_detalles'];
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

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_SORTEO]);
    }
    
    
}


