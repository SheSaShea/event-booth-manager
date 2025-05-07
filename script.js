document.getElementById("boothForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const booth = document.getElementById("booth").value;
    const size = document.getElementById("size").value;
    const event = document.getElementById("event").value;
    const date = document.getElementById("date").value;
    const cost = formatNumber(document.getElementById("cost").value);
    const budget = formatNumber(document.getElementById("budget").value);
    const contact = document.getElementById("contact").value;
    const backdrop = document.getElementById("backdrop").value;
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
  
  function formatNumber(value) {
    const number = parseInt(value.replace(/[^\d]/g, ''), 10);
    if (isNaN(number)) return '';
    return number.toLocaleString('id-ID') + ',-';
  }
  
  document.getElementById("filterEvent").addEventListener("change", function () {
    const filter = this.value;
    const rows = document.querySelectorAll("#boothTable tbody tr");
  
    rows.forEach(row => {
      const eventName = row.cells[2].textContent;
      row.style.display = !filter || eventName === filter ? "" : "none";
    });
  });
  