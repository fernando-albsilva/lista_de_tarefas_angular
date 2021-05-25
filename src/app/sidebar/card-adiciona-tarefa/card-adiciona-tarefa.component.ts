import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup,FormBuilder} from '@angular/forms';
import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from 'src/app/services/tarefa.service';



@Component({
  selector: 'app-card-adiciona-tarefa',
  templateUrl: './card-adiciona-tarefa.component.html',
  styleUrls: ['./card-adiciona-tarefa.component.scss']
 
})


export class CardAdicionaTarefaComponent implements OnInit {

   
  // tarefa: TarefaModel = new TarefaModel();
  // tarefaService=new TarefaService();
  // submitted = false;
  // tarefaForm: FormGroup ;
  // formBuilder: FormBuilder = new FormBuilder();
  tarefaForm: FormGroup;

  constructor(
    private tarefaService:TarefaService,
    private tarefa:TarefaModel,
    private formBuilder:FormBuilder
    ) {

      this.tarefaForm = this.formBuilder.group({
          nomeTarefa:['', Validators.required],
          prioridadeTarefa:['', Validators.required],
          descricaoTarefa:['',Validators.required]
      });
      // this.tarefaForm({
      //   nomeTarefa:[],
      //   prioridade:[],
      //   tarefaDescricao:[]
      // });
    
    // console.log(this.tarefa.nomeTarefa);
   }

  ngOnInit(): void {
    
  }

   onSubmit(){
   
    // console.log(this.tarefaService._listaDeTarefas);
    this.tarefa.nomeTarefa=this.tarefaForm.value.nomeTarefa;
    this.tarefa.prioridade=this.tarefaForm.value.prioridadeTarefa;
    this.tarefa.descricao=this.tarefaForm.value.descricaoTarefa;
    if((this.tarefa.nomeTarefa !== '') && (this.tarefa.prioridade !== '') && (this.tarefa.descricao !== '') )
    {
      // console.log("objeto pronto");
     setTimeout( ()=> {
        this.tarefaService.adicionaTarefa(this.tarefa);
        this.tarefa.nomeTarefa='';
        this.tarefa.prioridade='';
        this.tarefa.descricao='';

     },100);
    }
    // this.tarefa.nomeTarefa='';
    // this.tarefa.prioridade='';
    // this.tarefa.descricao='';

    // console.log(this.tarefaService._listaDeTarefas);
    // if((this.tarefaForm.get('nomeTarefa') !== '') && (this.tarefaForm.prioridade !== '') && (this.tarefaForm.descricao !== '') )
    // {
    //   console.log("objeto pronto");
    //   this.tarefaService.adicionaTarefa(this.tarefa);
    // }
    // console.log("objeto Criado"+this.tarefa.nomeTarefa);
    // console.log("objeto Criado"+this.tarefa.descricao);
    // console.log("objeto Criado"+this.tarefa.prioridade);
  }




  // adicionaTarefa(){
  //   console.log("adicionou");
  // }

  // onSubmit(){
  //   if((this.tarefa.nomeTarefa !== '') && (this.tarefa.prioridade !== '') && (this.tarefa.descricao !== '') )
  //   {
  //     console.log("objeto pronto");
  //     this.tarefaService.adicionaTarefa(this.tarefa);
  //   }
  //   // console.log("objeto Criado"+this.tarefa.nomeTarefa);
  //   // console.log("objeto Criado"+this.tarefa.descricao);
  //   // console.log("objeto Criado"+this.tarefa.prioridade);
  // }

  // adicionaInputTarefa($event: any){

  //   console.log($event.target.name);
  //   console.log($event.target.value+' | ');
  //   if( $event.target.name === "nomeTarefa" )
  //   {
  //     this.tarefa.nomeTarefa = $event.target.value;
  //     console.log(this.tarefa.nomeTarefa);
  //   }else{
  //     if( $event.target.name === "prioridade" )
  //     {
  //       this.tarefa.prioridade = $event.target.value;
  //       console.log(this.tarefa.prioridade);
  //     }else{
  //       if( $event.target.name === "descricao" )
  //       {
          
  //       this.tarefa.descricao = $event.target.value;
  //       console.log(this.tarefa.descricao);
  //       }
  //     }
  //   }
    

  // }
}
