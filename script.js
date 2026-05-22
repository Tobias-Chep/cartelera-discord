const pelis = [
    {
        titulo: "Dune: Part Two",
        genero: "Sci-fi",
        fecha: "Vie 23/05",
        fechaReal: "2026-05-23",
        estado: "Próxima",
        portada: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
    },
    {
        titulo: "Oppenheimer",
        genero: "Drama",
        fecha: "15/03",
        fechaReal: "2026-03-15",
        estado: "Vista",
        portada: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
    },
    {
        titulo: "Mad Max: Fury Road",
        genero: "Acción",
        fecha: "Por votar",
        fechaReal: null,
        estado: "Votación",
        portada: "https://image.tmdb.org/t/p/w600_and_h900_face/hA2ple9q4qnwxp3hKVNhroipsir.jpg"
    },
    {
        titulo: "Mad Max: Fury Road",
        genero: "Acción",
        fecha: "Por votar",
        fechaReal: "2026-05-20",
        estado: "Votación",
        portada: "https://image.tmdb.org/t/p/w600_and_h900_face/hA2ple9q4qnwxp3hKVNhroipsir.jpg"
    }
];

const grilla = document.getElementById("grilla");
const banner = document.getElementById("banner");
const modal = document.getElementById("modal");
const modalInfo = document.getElementById("modal-info");
const modalCerrar = document.getElementById("modal-cerrar");

function classBadge(estado) {
    if (estado === "Próxima") return "badge-proxima";
    if (estado === "Vista") return "badge-vista";
    if (estado === "Votación") return "badge-votacion";
}

async function abrirModal(i) {
    const p = pelis[i];
    modalInfo.innerHTML = `
    <article id="modal-tarjeta">
        <img src="${p.portada}" alt="${p.titulo}" style="width:100%; border-radius:6px; margin-bottom:12px;">
        <section id="modal-datos">
            <h2>${p.titulo}</h2>
            <p>Género: ${p.genero}</p>
            <p>Fecha: ${p.fecha}</p>
            <span class="badge ${classBadge(p.estado)}">${p.estado}</span>
            <p id="sinopsis">Cargando...</p>
            <p id="puntaje"></p>
        </section>
    </article>
    `;

    modal.classList.add("visible");

    const tmdb = await traerDatosTMDB(p.titulo);
    if (tmdb) {
        document.getElementById("sinopsis").textContent = tmdb.overview;
        document.getElementById("puntaje").textContent = `⭐ ${tmdb.vote_average.toFixed(1)}`;
    }
}

function cerrarModal() {
    modal.classList.remove("visible");
}

modalCerrar.addEventListener("click", cerrarModal);

modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        cerrarModal();
    }
})

function proximaFuncion() {

    let proxima = "";
    const hoy = new Date();
    let proximaMasCercana = null;
    let fechaMasCercana = null;
        
    for (let i = 0; i < pelis.length; i++) {
        const p = pelis[i];
        const fechaPeli = p.fechaReal ? new Date(p.fechaReal) : null;


        if (fechaPeli > hoy) {
            if (fechaMasCercana === null || fechaPeli < fechaMasCercana) {
                proximaMasCercana = p;
                fechaMasCercana = fechaPeli;
            }
        }
    }


    if (proximaMasCercana !== null) {
        proxima +=`
            <div class="banner">
                <p class="banner-label">¡Próxima función!</p>
                    <div class="banner-info">
                        <h2>${proximaMasCercana.titulo}</h2>
                        <div class="banner-masInfo">
                            <p>Género: ${proximaMasCercana.genero}</p>
                            <p>Fecha: ${proximaMasCercana.fecha}</p>
                        </div>
                    </div>
            </div>
        `;
    }
    banner.innerHTML = proxima;
}

function dibujarGrilla(filtro, idBoton) {
    const botones = document.querySelectorAll("button");
    for (let i = 0; i < botones.length; i++) {
        botones[i].classList.remove("activo");
    }

    if (idBoton) {
        document.getElementById(idBoton).classList.add("activo");
    }

    let html = "";

    for (let i = 0; i < pelis.length; i++) {
        const p = pelis[i];

        if (filtro !== "Todas" && p.estado !== filtro) {
            continue;
        }

        html += `
            <div class="tarjeta" onclick="abrirModal(${i})">
                <img src="${p.portada}" alt="${p.titulo}">
                <div class="tarjeta-info">
                    <h2>${p.titulo}</h2>
                    <p>Género: ${p.genero}</p>
                    <p>Fecha: ${p.fecha}</p>
                    <span class="badge ${classBadge(p.estado)}">${p.estado}</span>
                </div>
            </div>
        `;
    }

    grilla.innerHTML = html;
}

async function traerDatosTMDB(titulo) {
    const apiKey = "66f147e77eb6e13e786d5aa45cd63c05";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${titulo}&language=es-ES`;

    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.results.length > 0) {
        return datos.results[0];
    }
    return null;
}

dibujarGrilla("Todas", "btn-todas");
proximaFuncion();