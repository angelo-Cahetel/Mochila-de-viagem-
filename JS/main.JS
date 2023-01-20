const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento (elemento)
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    const existe = itens.find(elemento => elemento.nome === nome.value)
    const itemAtual = {
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)
        // buscando o elemento correto
        itens[itens.findIdex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0;
        
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})
//criando e manipulando elemento
function criaElemento(item) {
    const novoIntem = document.createElement('li')
    novoIntem.classList.add("item")
    const numeroItem = document.createElement('strong')

    numeroItem.innerHTML = item.quantidade 
    numeroItem.dataset.id = item.id

    novoIntem.appendChild(numeroItem)
    novoIntem.innerHTML += item.nome
    novoIntem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoIntem)


}

function atualizaElemento(item) {
    Document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}
//excluindo elemento
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"
    //eu quero saber o elemento clicado
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}
//deletando um elemento
function deletaElemento(tag, id) {
    tag.remove()
    
    //remover um item do array 
    itens.splice(itens.findIdex(elemento => elemento.id === id), 1)
    // escrever no local storage
    localStorage.setItem("itens", JSON.stringify(itens))
}