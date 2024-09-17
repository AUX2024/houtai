function adminLogin() {
    const adminPassword = document.getElementById('adminPassword').value;

    // 简单的管理员密码验证（可替换为更复杂的逻辑）
    if (adminPassword === 'admin123') { // 假设管理员密码为 'admin123'
        alert('登录成功');
        document.getElementById('adminLoginPage').style.display = 'none';
        document.getElementById('adminActionsPage').style.display = 'block';
    } else {
        alert('密码错误');
    }
}

function addFunds() {
    const username = document.getElementById('manageUsername').value;
    const amount = parseFloat(document.getElementById('manageAmount').value);
    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (username && amount > 0) {
        if (users[username]) {
            users[username].balance += amount; // 增加用户余额
            localStorage.setItem('users', JSON.stringify(users));
            alert(`已成功为用户 ${username} 增加 ¥${amount.toFixed(2)} 的余额`);
        } else {
            alert('用户不存在');
        }
    } else {
        alert('请输入有效的用户名和金额');
    }
}

function logoutAdmin() {
    document.getElementById('adminActionsPage').style.display = 'none';
    document.getElementById('adminLoginPage').style.display = 'block';
}
