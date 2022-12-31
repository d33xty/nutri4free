const tabela = document.querySelector(".table__body");

tabela.addEventListener("dblclick", function(event){
    event.target.parentNode.classList.add("fade");

    setTimeout(function(){
        event.target.parentNode.remove();
    }, 500);
})