export class JornadaModel {

    private _tipo: string ='';
    private _registro : string  ='';
    private _data : string  = '';
    private _horaInicio:number = 0;
    private _minutoInicio:number = 0;
    private _segundoInicio:number = 0;
    private _horarioCompletoInicio:string = '';
    private _horaFim:number = 0;
    private _minutoFim:number = 0;
    private _segundoFim:number = 0;
    private _horarioCompletoFim:string = '';
    
    private _id: string = '';
    private _duracao:string  = '00:00:00';
    private _finalizada:boolean  = false;

    constructor () {}

    get tipo() { return this._tipo};
    get registro() { return this._registro};
    get data() { return this._data};
    get horaIncio() { return this._horaInicio};
    get minutoInicio() { return this._minutoInicio};
    get segundoInicio() { return this._segundoInicio};
    get horarioCompletoInicio() { return this._horarioCompletoInicio};
    get horaFim() { return this._horaFim};
    get minutoFim() { return this._minutoFim};
    get segundoFim() { return this._segundoFim};
    get horarioCompletoFim() { return this._horarioCompletoFim};
    get id() { return this._id};
    get duracao() { return this._duracao};
    get finalizada() { return this._finalizada};
   
    
    set tipo( tipoJornada : string ) { this._tipo = tipoJornada };
    set registro( registro : string ) { this._registro = registro};
    set data( data : string ) { this._data = data};
    set horaIncio( horaIncio:number ) {  this._horaInicio = horaIncio };
    set minutoInicio( horaIncio:number ) {  this._minutoInicio=horaIncio};
    set segundoInicio( segundoInicio:number) {  this._segundoInicio=segundoInicio};
    set horarioCompletoInicio( horarioCompletoInicio:string) {  this._horarioCompletoInicio=horarioCompletoInicio};
    set horaFim( horaFim:number) {  this._horaFim=horaFim};
    set minutoFim( minutoFim:number) {  this._minutoFim=minutoFim};
    set segundoFim( segundoFim:number) {  this._segundoFim=segundoFim};
    set horarioCompletoFim( horarioCompletoFim:string) {  this._horarioCompletoFim=horarioCompletoFim};
    set id( idTarefa : string ) { this._id = idTarefa};
    set duracao( duracao : string ) { this._duracao = duracao};
    set finalizada( finalizada : boolean ) { this._finalizada = finalizada};

}