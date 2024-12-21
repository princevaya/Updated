const subjects = {
    btechCSE: [
        { id: "cse1001", name: "CSE1001 - Introduction to Programming", credits: 5 },
        { id: "cse1002", name: "CSE1002 - Basic Electrical and Electronics Engineering", credits: 5 },
        { id: "cse1003", name: "CSE1003 - Computational Thinking", credits: 2 },
        { id: "cse1004", name: "CSE1004 - Applied Computational Mathematics - I", credits: 4 },
        { id: "cse1005", name: "CSE1005 - Soft Skills", credits: 4 },
    ],
    bca: [
        { id: "bca1001", name: "BCA1001 - Computer Fundamentals and Digital Logics", credits: 5 },
        { id: "bca1002", name: "BCA1002 - Data Structures", credits: 5 },
        { id: "bca1003", name: "BCA1003 - Computational Thinking", credits: 4 },
        { id: "bca1004", name: "BCA1004 - Mathematics", credits: 4 },
        { id: "bca1005", name: "BCA1005 - Human Values, Ethics", credits: 3 },
    ],
    btechBioeng: [
        { id: "bio1001", name: "Biochemistry", credits: 5.5 },
        { id: "bio1002", name: "Biophysics", credits: 5.5 },
        { id: "bio1003", name: "Maths", credits: 4 },
        { id: "bio1004", name: "Computational Thinking", credits: 3 },
        { id: "bio1005", name: "Life Skills", credits: 3 },
    ],
};

const gradeMapping = {
    "A+": 10,
    "A": 9,
    "B+": 8,
    "B": 7,
    "C+": 6.5,
    "C": 6,
    "D": 5,
    "F": 0,
};

const courseSelect = document.getElementById("course");
const subjectInputs = document.getElementById("subjectInputs");
const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");

function updateSubjectInputs() {
    const selectedCourse = courseSelect.value;
    subjectInputs.innerHTML = "";

    subjects[selectedCourse].forEach((subject) => {
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        const label = document.createElement("label");
        label.htmlFor = subject.id;
        label.textContent = `${subject.name} (${subject.credits} credits):`;

        const input = document.createElement("input");
        input.type = "text";
        input.id = subject.id;
        input.classList.add("grade-input");
        input.placeholder = "Enter grade";

        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        subjectInputs.appendChild(inputGroup);
    });
}

function calculateSGPA() {
    const selectedCourse = courseSelect.value;
    const courseSubjects = subjects[selectedCourse];
    let totalCredits = 0;
    let weightedSum = 0;
    let resultText = "";

    for (const subject of courseSubjects) {
        const gradeValue = gradeMapping[document.getElementById(subject.id).value];

        if (isNaN(gradeValue)) {
            result.innerHTML = "Error: Please enter valid grades for all subjects.";
            return;
        }

        const earnedPoints = gradeValue * subject.credits;
        weightedSum += earnedPoints;
        totalCredits += subject.credits;

        resultText += `${subject.name}: ${gradeValue} x ${subject.credits} = ${earnedPoints.toFixed(2)} points<br>`;
    }

    const sgpa = weightedSum / totalCredits;
    result.innerHTML = `${resultText}<br><strong>Total SGPA: ${sgpa.toFixed(2)}</strong>`;
}

courseSelect.addEventListener("change", updateSubjectInputs);
calculateButton.addEventListener("click", calculateSGPA);

// Initialize inputs for the default course
updateSubjectInputs();

