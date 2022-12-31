const filtroTabela = document.querySelector(".header__input-search");

filtroTabela.addEventListener("input", function(){
    const pacientes = document.querySelectorAll(".paciente");
    if(this.value.length > 0){
        for (let i = 0; i < pacientes.length; i++) {
            const paciente = pacientes[i];
            const tdNome = paciente.querySelector(".table__body-item--nome");
            const expressao = RegExp(this.value, "i");
            if(!expressao.test(tdNome.textContent)){
                paciente.classList.add("invisivel")
            }
        }
    }else{
        for (let i = 0; i < pacientes.length; i++) {
            const paciente = pacientes[i];
            paciente.classList.remove("invisivel")
        }
    }
})