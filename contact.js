// FORMULÁRIO DE CONTACTO (FormSubmit — envia para contato.vinimanzano@gmail.com)
const form = document.getElementById('contact-form');
const statusBox = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit');
const EMAIL = 'contato.vinimanzano@gmail.com';
const IS_PT = (document.documentElement.lang || '').toLowerCase().indexOf('pt') === 0;
const T = IS_PT ? {
    sending: 'A enviar...',
    send: 'Enviar mensagem',
    ok: 'Obrigado! A sua mensagem foi enviada — responderei em breve.',
    err: 'Não foi possível enviar a mensagem. ',
    fallback: 'Envie-a por email',
    subject: 'Portfólio'
} : {
    sending: 'Sending...',
    send: 'Send message',
    ok: 'Thanks! Your message was sent — I\'ll get back to you soon.',
    err: 'The message could not be sent. ',
    fallback: 'Send it by email instead',
    subject: 'Portfolio'
};

function showStatus(type, html) {
    statusBox.className = 'form-status ' + type;
    statusBox.innerHTML = html;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    if (data.get('_honey')) return; // bot

    data.set('_subject', T.subject + ' — ' + data.get('topic') + ' — ' + data.get('name'));
    data.set('_replyto', data.get('email'));

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> ' + T.sending;

    try {
        const res = await fetch('https://formsubmit.co/ajax/' + EMAIL, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: data
        });
        const json = await res.json().catch(() => ({}));

        if (!res.ok || json.success === 'false' || json.success === false) {
            throw new Error(json.message || 'Request failed');
        }

        form.reset();
        showStatus('ok', '<i class="bi bi-check-circle"></i> ' + T.ok);
    } catch (err) {
        const mailto = 'mailto:' + EMAIL
            + '?subject=' + encodeURIComponent(T.subject + ' — ' + data.get('topic'))
            + '&body=' + encodeURIComponent(data.get('message') + '\n\n— ' + data.get('name') + ' (' + data.get('email') + ')');
        showStatus('err', '<i class="bi bi-exclamation-triangle"></i> ' + T.err
            + '<a href="' + mailto + '" style="color:inherit;text-decoration:underline">' + T.fallback + '</a>.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send"></i> ' + T.send;
    }
});
