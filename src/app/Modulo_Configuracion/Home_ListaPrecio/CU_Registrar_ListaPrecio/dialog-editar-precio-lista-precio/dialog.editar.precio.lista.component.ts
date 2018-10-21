import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../Datos_Sistema/constantes';

@Component({
    selector: "app-dialog-editar-precio-lista",
    templateUrl: './dialog.editar.precio.lista.component.html',
    styleUrls: ['./dialog.editar.precio.lista.component.scss']
})
export class DialogEditarPrecioListaComponent implements OnInit {
    title: string;
    description: string;
    option1: string;
    option2: string;

    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
    label_margen_ganancia = Constantes.LABEL_MARGEN_GANANCIA;
    label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
    label_error_precio_ganancia = Constantes.MENSAJE_PRECIO_COMPRA_MARGEN_INSUFICIENTE;
    label_peso = Constantes.LABEL_PESO;
    precio_compra:number;
    precio_venta:number;
    margen_ganancia:number;

    constructor(private dialogRef: MdDialogRef<DialogEditarPrecioListaComponent>) {
    }

    ngOnInit(): void {}

    getPrecioTotal(){
        if(this.margen_ganancia === null || this.precio_compra === null){
            this.precio_venta = 0;
        }
        else{
            this.precio_venta = this.precio_compra * (1+this.margen_ganancia/100);
        }
        return (this.precio_venta.toFixed(2));
    }
}
