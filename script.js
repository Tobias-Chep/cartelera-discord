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

function classBadge(estado) {
    if (estado === "Próxima") return "badge-proxima";
    if (estado === "Vista") return "badge-vista";
    if (estado === "Votación") return "badge-votacion";
}

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
            <div class="tarjeta">
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

dibujarGrilla("Todas", "btn-todas");
proximaFuncion();