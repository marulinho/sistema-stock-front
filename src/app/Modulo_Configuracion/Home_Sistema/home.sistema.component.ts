import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Constantes } from '../../Datos_Sistema/constantes';
import { ModuloConfiguracionService } from '../modulo.configuracion.service';


@Component({
    selector:'homeSistema',
    templateUrl: './home.sistema.component.html',
    styleUrls:['./home.sistema.component.css']
    
})

export class HomeSistemaComponent implements OnInit{

  label_producto = Constantes.LABEL_HOME_PRODUCTO;
  label_detalle_producto = Constantes.DESCRIPCION_PRODUCTO;
  label_categoria = Constantes.LABEL_HOME_CATEGORIA;
  label_detalle_categoria = Constantes.DESCRIPCION_CATEGORIA;
  label_subcategoria = Constantes.LABEL_HOME_SUB_CATEGORIA;
  label_detalle_subcategoria = Constantes.DESCRIPCION_SUB_CATEGORIA;
  label_usuario = Constantes.LABEL_HOME_USUARIO;
  label_detalle_usuario = Constantes.DESCRIPCION_USUARIO;

  position = 'above';
  tooltipNavegarCategoria = Constantes.LABEL_NAVEGAR_CATEGORIA;
  tooltipNavegarSubCategoria = Constantes.LABEL_NAVEGAR_SUBCATEGORIA;
  tooltipNavegarProducto = Constantes.LABEL_NAVEGAR_PRODUCTO;
  tooltipNavegarUsuario = Constantes.LABEL_NAVEGAR_USUARIO;

    

    constructor(private router:Router,
                private moduloConfiguracion: ModuloConfiguracionService,
                private appService:AppService ){
                    
           appService.getState().topnavTitle = Constantes.LABEL_HOME_SISTEMA;
    }

    ngOnInit(){
        
    }


}


