import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService} from '../modulo.configuracion.service';

@Component({
    selector:'homeProducto',
    templateUrl: './home.producto.component.html',
    styleUrls:['./home.producto.component.css']
    
})

export class HomeProductoComponent implements OnInit{
    
    errorMessageProducto = '';
    snackBarRef: any;
    tooltipAgregarProducto = Constantes.LABEL_AGREGAR_PRODUCTO;
    tooltipIrProducto = Constantes.LABEL_NAVEGAR_PRODUCTO;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_producto = Constantes.LABEL_PRODUCTO;
    label_detalle_producto = Constantes.DESCRIPCION_PRODUCTO;
    label_tabla_producto = Constantes.LABEL_BUSCAR_TABLA_PRODUCTO;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_marca = Constantes.LABEL_MARCA;
    label_medida = Constantes.LABEL_MEDIDA;
    label_unidad_medida = Constantes.LABEL_UNIDAD_MEDIDA;
    label_codigo = Constantes.LABEL_CODIGO;
    label_buscar_producto = Constantes.LABEL_BUSCAR_PRODUCTO;
    productos = [];
    productos_temp = [];
    
    constructor(private router:Router,
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_PRODUCTO;
    }

    ngOnInit(){
        this.moduloConfiguracion.obtenerProductos()
        .then(
            response => {
                this.productos = response.datos_operacion;
                this.productos_temp = [...response.datos_operacion];
            }
        )
        .catch(
            error => {
                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                    this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, {duration: 3000,});
                    this.router.navigate([Constantes.URL_LOGIN]);
                }
                else{
                    this.errorMessageProducto = error.error_description;
                }

            }
        );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.productos_temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.productos = temp;
      }

    apretarIrProducto(codigo){
        this.router.navigate([Constantes.URL_HOME_PRODUCTO_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarProducto(){
        this.router.navigate([Constantes.URL_AGREGAR_PRODUCTO]);
    }
    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }
}


