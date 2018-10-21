import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { MdSnackBar } from '@angular/material';
import { Constantes } from '../Datos_Sistema/constantes';


@Component({
    selector:'homeReporte',
    templateUrl: './home.reporte.component.html',
    styleUrls:['./home.reporte.component.css']
    
})

export class HomeReporteComponent implements OnInit{
    
    errorMessage = '';
    snackBarRef: any;
    tooltipNavegarReporte = Constantes.LABEL_NAVEGAR_REPORTE;
    position = 'above';
    
    label_reporte_stock_minimo = Constantes.LABEL_REPORTE_STOCK_MINIMO;
    label_detalle_stock_minimo = Constantes.DETALLE_REPORTE_STOCK_MINIMO;
    label_reporte_compras_ventas = Constantes.LABEL_REPORTE_COMPRAS_VENTAS;
    label_detalle_compras_ventas = Constantes.DETALLE_REPORTE_COMPRAS_VENTAS;
    label_reporte_ganancia_productos = Constantes.LABEL_REPORTE_GANANCIA_PRODUCTOS;
    label_detalle_reporte_ganancia_productos = Constantes.DETALLE_REPORTE_GANANCIA_PRODUCTOS;


    constructor(private router:Router,
                private snackBar: MdSnackBar,
                private appService:AppService){
                    
           appService.getState().topnavTitle = Constantes.LABEL_REPORTES;
    }

    ngOnInit(){}

}


