import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../Datos_Sistema/constantes';

@Component({
    selector: "app-dialog-editar-precio-combo",
    templateUrl: './dialog.editar.precio.combo.component.html',
    styleUrls: ['./dialog.editar.precio.combo.component.scss']
})
export class DialogEditarPrecioComboComponent implements OnInit {
    title: string;
    description: string;
    option1: string;
    option2: string;

    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
    label_margen_ganancia = Constantes.LABEL_MARGEN_GANANCIA;
    label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
    label_total = Constantes.LABEL_TOTAL;
    label_error_precios = Constantes.MENSAJE_PRECIO_VENTA_MENOR_COMPRA;
    label_error_total_combo = Constantes.MENSAJE_TOTAL_COMBO_INSUFICIENTE;
    label_peso = Constantes.LABEL_PESO;
    precio_compra:number;
    precio_venta:number;
    cantidad:number = 0;
    margen_ganancia:number = 0;

    constructor(private dialogRef: MdDialogRef<DialogEditarPrecioComboComponent>) {
    }

    ngOnInit(): void {}

    getPrecioVenta(){
        if(this.margen_ganancia === null){
            this.precio_venta = 0;
        }
        else{
            this.precio_venta = this.precio_compra * (1+this.margen_ganancia/100);
        }
        return (this.precio_venta.toFixed(2));
    }
    
    getVerificarPrecios(){
        if(this.precio_venta===0 || this.precio_venta >= this.precio_compra){
            return true;
        }
        else{
            return false;
        }
    }
    
    getPrecioTotal(){
        return (this.precio_venta * this.cantidad).toFixed(2);
    }
}
