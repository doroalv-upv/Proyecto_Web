const button = document.querySelectorAll(".opener-dialog");
const popup = document.querySelectorAll(".popup");
const botonesCerrar = document.querySelectorAll(".cerrar-popup");

for(let i=0;i<= button.length -1;i++)
{
    button[i].addEventListener("click", () => {
        //Ciera popup si esta abierto
        if (popup[i].open) {
            popup[i].close();
        } 
        else{
            //Abre el popup
            popup[i].show();
        }

        }
    )
}




for (let i = 0; i <= botonesCerrar.length - 1; i++) {
    botonesCerrar[i].addEventListener("click", () => {
        botonesCerrar[i].closest("dialog").close();
    });
}



