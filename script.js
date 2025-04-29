// Parse M3U e extrai grupos
function parseM3U(content) {
    const grupos = {};
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('#EXTINF')) {
            const grupoMatch = lines[i].match(/group-title="([^"]+)"/);
            const grupo = grupoMatch ? grupoMatch[1] : 'Sem Grupo';
            const nome = lines[i].split(',').pop().trim();
            const link = lines[i + 1]?.startsWith('http') ? lines[i + 1].trim() : null;

            if (link && link.match(/\.(mp4|mkv|avi)$/)) {
                if (!grupos[grupo]) grupos[grupo] = [];
                grupos[grupo].push({ nome, link });
            }
        }
    }
    return grupos;
}

// Exibe grupos para seleção
function showGroups(grupos) {
    const container = document.getElementById('groups-list');
    container.innerHTML = '';

    Object.keys(grupos).forEach(grupo => {
        const div = document.createElement('div');
        div.className = 'group-item';
        div.innerHTML = `
            <input type="checkbox" id="${grupo}" checked>
            <label for="${grupo}">${grupo} (${grupos[grupo].length} vídeos)</label>
        `;
        container.appendChild(div);
    });

    document.getElementById('groups-container').style.display = 'block';
}

// Baixa vídeos selecionados (um por um)
async function downloadVideos(grupos) {
    const progressBar = document.getElementById('progress-bar');
    const statusEl = document.getElementById('status');
    const gruposSelecionados = Array.from(document.querySelectorAll('#groups-list input:checked')).map(el => el.id);

    for (const grupo of gruposSelecionados) {
        for (const video of grupos[grupo]) {
            statusEl.textContent = `Baixando: ${video.nome}...`;
            
            try {
                const response = await fetch(video.link);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = video.nome.replace(/[\/:*?"<>|]/g, '_') + '.mp4';
                a.click();
                
                statusEl.textContent = `Concluído: ${video.nome}`;
            } catch (error) {
                statusEl.textContent = `Erro ao baixar ${video.nome}: ${error.message}`;
            }
        }
    }
}

// Event Listeners
document.getElementById('m3u-url').addEventListener('change', async (e) => {
    const url = e.target.value;
    const response = await fetch(url);
    const content = await response.text();
    const grupos = parseM3U(content);
    showGroups(grupos);
});

document.getElementById('m3u-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const grupos = parseM3U(event.target.result);
        showGroups(grupos);
    };
    reader.readAsText(file);
});

document.getElementById('download-btn').addEventListener('click', () => {
    const grupos = parseM3U(document.getElementById('m3u-url').value || '');
    downloadVideos(grupos);
    document.getElementById('progress-container').style.display = 'block';
});
