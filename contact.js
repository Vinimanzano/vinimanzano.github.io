// FORMULÁRIO DE CONTACTO (FormSubmit — envia para contato.vinimanzano@gmail.com)
const form = document.getElementById('contact-form');
const statusBox = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit');
const EMAIL = 'contato.vinimanzano@gmail.com';

function showStatus(type, html) {
    statusBox.className = 'form-status ' + type;
    statusBox.innerHTML = html;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    if (data.get('_honey')) return; // bot

    data.set('_subject', 'Portfolio — ' + data.get('topic') + ' — ' + data.get('name'));
    data.set('_replyto', data.get('email'));

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';

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
        showStatus('ok', '<i class="bi bi-check-circle"></i> Thanks! Your message was sent — I\'ll get back to you soon.');
    } catch (err) {
        const mailto = 'mailto:' + EMAIL
            + '?subject=' + encodeURIComponent('Portfolio — ' + data.get('topic'))
            + '&body=' + encodeURIComponent(data.get('message') + '\n\n— ' + data.get('name') + ' (' + data.get('email') + ')');
        showStatus('err', '<i class="bi bi-exclamation-triangle"></i> The message could not be sent. '
            + '<a href="' + mailto + '" style="color:inherit;text-decoration:underline">Send it by email instead</a>.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send"></i> Send message';
    }
});
