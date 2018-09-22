import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar , MdDialog } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloFinanzasService} from '../modulo.finanzas.services';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';


@Component({
    selector:'homeRemito',
    templateUrl: './home.remito.component.html',
    styleUrls:['./home.remito.component.css']
    
})

export class HomeRemitoComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipAgregarRemito = Constantes.LABEL_AGREGAR_REMITO;
    tooltipIrRemito = Constantes.LABEL_NAVEGAR_REMITO;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_remito = Constantes.LABEL_REMITO;
    label_detalle_remito = Constantes.LABEL_DETALLE_REMITO;
    label_codigo = Constantes.LABEL_CODIGO;
    label_fecha = Constantes.LABEL_FECHA;
    label_usuario = Constantes.LABEL_USUARIO;
    label_tipo_movimiento = Constantes.LABEL_TIPO_MOVIMIENTO;
    label_estado = Constantes.LABEL_ESTADO;
    label_productos = Constantes.LABEL_PRODUCTOS_REMITO;
    label_tabla_remito = Constantes.LABEL_BUSCAR_TABLA_REMITO;
    label_buscar_remito = Constantes.LABEL_BUSCAR_REMITO;
    label_accion = Constantes.LABEL_ACCION;
    remitos = [];
    remitos_detalles = [];
    remitos_temp = [];

    constructor(private router:Router,
                private moduloFinanzas: ModuloFinanzasService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_REMITO;
    }

    ngOnInit(){
        this.moduloFinanzas.obtenerRemitos()
        .then(
            response => {
                this.remitos = response.datos_operacion;
                for (var i = 0; i < this.remitos.length; i++){
                    this.remitos[i]['movimiento_cabecera']['fecha_creacion'] = this.remitos[i]['movimiento_cabecera']['fecha_creacion'].substring(0,10).concat('  ',this.remitos[i]['movimiento_cabecera']['fecha_creacion'].substring(11,19));
                }
                this.remitos_temp = [...this.remitos];
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
        const temp = this.remitos_temp.filter(function(d) {
            return d.movimiento_cabecera.usuario.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.remitos = temp;
      }

    apretarIrRemito(codigo){
        this.router.navigate([Constantes.URL_HOME_REMITO_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarRemito(){
        this.router.navigate([Constantes.URL_AGREGAR_REMITO]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }
}


