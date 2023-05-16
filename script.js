// Função para gerar o calendário
function generateCalendar(year, month) {
    const calendarDiv = document.getElementById("calendar");
    calendarDiv.innerHTML = ""; // Limpa o conteúdo anterior, se houver

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Obtém o número de dias no mês
    const firstDay = new Date(year, month, 1).getDay(); // Obtém o dia da semana do primeiro dia do mês

    const table = document.createElement("table");
    table.classList.add("calendar");

    // Cabeçalho
    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
    for (const day of daysOfWeek) {
        const headerCell = document.createElement("th");
        headerCell.textContent = day;
        headerRow.appendChild(headerCell);
    }
    header.appendChild(headerRow);
    table.appendChild(header);

    // Corpo
    const body = document.createElement("tbody");
    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                const cell = document.createElement("td");
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                const cell = document.createElement("td");
                cell.textContent = date;
                row.appendChild(cell);

                date++;

                // Pintar dias específicos
                const highlightedDays = [21, 28]; // Dias que serão pintados
                if (highlightedDays.includes(date - 1)) {
                    cell.classList.add("highlight");
                }
            }
        }
        body.appendChild(row);
    }
    table.appendChild(body);

    calendarDiv.appendChild(table);
}

// Obter data atual
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
generateCalendar(currentYear, currentMonth);

// Obter IP
window.addEventListener("DOMContentLoaded", function () {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip').value = data.ip;
        });
});

// Validar quantidade de pessoas
document.getElementById("myForm").addEventListener("submit", function (event) {
    const selectedDate = document.getElementById("data").value;
    const selectedQuantity = parseInt(document.getElementById("quantidade").value, 10);

    const maxPeoplePerDay = {
        '2023-05-21': 1,
        '2023-05-02': 3,
        '2023-05-03': 7,
        // Adicione mais dias e quantidades conforme necessário
    };

    if (maxPeoplePerDay[selectedDate] && selectedQuantity > maxPeoplePerDay[selectedDate]) {
        event.preventDefault(); // Impede o envio do formulário
        alert("A quantidade de pessoas selecionada excede o limite para este dia.");
    }
});