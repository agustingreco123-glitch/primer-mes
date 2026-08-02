/* =========================================================
   NUESTRO PRIMER MES ❤️
   SCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   1. ELEMENTOS PRINCIPALES
========================================================= */

const cover = document.getElementById("cover");
const puzzleScreen = document.getElementById("puzzleScreen");
const letterScreen = document.getElementById("letterScreen");

const startButton = document.getElementById("startButton");
const openLetterButton = document.getElementById("openLetterButton");


/* =========================================================
   2. PORTADA → ROMPECABEZAS
========================================================= */

function irAlPuzzle() {

    cover.classList.remove("active");

    puzzleScreen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* El botón de la portada */

startButton.addEventListener(
    "click",
    irAlPuzzle
);


/* =========================================================
   3. CORAZONES FLOTANTES
========================================================= */

const heartsContainer =
    document.querySelector(".hearts-container");


if (heartsContainer) {

    const heartSymbols = [
        "♡",
        "♥",
        "❤"
    ];


    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const heart =
            document.createElement("span");


        heart.classList.add("heart");


        heart.textContent =
            heartSymbols[
                Math.floor(
                    Math.random() *
                    heartSymbols.length
                )
            ];


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.animationDuration =
            8 +
            Math.random() * 10 +
            "s";


        heart.style.animationDelay =
            Math.random() * 8 +
            "s";


        heart.style.fontSize =
            12 +
            Math.random() * 20 +
            "px";


        heartsContainer.appendChild(
            heart
        );

    }

}


/* =========================================================
   4. ELEMENTOS DEL ROMPECABEZAS
========================================================= */

const puzzleBoard =
    document.getElementById("puzzleBoard");


const piecesPool =
    document.getElementById("piecesPool");


const progress =
    document.getElementById("progress");


const puzzleComplete =
    document.getElementById("puzzleComplete");


/* =========================================================
   5. CONFIGURACIÓN DEL PUZZLE
========================================================= */

const totalPieces = 16;

let placedPieces = 0;

let selectedPiece = null;


/* =========================================================
   6. CREAR LAS PIEZAS
========================================================= */

let pieces = [];


for (
    let i = 0;
    i < totalPieces;
    i++
) {

    const piece =
        document.createElement("div");


    piece.classList.add(
        "puzzle-piece"
    );


    piece.dataset.id =
        i;


    /*
       Calculamos fila y columna.

       El puzzle es de 4 x 4.
    */

    const row =
        Math.floor(i / 4);


    const col =
        i % 4;


    /*
       Posición de la imagen
       dentro de cada pieza.
    */

    piece.style.backgroundPosition =
        `${col * 33.333333}% ${row * 33.333333}%`;


    pieces.push(
        piece
    );

}


/* =========================================================
   7. MEZCLAR LAS PIEZAS
========================================================= */

pieces.sort(
    () =>
        Math.random() - 0.5
);


/* =========================================================
   8. MOSTRAR PIEZAS MEZCLADAS
========================================================= */

pieces.forEach(
    piece => {

        piecesPool.appendChild(
            piece
        );

    }
);


/* =========================================================
   9. CREAR LOS ESPACIOS DEL PUZZLE
========================================================= */

for (
    let i = 0;
    i < totalPieces;
    i++
) {

    const slot =
        document.createElement("div");


    slot.classList.add(
        "puzzle-slot"
    );


    slot.dataset.id =
        i;


    puzzleBoard.appendChild(
        slot
    );

}


/* =========================================================
   10. SELECCIONAR UNA PIEZA
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const piece =
            event.target.closest(
                ".puzzle-piece"
            );


        /*
           Si no se hizo clic
           sobre una pieza,
           no hacemos nada.
        */

        if (!piece) {

            return;

        }


        /*
           Si la pieza ya está colocada
           correctamente, no se puede
           volver a seleccionar.
        */

        if (
            piece.classList.contains(
                "correct"
            )
        ) {

            return;

        }


        /*
           Si ya había otra pieza seleccionada,
           quitamos la selección.
        */

        if (selectedPiece) {

            selectedPiece.classList.remove(
                "selected"
            );

        }


        /*
           Guardamos la nueva pieza.
        */

        selectedPiece =
            piece;


        /*
           Le agregamos el efecto visual.
        */

        selectedPiece.classList.add(
            "selected"
        );

    }
);


