let currentRole = '';

function selectRole(role, el) {
  currentRole = role;
  document.querySelectorAll('.roles button').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('chatBox').innerHTML += `<p><em>系统: 当前角色切换为：${role}</em></p>`;
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message || !currentRole) {
    alert('请选择角色并输入内容');
    return;
  }
  appendMessage('你', message);
  input.value = '';
  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: currentRole, message })
  })
    .then(res => res.json())
    .then(data => appendMessage(currentRole, data.reply))
    .catch(err => appendMessage('系统', '发生错误：' + err.message));
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById('userInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
}); 