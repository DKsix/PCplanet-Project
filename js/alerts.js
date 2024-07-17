export default class alerts{
    showAlert(texto) {
        Toastify({
            text: `${texto}` ,
            position: 'center',
            duration: 3000,
            style: {
                'border-radius': '20px',
                background: "linear-gradient(to right, #4178BF, #66B1F2)",
            },
        }).showToast()
    }
}