/* =========================================================
   11. COLOCAR UNA PIEZA EN EL TABLERO
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const slot =
            event.target.closest(
                ".puzzle-slot"
            );


        /*
           Si no se hizo clic
           en un espacio del puzzle,
           no hacemos nada.
        */

        if (!slot) {

            return;

        }


        /*
           Si no hay ninguna pieza
           seleccionada, no hacemos nada.
        */

        if (!selectedPiece) {

            return;

        }


        /*
           Obtenemos los IDs.
        */

        const pieceId =
            selectedPiece.dataset.id;


        const slotId =
            slot.dataset.id;


        /* =================================================
           PIEZA CORRECTA
        ================================================= */

        if (
            pieceId === slotId
        ) {

            /*
               Colocamos la pieza
               dentro del espacio.
            */

            slot.appendChild(
                selectedPiece
            );


            /*
               Quitamos la selección.
            */

            selectedPiece.classList.remove(
                "selected"
            );


            /*
               Marcamos la pieza
               como correcta.
            */

            selectedPiece.classList.add(
                "correct"
            );


            /*
               Aumentamos el contador.
            */

            placedPieces++;


            /*
               Actualizamos el texto.
            */

            progress.textContent =
                placedPieces;


            /*
               Limpiamos la selección.
            */

            selectedPiece =
                null;


            /*
               Comprobamos si terminó
               el rompecabezas.
            */

            if (
                placedPieces ===
                totalPieces
            ) {

                completePuzzle();

            }

        }


        /* =================================================
           PIEZA INCORRECTA
        ================================================= */

        else {

            /*
               Animación de error.
            */

            slot.classList.add(
                "wrong"
            );


            setTimeout(
                function() {

                    slot.classList.remove(
                        "wrong"
                    );

                },
                400
            );

        }

    }
);


/* =========================================================
   12. PUZZLE COMPLETADO
========================================================= */

function completePuzzle() {

    /*
       Esperamos un poquito
       para que se vea el puzzle terminado.
    */

    setTimeout(
        function() {

            /*
               Mostramos la sección
               de puzzle completado.
            */

            puzzleComplete.classList.add(
                "show"
            );


            /*
               Bajamos automáticamente
               hasta el mensaje.
            */

            puzzleComplete.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            /*
               Después de unos segundos
               abrimos el sobre.
            */

            setTimeout(
                function() {

                    const envelope =
                        document.getElementById(
                            "envelope"
                        );


                    if (envelope) {

                        envelope.classList.add(
                            "open"
                        );

                    }


                    /*
                       Después mostramos
                       el mensaje del sobre.
                    */

                    setTimeout(
                        function() {

                            const envelopeMessage =
                                document.getElementById(
                                    "envelopeMessage"
                                );


                            if (envelopeMessage) {

                                envelopeMessage.classList.add(
                                    "show"
                                );

                            }

                        },
                        1800
                    );

                },
                2200
            );

        },
        700
    );

}


/* =========================================================
   13. SOBRE → CARTA
========================================================= */

openLetterButton.addEventListener(
    "click",
    function() {

        /*
           Ocultamos el puzzle.
        */

        puzzleScreen.classList.remove(
            "active"
        );


        /*
           Mostramos la carta.
        */

        letterScreen.classList.add(
            "active"
        );


        /*
           Volvemos al principio
           de la carta.
        */

        letterScreen.scrollTop = 0;

    }
);

/* =========================================================
   14. CUPÓN DE MINECRAFT
========================================================= */

const claimGiftButton =
    document.getElementById(
        "claimGiftButton"
    );


const giftRevealed =
    document.getElementById(
        "giftRevealed"
    );


if (
    claimGiftButton &&
    giftRevealed
) {

    claimGiftButton.addEventListener(
        "click",
        function() {

            /*
               Ocultamos el botón
               después de reclamar.
            */

            claimGiftButton.style.display =
                "none";


            /*
               Mostramos el mensaje
               de regalo.
            */

            giftRevealed.classList.add(
                "show"
            );


            /*
               Desplazamos suavemente
               hasta el mensaje.
            */

            setTimeout(
                function() {

                    giftRevealed.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                },
                200
            );

        }
    );

}