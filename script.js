function verificarSenha() {
  const senha = document.getElementById('senha').value;
  if (senha === 'Asd12345$') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('painel').style.display = 'block';
  } else {
    alert('Senha incorreta!');
  }
}

function gerarBanner() {
  const canvas = document.getElementById('bannerCanvas');
  const ctx = canvas.getContext('2d');

  // Fundo preto
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Adicionar logomarca, fundo e jogador (implementação simplificada)
  // Aqui você pode adicionar a lógica para desenhar as imagens no canvas

  // Adicionar texto do jogo (exemplo)
  ctx.fillStyle = '#fff';
  ctx.font = '40px Arial';
  ctx.fillText('Time A vs Time B', 100, 100);
  ctx.fillText('Horário: 20:00', 100, 150);
  ctx.fillText('Canal: ESPN', 100, 200);
}

function baixarBanner() {
  const canvas = document.getElementById('bannerCanvas');
  const link = document.createElement('a');
  link.download = 'banner-jogos-do-dia.png';
  link.href = canvas.toDataURL();
  link.click();
}

function limparCampos() {
  document.getElementById('banner-form').reset();
  const canvas = document.getElementById('bannerCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
