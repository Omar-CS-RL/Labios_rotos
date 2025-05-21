
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
      { tiempo: 20, texto: "Los quiero besar, los quiero curar" },
      { tiempo: 24, texto: "Los voy a cuidar" },
      { tiempo: 28, texto: "Con todo mi amor" },
      { tiempo: 33, texto: "Es raro el amor, ah-ah-ah-ah" },
      { tiempo: 37, texto: "Es raro el amor, ah-ah-ah" },
      { tiempo: 41, texto: "Que se te aparece" },
      { tiempo: 45, texto: "Cuando menos piensas" },
      { tiempo: 49, texto: "Es raro el amor, ah-ah-ah-ah" },
      { tiempo: 53, texto: "Es raro el amor, (ah-ah-ah)" },
      { tiempo: 58, texto: "No importa la distancia" },
      { tiempo: 62, texto: "Ni el tiempo ni la edad, uh-uh-uh-uh" },
      { tiempo: 67, texto: "Moja el desierto de mi alma" },
      { tiempo: 70, texto: "Con tu mirar, con tu tierna voz" },
      { tiempo: 74, texto: "Con tu mano en mi mano" },
      { tiempo: 78, texto: "Por la eternidad" },
      { tiempo: 82, texto: "Y entrégame esos labios rotos" },
      { tiempo: 85, texto: "Los quiero besar, los quiero curar" },
      { tiempo: 89, texto: "Los voy a cuidar" },
      { tiempo: 93, texto: "Con todo mi amor" },
      { tiempo: 97, texto: "Es raro el amor, ah-ah-ah-ah" },
      { tiempo: 101, texto: "Es raro el amor, ah-ah-ah" },
      { tiempo: 105, texto: "Que se te aparece" },
      { tiempo: 109, texto: "Cuando menos piensas" },
      { tiempo: 113, texto: "Es raro el amor, ah-ah-ah-ah" },
      { tiempo: 117, texto: "Es raro el amor, ah-ah-ah" },
      { tiempo: 121, texto: "No importa la distancia" },
      { tiempo: 125, texto: "Ni el tiempo ni la edad" },
      { tiempo: 130, texto: "Ah-ah-ah-ah" },
      { tiempo: 133, texto: "(Uh) ah-ah-ah-ah" },
      { tiempo: 137, texto: "Amor, amor" },
      { tiempo: 140, texto: "Amor, amor" },
      { tiempo: 143, texto: "Amor, amor" },
      { tiempo: 146, texto: "Amor, amor" },
      { tiempo: 149, texto: "Amor, amor" },
      { tiempo: 152, texto: "Amor, amor, amor" },
      { tiempo: 155, texto: "Ah-ah-ah-ah" }
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

    function mostrarLetra() {
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
        playBtn.textContent = "Pausar";
      } else {
        audio.pause();
        clearInterval(intervalo);
        playBtn.textContent = "Reproducir";
      }
    }

playBtn.addEventListener("click", toggleReproduccion);