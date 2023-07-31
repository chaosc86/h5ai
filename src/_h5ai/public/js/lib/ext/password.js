const {dom} = require('../util');
const server = require('../server');

const verifyTpl =
        `<br />
        <div id="login-wrapper">
            <input id="password" type="password" placeholder="請輸入訪問密碼"/>
            <br />
            <button id="login">驗證</button>
        </div>`;

const reload = () => {
    global.window.location.reload();
};

const onVerify = () => {
    server.request({
        action: 'password',
        password: dom('#password').val()
    }).then(reload);
};

const onKeydown = ev => {
    if (ev.which === 13) {
        onVerify();
    }
};

const addVerify = () => {
    try {
        dom('#login-wrapper').rm();
    } finally {
        dom(verifyTpl).appTo('#view');
    }

    dom('#password').on('keydown', onKeydown)[0].focus();
    dom('#login').on('click', onVerify);
    return false;
};

module.exports = {
    addVerify
};
