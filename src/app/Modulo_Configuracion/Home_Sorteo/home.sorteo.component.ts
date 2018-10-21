import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Constantes } from '../../Datos_Sistema/constantes';
import { MdSnackBar } from '@angular/material';
import { ModuloConfiguracionService } from '../modulo.configuracion.service';

@Component({
    selector:'homeSorteo',
    templateUrl: './home.sorteo.component.html',
    styleUrls:['./home.sorteo.component.css']
    
})

export class HomeSorteoComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipAgregarSorteo = Constantes.LABEL_AGREGAR_SORTEO;
    tooltipIrSorteo = Constantes.LABEL_NAVEGAR_SORTEO;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_sorteo = Constantes.LABEL_SORTEO;
    label_detalle_sorteo = Constantes.LABEL_DETALLE_SORTEO;
    label_buscar_sorteo = Constantes.LABEL_BUSCAR_SORTEO;
    label_tabla_sorteo = Constantes.LABEL_BUSCAR_TABLA_SORTEO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_fecha = Constantes.LABEL_FECHA;
    label_accion = Constantes.LABEL_ACCION;

    sorteos = [];
    sorteos_temp = [];

    constructor(private route: ActivatedRoute,
                private router: Router, 
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private appService:AppService){
            
                appService.getState().topnavTitle = Constantes.LABEL_SORTEO;
    }

    ngOnInit(){
        this.moduloConfiguracion.obtenerSorteos()
            .then(
                response=>{
                    this.sorteos = response.datos_operacion;
                    for (var i = 0; i < this.sorteos.length; i++){
                        this.sorteos[i]['fecha_creacion'] = this.sorteos[i]['fecha_creacion'].substring(0,10).concat('  ',this.sorteos[i]['fecha_creacion'].substring(11,19));
                    }
                    this.sorteos_temp = [...this.sorteos];
                }
            )
            .catch(
                error => {
                    if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                        this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, {duration: 3000,});
                        this.router.navigate([Constantes.URL_LOGIN]);
                    }
                    else{
                        this.errorMessage = error.error_description;
                    }
    
                }
            );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.sorteos_temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.sorteos = temp;
      }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }

    apretarIrSorteo(codigo){
        this.router.navigate([Constantes.URL_HOME_SORTEO_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarSorteo(){
        this.router.navigate([Constantes.URL_AGREGAR_SORTEO]);
    }
    
}


