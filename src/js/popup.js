
const button = document.getElementById("opener-dialog");
const popup = document.getElementById("popup");

button.addEventListener("click", () => {
    if (popup.open) {
        popup.close();
    } 
    else {
        popup.show();
    }
});
