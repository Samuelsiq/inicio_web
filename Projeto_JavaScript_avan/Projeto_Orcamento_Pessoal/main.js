class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for (const key in this) {
            if (this[key] == null || this[key] == "" || this[key] == undefined){
                return false
            }          
        }       
        return true 
    }
}
class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(id ===null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId)+1)
    }
    gravar(d){
        // localStorage.setItem('despesa',JSON.stringify(d))
        let id=this.getProximoId()
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id',id)
    }

    getRegistros(){
        let despesas = Array()
        let id = localStorage.getItem('id')
        for(let i=1; i<=id;i++){
            let despesa = JSON.parse(localStorage.getItem(i)) 
            if(despesa != null){
                despesa.id = i
                despesas.push(despesa)
            }
        }
        return despesas
    }
    pesquisa(despesa){
        let despesas = this.getRegistros()

        if(despesa.ano != ''){
            despesas = despesas.filter(d => d.ano == despesa.ano)
        }
        if(despesa.mes != ''){
            despesas = despesas.filter(d => d.mes == despesa.mes)
        }
        if(despesa.dia != ''){
            despesas = despesas.filter(d => d.dia == despesa.dia)
        }
        if(despesa.tipo != ''){
            despesas = despesas.filter(d => d.tipo == despesa.tipo)
        }
        if(despesa.descricao != ''){
            despesas = despesas.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor != ''){
            despesas = despesas.filter(d => d.valor == despesa.valor)
        }
        console.log(despesas)
        return despesas
    }
    remove(id){
        localStorage.removeItem(id)
    }
}
let bd = new Bd()
function cadastrarDespesa(){
    
    let ano= document.getElementById('ano')
    let mes= document.getElementById('mes')
    let dia= document.getElementById('dia')
    let tipo= document.getElementById('tipo')
    let descricao= document.getElementById('descricao')
    let valor = document.getElementById('valor')        

    let despesa = new Despesa(ano.value,
                            mes.value,
                            dia.value,
                            tipo.value,
                            descricao.value,
                            valor.value,)
    if(despesa.validarDados()){
        bd.gravar(despesa)
        document.getElementById('tituloGravacao').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modalCorpo').innerHTML = 'Despesa cadastrada com sucesso'
        document.getElementById('botaoPe').style.background = 'green' 
        $('#erroGravacao').modal('show')
        ano.value = ''
        mes.value = ''
        dia.value = '' 
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    }else{
        document.getElementById('tituloGravacao').innerHTML = 'Falha no registro'
        document.getElementById('modalCorpo').innerHTML = 'Houve uma falha na gravação da despesa'
        document.getElementById('botaoPe').style.background = 'red' 
        $('#erroGravacao').modal('show')
        
    }

            
}
function carregaListaDespesa(despesas = Array()){
    if(despesas.length == 0){
        despesas = bd.getRegistros()
    }

    let listaDespesa = document.getElementById('listaDespesa')
    listaDespesa.innerHTML = ''
    
    despesas.forEach(function(d){
        let tipos = ['','Alimentação', 'Educação','Lazer', 'Saúde','Transporte']
        let linha = listaDespesa.insertRow()
        linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano  
        linha.insertCell(1).innerHTML = tipos[d.tipo]
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        let butao = document.createElement('button')
        butao.className = 'btn btn-primary'
        butao.innerHTML = '<i class = "fas fa-times"></i>'
        butao.id = d.id
        butao.onclick = function(){
            bd.remove(butao.id)
            window.location.reload()
        }
        linha.insertCell(4).append(butao)
    })
}

function pesquisaDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisa(despesa)

    carregaListaDespesa(despesas)
   
}