function getCurrentYear() {
    return new Date().getFullYear();
}

function updateCopyright() {
    const year = getCurrentYear();
    const copyrightText = `Copyright © ${year} Tour and Travel | All Rights Reserved.`;
    document.getElementById("copyright").innerHTML = copyrightText;
}

updateCopyright();