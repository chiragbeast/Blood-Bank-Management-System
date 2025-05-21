document.addEventListener("DOMContentLoaded", function () {
    // Handle Donor Form Submission
    document.getElementById("donor-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Donor Registered Successfully!");
        this.reset();
    });

    // Handle Blood Request Form Submission
    document.getElementById("recipient-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Blood Request Submitted!");
        this.reset();
    });

    // Populate Blood Inventory Table
    const bloodStock = [
        { type: "A+", units: 10 },
        { type: "A-", units: 8 },
        { type: "B+", units: 12 },
        { type: "O+", units: 15 }
    ];

    const table = document.getElementById("inventory-table");
    if (table) {
        bloodStock.forEach(blood => {
            let row = table.insertRow();
            row.insertCell(0).innerText = blood.type;
            row.insertCell(1).innerText = blood.units;
        });
    }
});
