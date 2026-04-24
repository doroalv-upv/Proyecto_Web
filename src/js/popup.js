
const button = document.querySelectorAll(".opener-dialog");
const popup = document.querySelectorAll(".popup");


for(let i=0;i<= button.length -1;i++)
{
    button[i].addEventListener("click", () => {
        if (popup[i].open) {
            popup[i].close();
        } 
        else {
            popup[i].show();
        }
    })
}
;
