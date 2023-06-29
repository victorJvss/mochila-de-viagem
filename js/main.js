const form = document.getElementById('novoItem');
const listaItem = document.getElementById('lista');
const lista = JSON.parse(localStorage.getItem("itens")) || []

lista.forEach((elemento) => { 
  criaElementos(elemento)
})

form.addEventListener('submit', (evento) => {
  evento.preventDefault()
  const nome = evento.target.elements["nome"]
  const quantidade = evento.target.elements["quantidade"]
  
  const existe = lista.find( elemento => elemento.nome === nome.value)
  
  const item = {
    "nome":nome.value,
    "quantidade":quantidade.value
  }
  

  if(existe){
    item.id = existe.id

    atualizaElemento(item)

    lista[lista.findIndex(elemento => elemento.id === existe.id)] = item
  
  }else{
  
    item.id = lista[lista.length - 1] ? lista[lista.length - 1].id + 1 : 0 
    
    criaElementos(item)
  
    lista.push(item)
  }

  localStorage.setItem("itens",JSON.stringify(lista))

  nome.value = ""
  quantidade.value = ""
  nome.focus()
})

function criaElementos(item){
  
  const itemLista = document.createElement("li")
  itemLista.classList.add("item")
  
  const numeroLista = document.createElement("strong")
  numeroLista.dataset.id = item.id
  numeroLista.innerHTML = item.quantidade
  
  itemLista.appendChild(numeroLista)
  itemLista.innerHTML += item.nome 
  
  itemLista.appendChild(botaoRemove(item.id))
  listaItem.appendChild(itemLista)
}

function atualizaElemento(item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoRemove(id){
  const botao = document.createElement("button")
  botao.value = "X"
  botao.style.background = "green"
  botao.style.height = "20px"

  botao.addEventListener("click", function(){
    removeItem(this.parentNode,id)
  })

  return botao
}

function removeItem(item,id){
  item.remove()

  lista.splice(lista.findIndex(elemento => elemento.id === id), 1)
  
  localStorage.setItem("itens",JSON.stringify(lista))
}
