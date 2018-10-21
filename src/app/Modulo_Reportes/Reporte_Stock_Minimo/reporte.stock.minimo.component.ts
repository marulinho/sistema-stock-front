import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloReportesService} from '../modulo.reportes.services';


@Component({
    selector:'ReporteStockMinimo',
    templateUrl: './reporte.stock.minimo.component.html',
    styleUrls:['./reporte.stock.minimo.component.css']
    
})

export class ReporteStockMinimoComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_reporte_stock_minimo = Constantes.LABEL_REPORTE_STOCK_MINIMO;
    label_detalle_reporte_stock_minimo = Constantes.DETALLE_REPORTE_STOCK_MINIMO;
    label_ejemplo_reporte_stock_minimo = Constantes.LABEL_EJEMPLO_REPORTE_STOCK_MINIMO;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_codigo = Constantes.LABEL_CODIGO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_stock_total = Constantes.LABEL_STOCK_FINAL;
    label_stock_minimo = Constantes.LABEL_STOCK_MINIMO;

    boton_obtener_reporte = Constantes.BOTON_BUSCAR;
    boton_salir = Constantes.BOTON_SALIR;
    
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    
    cantidad:number;

    productos = [];
    productos_temp = [];
    

    constructor(private router:Router,
                private moduloReporte: ModuloReportesService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_REPORTE_STOCK_MINIMO;
    }

    ngOnInit(){}

    apretarObtenerReporte(){
        if(this.cantidad < 0 || this.cantidad == null){
            this.errorMessage = Constantes.ERROR_CAMPOS_INCOMPLETOS;
        }
        else{
            this.errorMessage = '';
            this.moduloReporte.obtenerReporteStockMinimo(this.cantidad)
                .then(
                    response => {
                        this.productos = response.datos_operacion;
                        this.productos_temp = [...this.productos];
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
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_temp.filter(function(d) {
            return d.nombre_producto.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos = temp;
    }


    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME_REPORTE]);
    }

    apretarSalir(){
        this.router.navigate([Constantes.URL_HOME_REPORTE]);
    }
}


