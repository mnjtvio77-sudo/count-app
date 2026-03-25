const express = require('express');
const app = express();

app.use(express.json());

let count = 0;
function sendDiscord(msg) {
    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: msg })
    });
}

// ================= UI หน้าแรก =================
app.get('/', (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Count App</title>
<style>
body {
    font-family: 'Segoe UI';
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.count {
    font-size: 60px;
    margin: 20px 0;
}
button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
}
.in { background: #28a745; color: white; }
.out { background: #dc3545; color: white; }
.admin { background: #007bff; color: white; }
</style>
</head>

<body>
<div class="card">
    <h1>👥 จำนวนคน</h1>
    <div class="count" id="count">0</div>

    <button class="in" onclick="add()">เข้า +</button>
    <button class="out" onclick="remove()">ออก -</button>

    <br><br>
    <a href="/admin"><button class="admin">Admin</button></a>
</div>

<script>
function load() {
    fetch('/api/count')
    .then(res => res.json())
    .then(data => {
        document.getElementById('count').innerText = data.count;
    });
}

function add() {
    fetch('/api/in', { method: 'POST' })
    .then(load);
}

function remove() {
    fetch('/api/out', { method: 'POST' })
    .then(load);
}

load();
</script>
</body>
</html>
`);
});

// ================= หน้า Admin =================
app.get('/admin', (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Admin</title>
<style>
body {
    font-family: 'Segoe UI';
    background: linear-gradient(135deg, #ff9966, #ff5e62);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.card { 
    background: white;
    padding: 30px;
    border-radius: 20px;
    text-align: center;
}
button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}
</style>
</head>

<body>

<div class="card" id="loginBox">
    <h2>Admin Login</h2>
    <input id="user" placeholder="Username"><br><br>
    <input id="pass" type="password" placeholder="Password"><br><br>
    <button onclick="login()">Login</button>
</div>

<div class="card" id="panel" style="display:none;">
    <h2>Admin Panel</h2>
    <button onclick="reset()">Reset Count</button>
</div>

<script>
function login() {
    let u = document.getElementById('user').value;
    let p = document.getElementById('pass').value;

    if (u === "Gameza177" && p === "S13122515") {
        document.getElementById('loginBox').style.display = "none";
        document.getElementById('panel').style.display = "block";
    } else {
        alert("Wrong!");
    }
}

function reset() {
    fetch('/api/reset', { method: 'POST' })
    .then(() => alert("รีเซ็ตแล้ว"));
}
</script>
const fetch = require('node-fetch');

const WEBHOOK_URL =https://discord.com/api/webhooks/1486271797337919620/n_YLJczABIKbhzxH98uyobh4cU7mD8d8wnVBovLMrZC_H9zXuOmCdSDdsfNsbPnBG9bT

function sendDiscord(msg) {
    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: msg
        })
    });
}
</body>
</html>
`);
});

// ================= API =================
app.get('/api/count', (req, res) => {
    res.json({ count });
});
app.post('/api/in', (req, res) => {
    count++;
    sendDiscord("👤 มีคนเข้า! ตอนนี้: " + count);
    res.json({ count });
});
app.post('/api/out', (req, res) => {
    if (count > 0) count--;
    sendDiscord("🚶‍♂️ มีคนออก! ตอนนี้: " + count);
    res.json({ count });
});

app.post('/api/reset', (req, res) => {
    count = 0;
    res.json({ count });
});

// ================= RUN =================
app.listen(3000, '0.0.0.0', () => {
    console.log('🔥 Server running: http://localhost:3000');
});