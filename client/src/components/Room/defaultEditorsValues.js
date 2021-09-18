export const defaultCode = `
const text = document.createElement("p");
text.innerText = "Elliot";
document.querySelector(".box").appendChild(text);`;

export const defaultStyle = `
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --gray-800: #1F2937;
    --red-200: #FECACA;
}

.box {
    min-height: 100vh;
    background-color: var(--gray-800);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: var(--red-200);
    font-size: 2rem;
    font-family: sans-serif;
}`;

export const defaultHTML = `<div class="box"><h3>Bonsoir</h3></div>`;
