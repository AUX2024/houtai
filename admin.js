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

function showUsers() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const userTable = document.getElementById('userTable');
            userTable.innerHTML = ''; // 清空表格

            Object.keys(users).forEach(username => {
                const user = users[username];
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.balance}</td>
                    <td><input type="number" id="amount-${user.username}" placeholder="增加余额"></td>
                    <td><button onclick="addFunds('${user.username}')">增加余额</button></td>
                `;
                userTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// 添加资金
function addFunds(username) {
    const amount = parseFloat(document.getElementById(`amount-${username}`).value);

    if (isNaN(amount) || amount <= 0) {
        alert('请输入有效的金额');
        return;
    }

    fetch('http://localhost:3000/addBalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, amount })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === '余额增加成功') {
                alert(`余额增加成功，当前余额：${data.balance}`);
                showUsers(); // 刷新用户列表
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function logoutAdmin() {
    document.getElementById('adminActionsPage').style.display = 'none';
    document.getElementById('adminLoginPage').style.display = 'block';
}

// 页面加载时显示用户列表
document.addEventListener('DOMContentLoaded', showUsers);
