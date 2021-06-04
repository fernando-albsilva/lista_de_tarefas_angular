import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { TarefaModel } from '../model/TarefaModel';



@Injectable({ providedIn: 'root' })
export class TarefaService {


    emitirTarefaAdicionada = new EventEmitter<any>();
    emitirTarefaPausada = new EventEmitter<any>();
    emitirTarefaDeletada = new EventEmitter<any>();
    emitirTarefaConcluidaDeletada = new EventEmitter<any>();
    emitirTarefaPendente = new EventEmitter<any>();
    emitirTarefaConcluida = new EventEmitter<any>();
    emitirTarefaIniciada = new EventEmitter<any>();
    emitirTarefaEditada = new EventEmitter<any>();
    emitirTarefaFinalizada = new EventEmitter<any>();
    emitirTarefaEdicaoModal = new EventEmitter<any>();

    private static _tarefaId: string = '0';
    private _listaDeTarefas: TarefaModel[] = [];
    private _listaDeTarefasConcluidas: TarefaModel[] = [];


    
    constructor() { }

    get listaDeTarefas(): TarefaModel[] {

        return this._listaDeTarefas;
    }

    get listaDeTarefasConcluida(): TarefaModel[] {

        return this._listaDeTarefasConcluidas;
    }

    adicionaTarefa(tarefa: any): void {

        tarefa.id = this.adicionaTarefaId();
        this._listaDeTarefas.push(tarefa);

        this.emitirTarefaAdicionada.emit(tarefa);
        this.emitirTarefaPendente.emit(this.listaDeTarefas.length);
       

    }

    adicionaTarefaId() {

        let indice: number = parseInt(TarefaService._tarefaId);
        indice++;
        TarefaService._tarefaId = indice.toString();
        return TarefaService._tarefaId;
    }

    


    deleteTarefa(indice: string) {

        this._listaDeTarefas = this._listaDeTarefas.filter((element: any) => {

            if (element._id === indice)
            {
                 this.emitirTarefaDeletada.emit(element);
            }
           
            return element._id !== indice;
        
        });
        
        this.emitirTarefaPendente.emit(this.listaDeTarefas.length);
    }
  
    deleteTarefaConcluida(indice: string) {

        this._listaDeTarefasConcluidas = this._listaDeTarefasConcluidas.filter((element: any) => {

            return element._id !== indice;

        });
        this.emitirTarefaConcluidaDeletada.emit();
      
    }

    iniciarTarefa(indice: string) {

        this._listaDeTarefas.forEach((elemento) => {
            if (elemento.id === indice) { 

                this.incluiHoraMinSegInicio(elemento);
                this.emitirTarefaIniciada.emit(elemento);
            
            }
        });

    }

    pausarTarefa(indice: string) {

        this.emitirTarefaPausada.emit(indice);
    }

    incluiHoraMinSegInicio(tarefa: TarefaModel) {
        let data = new Date();
        if ((tarefa.horaIncio === 0) && (tarefa.minutoInicio === 0) && (tarefa.segundoInicio === 0)) {
            tarefa.horaIncio = data.getHours();
            tarefa.minutoInicio = data.getMinutes();
            tarefa.segundoInicio = data.getSeconds();
        } else {


            tarefa.horaIncio = data.getHours() - (tarefa.horaFim - tarefa.horaIncio);
            tarefa.minutoInicio = data.getMinutes() - (tarefa.minutoFim - tarefa.minutoInicio);
            tarefa.segundoInicio = data.getSeconds() - (tarefa.segundoFim - tarefa.segundoInicio);
        }

    }

    registraTempoTarefaAtiva(hora: number, minuto: number, segundo: number, indiceTarefa: string) {
        this._listaDeTarefas.forEach((elemento) => {
            if (elemento.id === indiceTarefa) {
                
                elemento.horaFim = hora;
                elemento.minutoFim = minuto;
                elemento.segundoFim = segundo;
                
            }

        });

    }

    emiteEventoAtualizaModalEdicao(indiceTarefaEdicao: string) {
        
        this.emitirTarefaEdicaoModal.emit(indiceTarefaEdicao);
    }

    retornaTarefa(indiceTarefa: String): TarefaModel {
        let tarefaEdicao: TarefaModel = new TarefaModel();

        this.listaDeTarefas.map((tarefa) => {
            if (tarefa.id === indiceTarefa) {
                tarefaEdicao = tarefa;
            }
        });

        return tarefaEdicao;
    }
  
    editaTarefa(tarefaNova: TarefaModel) {
        this._listaDeTarefas=this.listaDeTarefas.map((tarefa) => {
                                if (tarefa.id === tarefaNova.id) 
                                {
                                    return tarefaNova;
                                }
                                else
                                {
                                    return tarefa;
                                }
                            });
        this.emitirTarefaAdicionada.emit();
        this.emitirTarefaEditada.emit();
    }

    finalizarTarefa(indiceTarefa:string){
    
        this._listaDeTarefas= this.listaDeTarefas.filter((tarefa)=>{
            if (tarefa.id === indiceTarefa)
            {
               
                this._listaDeTarefasConcluidas.push(tarefa);
                setTimeout(()=>{
                    this.emitirTarefaFinalizada.emit(tarefa);
                    this.emitirTarefaPendente.emit(this.listaDeTarefas.length);
                },100);
                return false;
            }
            else{
                return true;
            }
        });

        
        
    }
}