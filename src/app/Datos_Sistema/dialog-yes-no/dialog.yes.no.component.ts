import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../constantes';

@Component({
    selector:'dialog-yes-no',
    templateUrl: './dialog.yes.no.component.html',
    styleUrls:['./dialog.yes.no.component.scss']
})
export class DialogYesNoComponent implements OnInit {
    
    title: string;
    description: string;
    option1: string;
    option2: string;

    label_advertencia = Constantes.LABEL_ADVERTENCIA;
    mensaje_advertencia = Constantes.MENSAJE_ACCION_IRREVERSIBLE;

    
    constructor(private dialogRef: MdDialogRef<DialogYesNoComponent>) {
    }

    ngOnInit(): void {}
}

