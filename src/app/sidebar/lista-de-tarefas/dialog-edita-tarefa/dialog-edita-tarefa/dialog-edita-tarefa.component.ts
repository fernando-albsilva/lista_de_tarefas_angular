import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from 'src/app/services/tarefa.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-edita-tarefa',
  templateUrl: './dialog-edita-tarefa.component.html',
  styleUrls: ['./dialog-edita-tarefa.component.scss']
})
export class DialogEditaTarefaComponent implements OnInit {
  
  @Output() fechaDialog = new EventEmitter<string>();
  @Output() fechaDialogInfoBox = new EventEmitter<string>();
  

  @Input() indiceTarefaEdicao:string = '';
 
  private tarefaNova:TarefaModel = new TarefaModel();
  private tarefa:TarefaModel = new TarefaModel();

  tarefaForm: FormGroup;

  tarefa_nome:string='';
  tarefa_prioridade:string='';
  tarefa_descricao:string='';

  edicao:string="editou";

  constructor(
    private tarefaService:TarefaService,
    private formBuilder:FormBuilder) 
    {

      this.tarefaForm = this.formBuilder.group({
        prioridadeTarefa:['', Validators.required],
        nomeTarefa:['',  Validators.compose([Validators.required,  Validators.maxLength(250)])],
        descricaoTarefa:['',Validators.required]
      });

   }

    ngOnInit(): void {
      console.log("this.indiceTarefaEdicao");
      console.log(this.indiceTarefaEdicao);
      this.tarefaService.emitirTarefaEdicaoModal.subscribe((indiceTarefa:string)=>{
        this.atualizaDialog(indiceTarefa);
      });
    }

    
   onSubmit(){

    this.tarefaNova.nomeTarefa=this.tarefaForm.value.nomeTarefa;
    this.tarefaNova.prioridade=this.tarefaForm.value.prioridadeTarefa;
    this.tarefaNova.descricao=this.tarefaForm.value.descricaoTarefa;
    this.tarefaNova.id=this.tarefa.id;
    this.tarefaNova.horaIncio=this.tarefa.horaIncio;
    this.tarefaNova.minutoInicio=this.tarefa.minutoInicio;
    this.tarefaNova.segundoInicio=this.tarefa.segundoInicio;
    this.tarefaNova.horaFim=this.tarefa.horaFim;
    this.tarefaNova.minutoFim=this.tarefa.minutoFim;
    this.tarefaNova.segundoFim=this.tarefa.segundoFim;
    
    if((this.tarefaNova.nomeTarefa !== '') && (this.tarefaNova.prioridade !== '') && (this.tarefaNova.descricao !== '') )
    {
      
      this.tarefaService.editaTarefa(this.tarefaNova);
      this.tarefaNova=new TarefaModel();
      setTimeout( ()=> {
          this.tarefaNova.nomeTarefa='';
          this.tarefaNova.prioridade='';
          this.tarefaNova.descricao='';

      },100);

      this.fechaDialogInfoBox.emit();
      // this.fechaDialog.emit();
    }else{

      this.fechaDialog.emit();
    }


    

  }


  enviaEventoFechaDialog():void{
    this.fechaDialog.emit();
  }

  atualizaDialog(indiceTarefa:string)
  {
    this.tarefa=this.tarefaService.retornaTarefa(indiceTarefa);
    this.tarefa_nome=this.tarefa.nomeTarefa;
    this.tarefa_prioridade=this.tarefa.prioridade;
    this.tarefa_descricao=this.tarefa.descricao;
  }
}
