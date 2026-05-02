
const button = document.querySelectorAll(".opener-dialog");
const popup = document.querySelectorAll(".popup");
const popupCerrar = document.querySelectorAll(".popup-cerrar");


for(let i=0;i<= button.length -1;i++)
{
    button[i].addEventListener("click", () => {
        //Ciera popup si esta abierto
        if (popup[i].open) {
            popup[i].close();
        } 


        else 
        {
            //El siguiente if cierra todos los popup que tengan la clase .popup-cerrar por si no se quiere tener ciertos popups al mismo tiempo abiertos.
            if(popup[i].classList.contains("popup-cerrar"))
            {
                for(let k=0; k<=popupCerrar.length -1;k++)
                {
                    if(popupCerrar[k].open)
                    {
                        popupCerrar[k].close();
                    }
                }
            }

            //Abre el popup
            popup[i].show();
        }
    })
}

