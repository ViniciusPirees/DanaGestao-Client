import { Service } from 'node-windows'

var svc = new Service({
 name:'DanaGestaoClient',
 description:'Inicializar o DanaGestaoClient.',
 script: 'C:\\Balthatec\\DanaGestao-main\\client\\init.js'
});

svc.on('install',function(){
 svc.start();
});

svc.install();