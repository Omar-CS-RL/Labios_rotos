
    const mensajesPrevios = [
      { tiempo: 0, texto: "Hola, tú... sí, tú Gabriela 😌" },
      { tiempo: 5, texto: "Solo quería decirte algo..." },
      { tiempo: 10, texto: "Tienes la sonrisa más bonita que he visto 💖" },
      { tiempo: 16, texto: "Eres especial, única, mágica ✨" },
      { tiempo: 22, texto: "Ahora escucha esto... es para ti 🎶" }
    ];

    const letraCancion = [
      { tiempo: 0, texto: "Regálame tu corazón" },
      { tiempo: 3, texto: "Déjame entrar a ese lugar" },
      { tiempo: 9, texto: "Donde nacen las flores" },
      { tiempo: 14, texto: "Donde nace el amor" },
      { tiempo: 18, texto: "Entrégame tus labios rotos" },
      { tiempo: 20.5, texto: "Los quiero besar, los quiero curar" },
      { tiempo: 26.2, texto: "Los voy a cuidar" },
      { tiempo: 31.2, texto: "Con todo mi amor" },
      { tiempo: 37.4, texto: "Es raro el amor, ah-ah-ah-ah" },
      { tiempo: 43, texto: "Es raro el amor, ah-ah-ah" },
      { tiempo: 47, texto: "Que se te aparece" },
      { tiempo: 49, texto: "Cuando menos piensas" },
      { tiempo: 51, texto: "Es raro el amor, ah-ah-ah-ah" },
      { tiempo: 55.8, texto: "Es raro el amor, (ah-ah-ah)" },
      { tiempo: 60, texto: "No importa la distancia" },
      { tiempo: 62, texto: "Ni el tiempo ni la edad, uh-uh-uh-uh" },
      { tiempo: 93, texto: "Moja el desierto de mi alma" },
      { tiempo: 95.6, texto: "Con tu mirar, con tu tierna voz" },
      { tiempo: 101.5, texto: "Con tu mano en mi mano" },
      { tiempo: 105.6, texto: "Por la eternidad" },
      { tiempo: 110, texto: "Y entrégame esos labios rotos" },
      { tiempo: 112.5, texto: "Los quiero besar, los quiero curar" },
      { tiempo: 118.5, texto: "Los voy a cuidar" },
      { tiempo: 123.2, texto: "Con todo mi amor" },
      { tiempo: 129.4, texto: "Es raro el amor, ah-ah-ah-ah" },
      { tiempo: 135, texto: "Es raro el amor, ah-ah-ah" },
      { tiempo: 139, texto: "Que se te aparece" },
      { tiempo: 141, texto: "Cuando menos piensas" },
      { tiempo: 143, texto: "Es raro el amor, ah-ah-ah-ah" },
      { tiempo: 147.8, texto: "Es raro el amor, ah-ah-ah" },
      { tiempo: 152, texto: "No importa la distancia" },
      { tiempo: 154, texto: "Ni el tiempo ni la edad" },
      { tiempo: 157, texto: "Ah-ah-ah-ah" },
      { tiempo: 160, texto: "(Uh) ah-ah-ah-ah" },
      { tiempo: 170, texto: "(Uh) ah-ah-ah-ah" },
      { tiempo: 170, texto: "(Uh) ah-ah-ah-ah" },
      { tiempo: 182, texto: "Amor, amor" },
      { tiempo: 184, texto: "Amor, amor" },
      { tiempo: 190, texto: "Amor, amor" },
      { tiempo: 192, texto: "Amor, amor" },
      { tiempo: 194, texto: "Amor, amor" },
      { tiempo: 196, texto: "Amor, amor" },
      { tiempo: 198, texto: "Amor, amor, amor" },
      { tiempo: 200.5, texto: "Ah-ah-ah-ah" },
      { tiempo: 202, texto: "Para finalizar quería decirte que..." },
      { tiempo: 205, texto: "Te amo mucho Gabriela" }
    ];

    let startTime = 0;
    let currentIndex = 0;
    let enPausa = true;
    let intervalo;
    let intervalId;
    const audio = document.getElementById("audio");
    const letra = document.getElementById("letra");
    const playBtn = document.getElementById("playBtn");
    const foto = document.getElementById('foto');

    const retrocederBtn = document.getElementById("retrocederBtn");
    const adelantarBtn = document.getElementById("adelantarBtn");

    const tiempo = document.getElementById("tiempo");


    function mostrarLetra() {
        const tiempoActualContador = audio.currentTime;
        const tiempoTotal = audio.duration || 0;
        tiempo.innerText = `${formatearTiempo(tiempoActualContador)} / ${formatearTiempo(tiempoTotal)}`;

        const tiempoActual = Math.floor(audio.currentTime);
        let texto = "";

        if (tiempoActual < 26) {
            const mensaje = mensajesPrevios.slice().reverse().find(m => tiempoActual >= m.tiempo);
            texto = mensaje ? mensaje.texto : "";
            if (foto.classList.contains('visible')) {
            foto.classList.remove('visible');
            void foto.offsetWidth; // fuerza reflow para resetear la animación
            }
        } else {
            const offset = tiempoActual - 26;
            const linea = letraCancion.slice().reverse().find(l => offset >= l.tiempo);
            texto = linea ? linea.texto : "";
            if (!foto.classList.contains('visible')) {
            foto.classList.add('visible');
            }
        }

        if (letra.innerText !== texto) {
            letra.style.opacity = 0;
            setTimeout(() => {
            letra.innerText = texto;
            letra.style.opacity = 1;
            }, 200);
        }
        }

    function toggleReproduccion() {
      if (audio.paused) {
        audio.play();
        intervalo = setInterval(mostrarLetra, 500);
        playBtn.textContent = "Pausar ⏸️";
      } else {
        audio.pause();
        clearInterval(intervalo);
        playBtn.textContent = "Reproducir ▶️";
      }
    }
// Función para actualizar la letra inmediatamente (sin esperar al intervalo)
function actualizarLetra() {
  mostrarLetra();
}

// Adelantar 5 segundos
function adelantar() {
  audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
  actualizarLetra();
}

// Retroceder 5 segundos
function retroceder() {
  audio.currentTime = Math.max(audio.currentTime - 5, 0);
  actualizarLetra();
}

function formatearTiempo(segundos) {
  const min = Math.floor(segundos / 60);
  const sec = Math.floor(segundos % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}


// Si el usuario mueve el tiempo (drag en el audio), actualizar letra y foto
audio.addEventListener("timeupdate", mostrarLetra);

playBtn.addEventListener("click", toggleReproduccion);
retrocederBtn.addEventListener("click", retroceder);
adelantarBtn.addEventListener("click", adelantar);