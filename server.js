const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let admissions = [];  

// Serve the admissions form
app.get('/admission', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Handle form submission
app.post('/admission', (req, res) => {
    const { fullName, email, phone, course } = req.body;

    admissions.push({ fullName, email, phone, course });

    res.send(`
        <h2>Thank you, ${fullName}!</h2>
        <p>You’ve successfully applied for the <strong>${course}</strong> program.</p>
        <a href="/admission">Submit another application</a><br>
        <a href="/submissions">View All Submissions</a>
    `);
});

// Routing part
app.get('/submissions', (req, res) => {
    let html = '<h2>All Admissions</h2>';

    if (admissions.length === 0) {
        html += '<p>No submissions yet.</p>';
    } else {
        html += '<ul>';
        admissions.forEach((student, index) => {
            html += `<li>${index + 1}. ${student.fullName} | ${student.email} | ${student.phone} | ${student.course}</li>`;
        });
        html += '</ul>';
    }

    html += `<br><a href="/admission">Back to Form</a>`;
    
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/admission`);
});
