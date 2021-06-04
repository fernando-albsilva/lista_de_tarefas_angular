export class JornadaModel {

    private _tipo: string ='';
    private _registro : string  ='';
    private _data : string  = '';
    private _horaInicio:number = 0;
    private _minutoInicio:number = 0;
    private _segundoInicio:number = 0;
    private _horaFim:number = 0;
    private _minutoFim:number = 0;
    private _segundoFim:number = 0;
    
    private _id: string = '';
    private _duracao:string  = '00:00:00';

    constructor () {}

    get tipo() { return this._tipo};
    get registro() { return this._registro};
    get data() { return this._data};
    get horaIncio() { return this._horaInicio};
    get minutoInicio() { return this._minutoInicio};
    get segundoInicio() { return this._segundoInicio};
    get horaFim() { return this._horaFim};
    get minutoFim() { return this._minutoFim};
    get segundoFim() { return this._segundoFim};
    get id() { return this._id};
    get duracao() { return this._duracao};
   
    
    set tipo( tipoJornada : string ) { this._tipo = tipoJornada };
    set registro( registro : string ) { this._registro = registro};
    set data( data : string ) { this._data = data};
    set horaIncio( horaIncio:number ) {  this._horaInicio = horaIncio };
    set minutoInicio( horaIncio:number ) {  this._minutoInicio=horaIncio};
    set segundoInicio( segundoInicio:number) {  this._segundoInicio=segundoInicio};
    set horaFim( horaFim:number) {  this._horaFim=horaFim};
    set minutoFim( minutoFim:number) {  this._minutoFim=minutoFim};
    set segundoFim( segundoFim:number) {  this._segundoFim=segundoFim};
    set id( idTarefa : string ) { this._id = idTarefa};
    set duracao( duracao : string ) { this._duracao = duracao};

}