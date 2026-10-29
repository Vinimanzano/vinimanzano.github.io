// DATA AUTOMATICA
function getCurrentYear() {
    return new Date().getFullYear();
}

function updateCopyright() {
    var year = getCurrentYear();
    var isPt = (document.documentElement.lang || '').toLowerCase().indexOf('pt') === 0;
    var copyrightText = isPt
        ? "Copyright © " + year + " Vinícius Manzano | Todos os direitos reservados."
        : "Copyright © " + year + " by Vinícius Manzano | All Rights Reserved.";
    var el = document.getElementById("copyright");
    if (el) el.textContent = copyrightText;
}

window.addEventListener('load', updateCopyright);
