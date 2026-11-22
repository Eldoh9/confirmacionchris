const scriptUrl = 'https://script.google.com/macros/s/AKfycbx_eyY-yg7YfMIMf5Ca16ILUompwFAv1PSM2pSp8d0IlEsfVZoYvdZOKiOjbTJRAP_w/exec';

const form = document.forms['formconfirmacion'];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const boton = form.querySelector('button[type="submit"]');
    boton.disabled = true;
    boton.textContent = 'Enviando...';

    try {
        const datos = new URLSearchParams(new FormData(form));

        await fetch(scriptUrl, {
            method: 'POST',
            body: datos,
            mode: 'no-cors'
        });

        await Swal.fire({
            title: '¡MUCHAS GRACIAS!',
            text: 'Tu confirmación ha sido enviada.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#304A84'
        });

        form.reset();

    } catch (error) {
        console.error('Error al enviar:', error);

        await Swal.fire({
            title: '¡Ups!',
            text: 'Ocurrió un problema al intentar enviar tu confirmación.',
            icon: 'error',
            confirmButtonColor: '#304A84'
        });

    } finally {
        boton.disabled = false;
        boton.textContent = 'Enviar';
    }
});