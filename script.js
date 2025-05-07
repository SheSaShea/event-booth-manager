const costInput = document.getElementById("cost");
const budgetInput = document.getElementById("budget");
const backdropInput = document.getElementById("backdrop");

// Format Rupiah saat user mengetik
[costInput, budgetInput, backdropInput].forEach(input => {
  input.addEventListener("input", function () {
    let clean = this.value.replace(/[^\d]/g, "");
    if (!clean) {
      this.value = "";
      return;
    }
    const formatted = parseInt(clean).toLocaleString("id-ID") + ",-";
    this.value = formatted;
  });
});

document.getElementById("boothForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const booth = document.getElementById("booth").value;
  const size = document.getElementById("size").value;
  const event = document.getElementById("event").value;
  const date = document.getElementById("date").value;
  const cost = costInput.value;
  const budget = budgetInput.value;
  const contact = document.getElementById("contact").value;
  const backdrop = backdropInput.value;
  const notes = document.getElementById("notes").value;

  const table = document.getElementById("boothTable").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  const values = [booth, size, event, date, cost, budget, contact, backdrop, notes];
  values.forEach(value => {
    const cell = newRow.insertCell();
    cell.textContent = value;
  });

  this.reset();
});

document.getElementById("filterEvent").addEventListener("change", function () {
  const filter = this.value;
  const rows = document.querySelectorAll("#boothTable tbody tr");

  rows.forEach(row => {
    const eventName = row.cells[2].textContent;
    row.style.display = !filter || eventName === filter ? "" : "none";
  });
});
