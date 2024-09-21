document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dobInput = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    const dob = new Date(dobInput);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    // Adjust the age if the birthday hasn't occurred this year yet
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age < 18 || age > 55) {
      alert('Date of birth must be between 18 and 55 years old.');
      return;
    }

    const entry = {
        name,
        email,
        password,
        dob: dobInput,
        termsAccepted: termsAccepted ? 'Yes' : 'No'
    };

    // Save to local storage
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    loadEntries();
});

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';

    entries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.termsAccepted}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Load entries on page load
document.addEventListener('DOMContentLoaded', loadEntries);
