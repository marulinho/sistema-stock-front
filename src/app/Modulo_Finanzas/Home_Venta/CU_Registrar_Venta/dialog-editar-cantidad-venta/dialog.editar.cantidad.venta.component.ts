import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../Datos_Sistema/constantes';

@Component({
    selector: "app-dialog-editar-cantidad-venta",
    templateUrl: './dialog.editar.cantidad.venta.component.html',
    styleUrls: ['./dialog.editar.cantidad.venta.component.scss']
})
export class DialogEditarCantidadVentaComponent implements OnInit {
    title: string;
    description: string;
    option1: string;
    option2: string;
    
    label_stock_final = Constantes.LABEL_STOCK_FINAL;
    label_stock_local = Constantes.LABEL_STOCK_LOCAL;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_error_cantidad = Constantes.MENSAJE_CANTIDAD_INSUFICIENTE;
    label_error_cantidad_stock = Constantes.MENSAJE_STOCK_FINAL_INSUFICIENTE;

    cantidad: number;
    stock_local: number;
    combo:boolean;

    constructor(private dialogRef: MdDialogRef<DialogEditarCantidadVentaComponent>) {
    }

    ngOnInit(): void {}

    getStockFinal(){
        return (this.stock_local - this.cantidad);
    }
    
}
