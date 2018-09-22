import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar , MdDialog } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloFinanzasService} from '../modulo.finanzas.services';
import { DialogExampleComponent } from '../../shared/dialog/dialog-example/dialog-example.component';


@Component({
    selector:'homeVenta',
    templateUrl: './home.venta.component.html',
    styleUrls:['./home.venta.component.css']
    
})

export class HomeVentaComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipAgregarVenta = Constantes.LABEL_AGREGAR_VENTA;
    tooltipIrVenta = Constantes.LABEL_NAVEGAR_VENTA;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_venta = Constantes.LABEL_VENTA;
    label_detalle_venta = Constantes.LABEL_DETALLE_VENTA;
    label_codigo = Constantes.LABEL_CODIGO;
    label_fecha = Constantes.LABEL_FECHA;
    label_total = Constantes.LABEL_TOTAL;
    label_peso = Constantes.LABEL_PESO;
    label_tipo_movimiento = Constantes.LABEL_TIPO_MOVIMIENTO;
    label_usuario = Constantes.LABEL_USUARIO;
    label_estado = Constantes.LABEL_ESTADO;
    label_tabla_venta = Constantes.LABEL_BUSCAR_TABLA_VENTA;
    label_buscar_venta = Constantes.LABEL_BUSCAR_VENTA;
    label_accion = Constantes.LABEL_ACCION;
    ventas = [];
    ventas_temp = [];
    

    constructor(private router:Router,
                private moduloFinanzas: ModuloFinanzasService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_VENTA;
    }

    ngOnInit(){
        this.moduloFinanzas.obtenerVentas()
        .then(
            response => {
                this.ventas = response.datos_operacion;
                for (var i = 0; i < this.ventas.length; i++){
                    this.ventas[i]['fecha_creacion'] = this.ventas[i]['fecha_creacion'].substring(0,10).concat('  ',this.ventas[i]['fecha_creacion'].substring(11,19));
                }
                this.ventas_temp = [...response.datos_operacion];
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
        const temp = this.ventas_temp.filter(function(d) {
            return d.usuario.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.ventas = temp;
      }

    apretarIrVenta(codigo){
        this.router.navigate([Constantes.URL_HOME_VENTA_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarVenta(){
        this.router.navigate([Constantes.URL_AGREGAR_VENTA]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }
}


