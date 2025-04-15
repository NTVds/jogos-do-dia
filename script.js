async function loadGames(type) {
  // Simulando dados vindos de uma API
  const games = {
    main: [
      { time1: "Flamengo", time2: "Palmeiras", hora: "16:00", canal: "Globo" },
      { time1: "Lakers", time2: "Celtics", hora: "21:00", canal: "ESPN" },
    ],
    all: [
      { time1: "Flamengo", time2: "Palmeiras", hora: "16:00", canal: "Globo" },
      { time1: "Lakers", time2: "Celtics", hora: "21:00", canal: "ESPN" },
      { time1: "Corinthians", time2: "Santos", hora: "18:00", canal: "Premiere" },
      { time1: "UFC 300", time2: "Jon Jones vs Miocic", hora: "23:00", canal: "Combate" },
    ]
  };
  window.jogosSelecionados = games[type];
  alert(`${games[type].length} jogos carregados!`);
}

function generateBanner() {
  const canvas = document.getElementById("bannerCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const jogador = document.getElementById("playerName").value;

  ctx.fillStyle = "#fff";
  ctx.font = "40px sans-serif";
  ctx.fillText("Jogos do Dia", 50, 100);

  if (window.jogosSelecionados) {
    ctx.font = "30px sans-serif";
    window.jogosSelecionados.forEach((jogo, i) => {
      ctx.fillText(`${jogo.time1} x ${jogo.time2} - ${jogo.hora} - ${jogo.canal}`, 50, 200 + i * 60);
    });
  }

  if (jogador) {
    ctx.fillText(`Destaque: ${jogador}`, 50, 900);
  }
}
