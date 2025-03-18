const audioFileInput = document.getElementById('audioFile');
const audioFileNameInput = document.getElementById('audioFileName');
const transcribeBtn = document.getElementById('transcribeBtn');
const transcriptionResult = document.getElementById('transcriptionResult');

transcribeBtn.addEventListener('click', async () => {
    try {        
        const body = {
            url: audioFileInput.value,
            name: audioFileNameInput.value,
        }

        const payload = JSON.stringify(body);

        const response = await fetch('http://localhost:3000/recognize-short-audio', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.text) {
            transcriptionResult.textContent = result.text;
            console.log(result);
        } else {
            transcriptionResult.textContent = 'No se pudo transcribir el audio';
        }
        
    } catch (error) {
        console.error('Error:', error);
        transcriptionResult.textContent = 'Error al procesar el audio: ' + error.message;
    }
});

function getAudioDuration(file) {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
        });
        audio.addEventListener('error', reject);
        audio.src = URL.createObjectURL(file);
    });
}