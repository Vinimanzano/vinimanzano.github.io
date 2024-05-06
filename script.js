// DATA AUTOMATICA
function getCurrentYear() {
    return new Date().getFullYear();
}

function updateCopyright() {
    var year = getCurrentYear();
    var copyrightText = "Copyright © " + year + " by Vinícius Manzano | All Rights Reserved.";
    document.getElementById("copyright").innerHTML = copyrightText;
}

window.onload = function() {
    updateCopyright();
};

