import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService} from '../modulo.configuracion.service';

@Component({
    selector:'homeSubCategoria',
    templateUrl: './home.subcategoria.component.html',
    styleUrls:['./home.subcategoria.component.css']
    
})

export class HomeSubCategoriaComponent implements OnInit{
    
    errorMessageSubCategoria = '';
    snackBarRef: any;
    tooltipAgregarSubCategoria = Constantes.LABEL_AGREGAR_CATEGORIA;
    tooltipAtras = Constantes.LABEL_NAVEGAR_ATRAS;
    position = 'above';
    label_subcategoria = Constantes.LABEL_SUBCATEGORIA;
    label_detalle_subcategoria = Constantes.DESCRIPCION_SUB_CATEGORIA;
    label_tabla_subcategoria = Constantes.LABEL_BUSCAR_TABLA_SUBCATEGORIA;
    label_nombre = Constantes.LABEL_NOMBRE;
    label_descripcion = Constantes.LABEL_DESCRIPCION;
    label_codigo = Constantes.LABEL_CODIGO;
    label_navegar_subcategoria = Constantes.LABEL_NAVEGAR_SUBCATEGORIA;
    subcategorias = [];
    subcategorias_temp = [];


    label_productos_subcategoria = Constantes.LABEL_PRODUCTOS_SUBCATEGORIA;

    

    constructor(private router:Router,
                private moduloConfiguracion: ModuloConfiguracionService,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_SUBCATEGORIA;
    }

    ngOnInit(){
        this.moduloConfiguracion.obtenerSubCategorias()
        .then(
            response => {
                this.subcategorias = response.datos_operacion;
                this.subcategorias_temp = [...response.datos_operacion];
            }
        )
        .catch(
            error => {
                if (error.error_description == Constantes.ERROR_NO_INICIO_SESION) {
                    this.snackBarRef = this.snackBar.open(Constantes.MENSAJE_NO_INICIO_SESION, Constantes.MENSAJE_OK, {duration: 3000,});
                    this.router.navigate([Constantes.URL_LOGIN]);
                }
                else{
                    this.errorMessageSubCategoria = error.error_description;
                }

            }
        );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.subcategorias_temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.subcategorias = temp;
      }

    apretarIrSubCategoria(codigo){
        this.router.navigate([Constantes.URL_HOME_SUBCATEGORIA_DETALLE+'/'+codigo+'/']);
    }

    apretarAgregarSubCategoria(){
        this.router.navigate([Constantes.URL_AGREGAR_SUBCATEGORIA]);
    }

    apretarAtras(){
        this.router.navigate([Constantes.URL_HOME]);
    }
}


