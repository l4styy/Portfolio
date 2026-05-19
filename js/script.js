const terminal = document.getElementById("terminal");

const lines = [
  "// Iniciando sistema...",
  "function iniciar() {",
  "  console.log('Bem-vindo ao portfólio de Mateus Rios');",
  "  apresentarProjetos();",
  "}",
  "",
  "function apresentarProjetos() {",
  "  const projetos = ['Projeto A', 'Projeto B', 'Projeto C'];",
  "  projetos.forEach(projeto => {",
  "    console.log('> ' + projeto);",
  "  });",
  "}",
  "",
  "iniciar();"
];

let currentLine = 0;
let currentChar = 0;
let lineDiv, lineContent;

function typeLine() {
  if (currentLine >= lines.length) {
    // Terminou tudo - scrolla para projetos após 1s
    setTimeout(() => {
      document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
      document.getElementById("projects").focus(); // foco acessibilidade
    }, 1000);
    return;
  }

  // Cria div da linha e elementos para número e conteúdo
  lineDiv = document.createElement("div");
  lineDiv.classList.add("code-line");

  const lineNumber = document.createElement("span");
  lineNumber.classList.add("line-number");
  lineNumber.textContent = currentLine + 1;

  lineContent = document.createElement("span");
  lineContent.classList.add("line-content", "cursor"); // cursor ativo

  lineDiv.appendChild(lineNumber);
  lineDiv.appendChild(lineContent);
  terminal.appendChild(lineDiv);

  typeChar();
}

function typeChar() {
  if (currentChar < lines[currentLine].length) {
    lineContent.textContent += lines[currentLine].charAt(currentChar);
    currentChar++;
    setTimeout(typeChar, 40);
  } else {
    // termina a linha: remove cursor da linha atual
    lineContent.classList.remove("cursor");
    currentLine++;
    currentChar = 0;
    setTimeout(typeLine, 300);
  }
}

// Começa a digitar ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  terminal.innerHTML = "";
  currentLine = 0;
  currentChar = 0;
  typeLine();
});
