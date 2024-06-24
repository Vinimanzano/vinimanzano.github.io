function loginWithGitHub() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=Ov23liHbZxOCXzX14Nqy&scope=user';
    }
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if(error === 'access_denied') {
    window.location.href = 'index.html';
    }