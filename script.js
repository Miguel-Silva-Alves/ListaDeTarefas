var tarefas = []
// ao inves de deixar desse jeito criar uma tabela quando aperta no botao inserir ela inclui as coisas na tabela
// funçao criar linha na tabela que coloca o nome o os botões.
// aqui faz acrescentar a tarefa com enter
document.onkeydown=function(){
    if(window.event.keyCode=='13'){
        inserir_tarefa();
    }
}

function criar_tarefa_tabela(texto, aonde_por, id){ //id é o  length
    var li_tarefa = document.createElement("li")
    li_tarefa.setAttribute("id", `li_${id}`)
    li_tarefa.setAttribute("value", `${texto}`)
    var no_texto_tarefa = document.createTextNode(texto)
    li_tarefa.appendChild(no_texto_tarefa)
    
    console.log(li_tarefa)

    var button_feito = document.createElement('button');
    button_feito.setAttribute("id", `li_Bo_${id}`)
    button_feito.setAttribute('type','input')
    button_feito.setAttribute("onclick", `feito ('li_${id}')`)
    button_feito.appendChild(document.createTextNode('Concluído'))
    li_tarefa.appendChild(button_feito);

    var button_importante = document.createElement('button');
    button_importante.setAttribute("id", `li_Bo_${id}`)
    button_importante.setAttribute('type','input')
    button_importante.setAttribute("onclick", `importante ('li_${id}')`)
    button_importante.appendChild(document.createTextNode('Importante'))
    li_tarefa.appendChild(button_importante);

    var button_excluir = document.createElement('button')
    button_excluir.setAttribute('type','input')
    button_excluir.setAttribute("id", `li_Bo_${id}`)
    button_excluir.setAttribute("onclick", `excluir ('li_${id}')`)
    button_excluir.appendChild(document.createTextNode('Deletar'))
    li_tarefa.appendChild(button_excluir)

    aonde_por.appendChild(li_tarefa)

}

function inserir_tarefa() {
    var texto_tarefa = document.getElementById("txt_tarefa").value
    if (texto_tarefa.length == 0){
        alert("ERRO")
        
    }
   
    tarefas.push(texto_tarefa)
    
    var ul_tarefas = document.getElementById("ul_tarefas")
    criar_tarefa_tabela(texto_tarefa, ul_tarefas, tarefas.length)
    document.getElementById("txt_tarefa").value = ""

}


function ordenar(){
    var novvo = tarefas;
    novvo.sort();
    //alert(novvo)
    var aond = document.getElementById("tarefas_orde")
    for (var i = 0; i < novvo.length; i++){
        var no_novvo = document.createTextNode(novvo[i])
        criar_tarefa_tabela(no_novvo, aond, "a"+ i)
    }

    
    //for(var p = 0; p<aond.childNodes.length; p++){
        
        //var id_rem_ord = aond.childNodes[p].remove()
        //console.log(id_rem_ord)

        
            // função que remova

    
       
    }


    //for (var i = 0; i < novvo.length; i++){
        //criar_tarefa_tabela(novvo[i], aond, i)

    //}


function importante(id){

    var frase = document.getElementById(id)
        frase.style.background = "rgb(255, 17, 17)"
        frase.style.color = "white"
    var valor = document.getElementById(id).getAttribute("value")
    dayName = new Array ("domingo", "segunda", "terças-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado")
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho","agosto","setembro", "outubro", "novembro", "dezembro")
    now = new Date
    var data = ( dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName[now.getMonth() ]   +  " de "  +     now.getFullYear () + ". ")
    var hora = ( now.getHours() + "h " + now.getMinutes() + "min e " + now.getSeconds() + "s" )

    tabelaImp(valor, data, hora)
  
}

function feito(id){

    var frase = document.getElementById(id)
        frase.style.background = "rgb(0, 202, 0)"
        frase.style.color = "white"
    var valor = document.getElementById(id).getAttribute("value")
    dayName = new Array ("domingo", "segunda", "terças-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado")
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho","agosto","setembro", "outubro", "novembro", "dezembro")
    now = new Date
    var data = ( dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName[now.getMonth() ]   +  " de "  +     now.getFullYear () + ". ")
    var hora = ( now.getHours() + "h " + now.getMinutes() + "min e " + now.getSeconds() + "s" )
    console.log(valor)


    tabelaCon(valor, data, hora)
}

function excluir(id_rem){
    var li_rem = document.getElementById(id_rem)
    var valor = document.getElementById(id_rem).getAttribute("value")
    var pai = li_rem.parentNode
    pai.removeChild(li_rem)

    dayName = new Array ("domingo", "segunda", "terças-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado")
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho","agosto","setembro", "outubro", "novembro", "dezembro")
    now = new Date
    var data = ( dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName[now.getMonth() ]   +  " de "  +     now.getFullYear () + ". ")
    var hora = ( now.getHours() + "h " + now.getMinutes() + "min e " + now.getSeconds() + "s" )

    tabelaExc(valor, data, hora)



}


function tabelaCon(tarefa, data, horario){

    var myHtmlContent = `<td>${tarefa}</td><td>${data}</td><td>${horario}</td>`
    var tableRef = document.getElementById('tbCon').getElementsByTagName('tbody')[0];

    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
    
}

function tabelaImp(tarefa, data, horario){

    var myHtmlContent = `<td>${tarefa}</td><td>${data}</td><td>${horario}</td>`
    var tableRef = document.getElementById('tbImp').getElementsByTagName('tbody')[0];

    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
    
}


function tabelaExc(tarefa, data, horario){

    var myHtmlContent = `<td>${tarefa}</td><td>${data}</td><td>${horario}</td>`
    var tableRef = document.getElementById('tbExc').getElementsByTagName('tbody')[0];

    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
    
}
