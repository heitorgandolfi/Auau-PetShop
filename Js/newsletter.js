let nlBackground = document.querySelector(".newsletter-background");

// Funcao que executa a troca do display do Newsletter apos o carregamento da pagina, tornando-o visivel
window.onload = () => {
    nlBackground.style.display = "flex";
    onLoadCartNumbers();
}

// Funcao para fechar o Newsletter
function closeNewsletter() {
    nlBackground.style.display = "none";
}

// Fechar ao clicar no "x"
let closeBtnX = document.querySelector(".newsletter-closeBtn");
closeBtnX.addEventListener("click", closeNewsletter);

// Interacoes junto ao newsletter
let subBtn = document.querySelector(".form-btn");
subBtn.addEventListener("click", newsletterInteraction);

function newsletterInteraction(subBtn) {

    let errMsg = document.querySelector(".newsletter-alert-err");
    let sucMsg = document.querySelector(".newsletter-alert-suc");
    let inputValue = document.querySelector(".form-input");

    subBtn.preventDefault();
    inputValue.value === "" ?
        (
            errMsg.style.display = "block",
            setTimeout(() => { errMsg.style.display = "none" }, 2000)
        ) : (
            localStorage.setItem("email", inputValue.value),
            sucMsg.style.display = "block",
            setTimeout(() => { sucMsg.style.display = "none" }, 1500),
            nlBackground.style.display = "none"
        )
};
