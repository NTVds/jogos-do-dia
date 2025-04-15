async function loadGames() {
  const response = await fetch('https://api.exemplo.com/jogos'); // Substitua pela URL da sua API
  const data = await response.json();
  return data.jogos;
}

function generateBanner() {
  loadGames().then(jogos => {
    const canvas = document.getElementById("bannerCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const logoInput = document.getElementById("logoInput").files[0];
    const bgInput = document.getElementById("bgInput").files[0];

    if (bgInput) {
      const bgImage = new Image();
      bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        drawLogo(ctx, logoInput);
        drawGames(ctx, jogos);
      };
      bgImage.src = URL.createObjectURL(bgInput);
    } else {
      drawLogo(ctx, logoInput);
      drawGames(ctx, jogos);
    }
  });
}

function drawLogo(ctx, logoInput) {
  if (logoInput) {
    const logoImage = new Image();
    logoImage.onload = () => {
      ctx.drawImage(logoImage, 50, 50, 200, 200);
    };
    logoImage.src = URL.createObjectURL(logoInput);
  }
}

function drawGames(ctx, jogos) {
  ctx.fillStyle = "#fff";
  ctx.font = "30px sans-serif";
  jogos.forEach((jogo, i) => {
    ctx.fillText(`${jogo.time1} x ${jogo.time2} - ${jogo.hora} - ${jogo.canal}`, 50, 300 + i * 60);
  });
}
