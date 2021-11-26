var tarefas = []
var tarefasDic = {}
var indexRowsNossos = []

//assim as tabelas ficam invisiveis
Mudarestado("divTabelaCon")
Mudarestado("divTabelaImp")
Mudarestado("divTabelaExc")
Mudarestado("divTabelaPrincipal")
// ao inves de deixar desse jeito criar uma tabela quando aperta no botao inserir ela inclui as coisas na tabela
// funçao criar linha na tabela que coloca o nome o os botões.
// aqui faz acrescentar a tarefa com enter
document.onkeydown=function(){
    if(window.event.keyCode=='13'){
        inserir_tarefa();
    }
}

//esconde ou mostra um elemento
function Mudarestado(el) {
    var display = document.getElementById(el).style.display;
    if(display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
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

//maior valor do dicionario -> não sabia se já existia kkkk
function maior(dic){
    var arr =  Object.keys( dic )
    var maior = 0
    for(var i = 0; i < arr.length; i++){
        if (parseInt(arr[i])>maior){
            maior = parseInt(arr[i])
        }
    }
    return maior + 1
}

//função que trata o dado inserido no input
function inserir_tarefa() {
    
    var texto_tarefa = document.getElementById("txt_tarefa").value
    if (texto_tarefa.length == 0){
        alert("ERRO")
    }
    

    var m = maior(tarefasDic)
    console.log("maior:"+m)

    if(m == 1){
        Mudarestado("divTabelaPrincipal")
        Mudarestado("semwork")
    }

    tarefasDic[m] = texto_tarefa
    console.log(tarefasDic)
    
   
    //tarefas.push(texto_tarefa)
    
    colocar_na_tabela_principal(texto_tarefa, m)
    document.getElementById("txt_tarefa").value = ""

}

//função que adiciona na tabela
function colocar_na_tabela_principal(texto, id){

    var button_feito = `<td class="buttonConcluir botoes_tabelas_principal" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="feito ('${id}')">Concluir</td>`
    
    var tableRef = document.getElementById('tbPrincipal').getElementsByTagName('tbody')[0];
    var newRow = tableRef.insertRow(tableRef.rows.length);
    var button_excluir = `<td class="buttonExcluir botoes_tabelas_principal" onclick="excluir ('${id}')">Excluir</td>`
    var button_importante = `<td class="buttonImportante botoes_tabelas_principal" onclick="importante ('${id}')">Importante</td>`

    indexRowsNossos.push(newRow.rowIndex)
    //<button id = 'prin${id}'></button>
    var myHtmlContent = `<td id = tdEspecifico${id}>${texto}</td>${button_feito}${button_importante}${button_excluir}</td>`
    newRow.innerHTML = myHtmlContent;
    

    
}

function ordenar(){
    //encontrei um jeito de ordenar direto o par chave-valor
    //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    var novvo =  Object.entries( tarefasDic )
    novvo.sort(function(lista1, lista2){
        if(lista1[1] > lista2[1]){
            return 1;
        }else if (lista1[1] < lista2[1]) {
            return -1;
        }
        return 0;
    });
    
    /*
        como eu possuo a lista ordenada
        se eu utilizar a função de mudança de linha
        mando o ultimo para a primeira
        dps o segundo e assim sucessivamente
        garantindo a ordenação ;)
    */
    for (var i = novvo.length-1; i >=0; i--){
        console.log()
        ordena_row(novvo[i][0], false)
    }
       
}

//quando enviamos o importante para o primeiro lugar
//os rows ficam incorretos entre o row atual e o primeiro
function corrigirRowsImportante(indexAntigo, id){
    console.log('corrigindo...')
    console.log(tarefas)
    console.log('ANTES...'+indexRowsNossos)

    for(var i = 0; i<indexRowsNossos.length; i++){
        if(indexRowsNossos[i]<indexAntigo){
            indexRowsNossos[i] +=1;
        }
    }

    indexRowsNossos[id-1] = 1
    console.log('DEPOIS...'+indexRowsNossos)
}

//quando excluimos um row todos os seus anteriores 'subiram' uma posição
function corrigirRowsExcluir(indexExcluido){
    console.log('corrigindo EXCLUIDOS Rows...')
    console.log(tarefas)
    console.log('ANTES...'+indexRowsNossos)

    for(var i = 0; i<indexRowsNossos.length; i++){
        if(indexRowsNossos[i]>indexExcluido){
            indexRowsNossos[i] -=1;
        }
    }

    console.log('DEPOIS...'+indexRowsNossos)
}

//quando excluimos uma tarefa todos os seus anteriores 'subiram' uma posição
function corrigirTarefaExcluir(id){
    console.log('corrigindo EXCLUIDOS...')
    console.log('ANTES...'+tarefas)


    for(var i = 0; i<tarefas.length; i++){
        if(tarefas[i]>id){
            tarefas[i] -=1;
        }
    }

    console.log('DEPOIS...'+tarefas)
}



//recebe o id que será mandado para a primeira posição ;)
function ordena_row(id, icone){
    var indexRow = indexRowsNossos[id-1]

    console.log("ESCOLHIDO:"+indexRow)
    
    var rows = document.getElementById("tbPrincipal").rows
    console.log(rows)
    console.log(rows[indexRow])
    var parent = rows[indexRow].parentNode;

    parent.insertBefore(rows[indexRow],rows[1]);
    if(icone){
        var frase = document.getElementById("tdEspecifico"+id)
        var valor = frase.innerText

        frase.innerHTML = `<img src='imgs/arrow-up.png' width='15px'>${valor}`
        setTimeout(function(){
            frase.innerHTML = valor
        },5000);
    }
    //o index é modificado logo todos se alteram
    //precisa alterar os outros tbm
    corrigirRowsImportante(indexRow, id)
    
}


function importante(id){
    console.log("valor id:"+ id)
    ordena_row(id, true)
    

    //var frase = document.getElementById(id)
        //frase.style.background = "rgb(255, 17, 17)"
        //frase.style.color = "white"
    dayName = new Array ("domingo", "segunda", "terças-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado")
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho","agosto","setembro", "outubro", "novembro", "dezembro")
    now = new Date
    var data = ( dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName[now.getMonth() ]   +  " de "  +     now.getFullYear () + ". ")
    var hora = ( now.getHours() + "h " + now.getMinutes() + "min e " + now.getSeconds() + "s" )
    var valor = tarefasDic[id]
    tabelaImp(valor, data, hora)
  
}

//funcao que conclui
function feito(id){

    var valor = tarefasDic[id]

    var frase = document.getElementById("tdEspecifico"+id)
    frase.style.background = "rgb(0, 202, 0)"
    frase.style.color = "white"

    dayName = new Array ("domingo", "segunda", "terças-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado")
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho","agosto","setembro", "outubro", "novembro", "dezembro")
    now = new Date
    var data = ( dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName[now.getMonth() ]   +  " de "  +     now.getFullYear () + ". ")
    var hora = ( now.getHours() + "h " + now.getMinutes() + "min e " + now.getSeconds() + "s" )
    console.log(valor)


    tabelaCon(valor, data, hora)
}

//exclui da tabela
function excluir(id_rem){
    
    var indexRow = indexRowsNossos[id_rem-1]

    console.log(id_rem)
    
    var valor = tarefasDic[id_rem]
    
    //remove da lista Tarefas
    //remove da lista de rows -> pq n é mais um row
    console.log(tarefasDic)
    delete tarefasDic[id_rem]
    console.log(tarefasDic)

    var tamanho =  Object.keys( tarefasDic ).length
    if(tamanho==0){
        Mudarestado("divTabelaPrincipal")
        Mudarestado("semwork")
    }

    console.log(indexRowsNossos)
    rowExcluido = indexRowsNossos.splice(id_rem-1, 1);
    console.log(indexRowsNossos)

    corrigirRowsExcluir(rowExcluido)
    //corrigirTarefaExcluir(id)

    

    document.getElementById("tbPrincipal").deleteRow(indexRow);
    //precisa apagar da lista tarefas!


    dayName = new Array ("domingo", "segunda", "terças-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado")
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho","agosto","setembro", "outubro", "novembro", "dezembro")
    now = new Date
    var data = ( dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName[now.getMonth() ]   +  " de "  +     now.getFullYear () + ". ")
    var hora = ( now.getHours() + "h " + now.getMinutes() + "min e " + now.getSeconds() + "s" )

    tabelaExc(valor, data, hora)



}


function tabelaCon(tarefa, data, horario){
    var v = parseInt(document.getElementById('spanConcluidas').innerText)
    document.getElementById('spanConcluidas').innerText = v+1

    var myHtmlContent = `<td>${tarefa}</td><td>${data}</td><td>${horario}</td>`
    var tableRef = document.getElementById('tbCon').getElementsByTagName('tbody')[0];

    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
}

function tabelaImp(tarefa, data, horario){
    var v = parseInt(document.getElementById('spanImportantes').innerText)
    document.getElementById('spanImportantes').innerText = v+1
    var myHtmlContent = `<td>${tarefa}</td><td>${data}</td><td>${horario}</td>`
    var tableRef = document.getElementById('tbImp').getElementsByTagName('tbody')[0];

    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
    
}


function tabelaExc(tarefa, data, horario){
    var v = parseInt(document.getElementById('spanExcluidas').innerText)
    document.getElementById('spanExcluidas').innerText = v+1
    var myHtmlContent = `<td>${tarefa}</td><td>${data}</td><td>${horario}</td>`
    var tableRef = document.getElementById('tbExc').getElementsByTagName('tbody')[0];

    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
    
}
