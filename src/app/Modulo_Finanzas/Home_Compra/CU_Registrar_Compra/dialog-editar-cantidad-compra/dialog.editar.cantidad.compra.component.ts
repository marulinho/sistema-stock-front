import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../Datos_Sistema/constantes';

@Component({
    selector: "app-dialog-editar-cantidad-compra",
    templateUrl: './dialog.editar.cantidad.compra.component.html',
    styleUrls: ['./dialog.editar.cantidad.compra.component.scss']
})
export class DialogEditarCantidadCompraComponent implements OnInit {
    title: string;
    description: string;
    option1: string;
    option2: string;
    
    label_stock_final = Constantes.LABEL_STOCK_FINAL;
    label_stock_actual = Constantes.LABEL_STOCK_ACTUAL;
    label_cantidad = Constantes.LABEL_CANTIDAD;
    label_error_cantidad = Constantes.MENSAJE_CANTIDAD_INSUFICIENTE;

    cantidad: number;
    stock_actual: number;
    stock_final: number;

    constructor(private dialogRef: MdDialogRef<DialogEditarCantidadCompraComponent>) {
    }

    ngOnInit(): void {}

    getStockFinal(){
        this.stock_final = this.cantidad + this.stock_actual;
        return this.stock_final;
    }
    
}
