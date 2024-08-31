const semesters = []
let currSem = 0

const grades = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "U": 0
}
function calculateCGPA() {
    let sems = semesters.length
    let grtotal = 0;
    let cdtotal = 0
    for (let i = 0; i < sems; i++) {
        grtotal += semesters[i].gptotal
        cdtotal += semesters[i].cdtotal
        if (semesters[i].whcrds > 0) {
            cdtotal -= semesters[i].whcrds
        }
    }

    document.getElementById("cgpa").innerText = (grtotal / cdtotal).toFixed(4)
}
function addSemester() {
    const title = document.getElementById('semName').value
    const subs = parseInt(document.getElementById('semSubs').value)
    const container = document.getElementById('semContainer');
    semesters[currSem++] = new Gpa(title, subs, container, currSem - 1)
    closeMenu()
}
function addSemesterMenu() {
    document.getElementById('addSemMenu').style.visibility = "visible"
}
function closeMenu() {
    document.getElementById('addSemMenu').style.visibility = "hidden"

}
function calculate(iter) {
    semesters[iter].calculateGpa()
    calculateCGPA();

}
function grtogp(loc) {
    const grd = document.getElementById(`iGr${loc}`).value
    document.getElementById(`iGp${loc}`).value = parseInt(grades[grd.trim().toUpperCase()])
}
class Gpa {
    gptotal = 0
    cdtotal = 0
    gpa;
    subs = 0;
    iterate = 0;
    whcrds = 0;


    constructor(name, subs, container, iter) {
        this.subs = subs
        this.iterate = iter
        const semElem = document.createElement('div')
        semElem.className = "semester"
        semElem.id = `sem${iter}`
        const topBar = document.createElement('div')
        topBar.className = "sem-top-bar"
        const title = document.createElement('h1')
        title.innerText = name
        const semGpa = document.createElement("h1")
        semGpa.className = "sem-gpa"
        semGpa.id = `semGpa${iter}`
        topBar.append(title, semGpa)
        semElem.appendChild(topBar)
        let bodyArea = document.createElement('div')
        bodyArea.className = "gradeTable"
        let headField = document.createElement("div");
        headField.className = "fieldtab";
        let c1 = document.createElement("div");
        let c2 = document.createElement("div");
        let c3 = document.createElement("div");
        let c4 = document.createElement("div");
        let j1 = document.createElement("h4");
        let j2 = document.createElement("h4");
        let j3 = document.createElement("h4");
        let j4 = document.createElement("h4");
        j1.innerText = "Subject";
        j2.innerText = "Grade";
        j3.innerText = "GradePoint";
        j4.innerText = "Credits";
        c1.appendChild(j1);
        c2.appendChild(j2);
        c3.appendChild(j3);
        c4.appendChild(j4);
        headField.append(c1, c2, c3, c4);
        bodyArea.appendChild(headField)
        for (let i = 0; i < subs; i++) {
            let fieldDiv = document.createElement("div");
            fieldDiv.className = "fieldtab";
            let subCode = document.createElement("div");
            let grade = document.createElement("div");
            let credit = document.createElement("div");
            let gradePoint = document.createElement("div");
            let iSc = document.createElement("input");
            let iGr = document.createElement("input");
            let iCr = document.createElement("input");
            let iGp = document.createElement("input");
            iGr.id = `iGr${iter}${i}`;
            iGp.id = `iGp${iter}${i}`;
            iCr.id = `iCr${iter}${i}`;
            iGr.setAttribute("type", "text");
            iGr.setAttribute("oninput", `grtogp("${iter}${i}")`);
            iGp.setAttribute("type", "number");
            iGp.setAttribute("readonly", "true");
            iCr.setAttribute("type", "number");
            if (i == subs - 1)
                iCr.setAttribute("oninput", `calculate("${iter}")`);


            subCode.appendChild(iSc);
            grade.appendChild(iGr);
            credit.appendChild(iCr);
            gradePoint.appendChild(iGp);
            fieldDiv.appendChild(subCode);
            fieldDiv.appendChild(grade);
            fieldDiv.appendChild(gradePoint);
            fieldDiv.appendChild(credit);
            bodyArea.appendChild(fieldDiv);
        }

        semElem.append(bodyArea)
        container.append(semElem)
    }
    calculateGpa() {
        for (let i = 0; i < this.subs; i++) {
            this.gptotal += parseFloat(document.getElementById(`iGp${this.iterate}${i}`).value) * parseFloat(document.getElementById(`iCr${this.iterate}${i}`).value)
            this.cdtotal += parseFloat(document.getElementById(`iCr${this.iterate}${i}`).value)
            if (parseInt(document.getElementById(`iGp${this.iterate}${i}`).value) == 0) {
                this.whcrds += parseFloat(document.getElementById(`iCr${this.iterate}${i}`).value)
            }
        }
        this.gpa = this.gptotal / this.cdtotal
        document.getElementById(`semGpa${this.iterate}`).innerText = this.gpa.toFixed(4)

    }
}