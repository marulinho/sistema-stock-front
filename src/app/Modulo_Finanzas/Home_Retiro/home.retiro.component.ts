import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar , MdDialog } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloFinanzasService} from '../modulo.finanzas.services';


@Component({
    selector:'homeRetiro',
    templateUrl: './home.retiro.component.html',
    styleUrls:['./home.retiro.component.css']
    
})

export class HomeRetiroComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipAgregarRetiro = Constantes.LABEL_AGREGAR_RETIRO;
    tooltipIrRetiro = Constantes.LABEL_NAVEGAR_RETIRO;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_retiro = Constantes.LABEL_RETIRO;
    label_detalle_retiro = Constantes.LABEL_DETALLE_RETIRO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_fecha = Constantes.LABEL_FECHA;
    label_total = Constantes.LABEL_TOTAL;
    label_peso = Constantes.LABEL_PESO;
    label_usuario = Constantes.LABEL_USUARIO;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    label_estado = Constantes.LABEL_ESTADO;
    label_tabla_retiro = Constantes.LABEL_BUSCAR_TABLA_RETIRO;
    label_buscar_retiro = Constantes.LABEL_BUSCAR_RETIRO;
    label_navegar_retiro = Constantes.LABEL_NAVEGAR_RETIRO;
    label_accion = Constantes.LABEL_ACCION;
    retiros = [];
    retiros_temp = [];
    

    constructor(private router:Router,
                private moduloFinanzas: ModuloFinanzasService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_RETIRO;
    }

    ngOnInit(){
        this.moduloFinanzas.obtenerRetiros()
        .then(
            response => {
                this.retiros = response.datos_operacion;
                for (var i = 0; i < this.retiros.length; i++){
                    this.retiros[i]['fecha_creacion'] = this.retiros[i]['fecha_creacion'].substring(0,10).concat('  ',this.retiros[i]['fecha_creacion'].substring(11,19));
                    let detalles = this.retiros[i]['descripcion'].split(' ');
                    let longitud_detalles = detalles.length;
                    let descripcion = '';
                    let separador = ' ';
                    for (var x = 3; x < longitud_detalles; x++){
                        descripcion = descripcion.concat(detalles[x],separador)//.concat(separador)
                        
                    }
                    this.retiros[i]['descripcion'] = descripcion;
                }
                this.retiros_temp = [...response.datos_operacion];
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
        const temp = this.retiros_temp.filter(function(d) {
            return d.usuario.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.retiros = temp;
      }

    apretarIrRetiro(codigo){
        this.router.navigate([Constantes.URL_HOME_RETIRO_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarRetiro(){
        this.router.navigate([Constantes.URL_AGREGAR_RETIRO]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }
}


