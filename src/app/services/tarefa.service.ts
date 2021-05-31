import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from '@angular/core';
import { TarefaModel } from '../model/TarefaModel';


@Injectable({ providedIn: 'root' })
export class TarefaService {


    emitirTarefaAdicionada = new EventEmitter<any>();
    emitirTarefaPausada = new EventEmitter<any>();
    emitirTarefaDeletada = new EventEmitter<any>();
    emitirTarefaPendente = new EventEmitter<any>();
    emitirTarefaConcluida = new EventEmitter<any>();
    emitirTarefaIniciada = new EventEmitter<any>();

    private static _tarefaId: string = '0';
    private _listaDeTarefas: TarefaModel[] = [];



    constructor(private snackBar: MatSnackBar) { }

    get listaDeTarefas(): TarefaModel[] {

        return this._listaDeTarefas;
    }
  
    adicionaTarefa(tarefa: any): void {

        tarefa.id = this.adicionaTarefaId();
        this._listaDeTarefas.push(tarefa);
        
        this.emitirTarefaAdicionada.emit(tarefa);
        // this.emitirTarefaAdicionada.emit({
        //     nome_tarefa: (tarefa.nomeTarefa),
        //     prioridade: (tarefa.prioridade),
        //     descricao: (tarefa.descricao),
        //     indice: (tarefa.id)
        // });
        this.emitirTarefaPendente.emit(this.listaDeTarefas.length);
        this.mostraMensagem();

    }

    adicionaTarefaId() {

        let indice: number = parseInt(TarefaService._tarefaId);
        indice++;
        TarefaService._tarefaId = indice.toString();
        return TarefaService._tarefaId;
    }

    mostraMensagem(): void {

        this.snackBar.open('Tarefa adicionada com sucesso!', '', {
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "bottom"
        });
    }


    deleteTarefa(indice: string) {

        this._listaDeTarefas = this._listaDeTarefas.filter((element: any) => {

            console.log("indice a ser excluido:" + indice);
            // console.log(el);
            console.log("indice do elemento da lista: " + element._id);
            console.log(element._id !== indice);

            if(element._id === indice) {this.emitirTarefaDeletada.emit(element);}
            // this.emitirTarefaDeletada.emit();
            return element._id !== indice;
        });
        console.log("listaNova:" + this._listaDeTarefas);
        this.emitirTarefaPendente.emit(this.listaDeTarefas.length);
    }

    iniciarTarefa(indice: string) {

        // let tarefa: TarefaModel = new TarefaModel();
        this._listaDeTarefas.forEach((elemento) => {
            if (elemento.id === indice) {
                // tarefa = elemento; 

                this.incluiHoraMinSegInicio(elemento);
                this.emitirTarefaIniciada.emit(elemento);
            }
        });

        // this.incluiHoraMinSegInicio(tarefa);

        // this.emitirTarefaIniciada.emit(tarefa);

    }

    pausarTarefa(indice: string) {

        this.emitirTarefaPausada.emit(indice);
    }

    incluiHoraMinSegInicio(tarefa: TarefaModel) {
        let data = new Date();
        if ( (tarefa.horaIncio === 0) && (tarefa.minutoInicio === 0) && (tarefa.segundoInicio === 0) ){
            tarefa.horaIncio = data.getHours();
            tarefa.minutoInicio = data.getMinutes();
            tarefa.segundoInicio = data.getSeconds();
        }else{


            tarefa.horaIncio = data.getHours()- (tarefa.horaFim - tarefa.horaIncio);
            tarefa.minutoInicio = data.getMinutes() - (tarefa.minutoFim - tarefa.minutoInicio);
            tarefa.segundoInicio = data.getSeconds() - (tarefa.segundoFim - tarefa.segundoInicio);
        }
      
    }

    registraTempoTarefaAtiva(hora: number, minuto: number, segundo: number, indiceTarefa: string) {
        this._listaDeTarefas.forEach((elemento) => {
            if (elemento.id === indiceTarefa) {
                // elemento.horaIncio = hora;
                // elemento.minutoInicio = minuto;
                // elemento.segundoInicio = segundo;
               
                elemento.horaFim = hora;
                elemento.minutoFim = minuto;
                elemento.segundoFim = segundo;
            }
            
        });


    }
}