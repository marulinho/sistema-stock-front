import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloFinanzasService} from '../modulo.finanzas.services';


@Component({
    selector:'homeCompra',
    templateUrl: './home.compra.component.html',
    styleUrls:['./home.compra.component.css']
    
})

export class HomeCompraComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipAgregarCompra = Constantes.LABEL_AGREGAR_COMPRA;
    tooltipIrCompra = Constantes.LABEL_NAVEGAR_COMPRA;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_compra = Constantes.LABEL_COMPRA;
    label_detalle_compra = Constantes.LABEL_DETALLE_COMPRA;
    label_codigo = Constantes.LABEL_CODIGO;
    label_fecha = Constantes.LABEL_FECHA;
    label_total = Constantes.LABEL_TOTAL;
    label_peso = Constantes.LABEL_PESO;
    label_usuario = Constantes.LABEL_USUARIO;
    label_tipo_movimiento = Constantes.LABEL_TIPO_MOVIMIENTO;
    label_proveedor = Constantes.LABEL_PROVEEDOR;
    label_estado = Constantes.LABEL_ESTADO;
    label_tabla_compra = Constantes.LABEL_BUSCAR_TABLA_COMPRA;
    label_buscar_compra = Constantes.LABEL_BUSCAR_COMPRA;
    label_navegar_compra = Constantes.LABEL_NAVEGAR_COMPRA;
    label_accion = Constantes.LABEL_ACCION;
    compras = [];
    compras_temp = [];
    

    constructor(private router:Router,
                private moduloFinanzas: ModuloFinanzasService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_COMPRA;
    }

    ngOnInit(){
        this.moduloFinanzas.obtenerCompras()
        .then(
            response => {
                this.compras = response.datos_operacion;
                for (var i = 0; i < this.compras.length; i++){
                    this.compras[i]['fecha_creacion'] = this.compras[i]['fecha_creacion'].substring(0,10).concat('  ',this.compras[i]['fecha_creacion'].substring(11,19));
                }
                this.compras_temp = [...response.datos_operacion];
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
        const temp = this.compras_temp.filter(function(d) {
            return d.usuario.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.compras = temp;
      }

    apretarIrCompra(codigo){
        this.router.navigate([Constantes.URL_HOME_COMPRA_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarCompra(){
        this.router.navigate([Constantes.URL_AGREGAR_COMPRA]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }
}


