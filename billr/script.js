let items = 1
let serverUrl = 'https://billr-api.onrender.com'
function addItems() {
    items += 1
    document.getElementById('descTable').innerHTML += `
    <tr>
    <td contenteditable="true" id="i${items}"></td>
    <td contenteditable="true" id="q${items}"></td>
    <td contenteditable="true" id="p${items}"></td>
    <td id="t${items}"></td></tr>`
}

document.getElementById('descTablex').addEventListener('input', (e) => totalCalc(e))
function totalCalc(e) {
    if (e.target.tagName === 'TD') {
        let id = e.target.id
        let sno = id.slice(1)
        if (id[0] === 'p') {
            if (document.getElementById(`q${sno}`).innerText === '') {
                document.getElementById(`q${sno}`).style.background = "#ff000020"
            } else {
                let total = parseInt(document.getElementById(`q${sno}`).innerText) * parseInt(document.getElementById(`p${sno}`).innerText)
                document.getElementById(`t${sno}`).innerText = isNaN(total) ? '' : total
                desTotal()
            }
        }
        if (id[0] === 'q') {
            document.getElementById(`q${sno}`).style.background = "none"
            if (document.getElementById(`p${sno}`).innerText !== '') {
                let total = parseInt(document.getElementById(`q${sno}`).innerText) * parseInt(document.getElementById(`p${sno}`).innerText)
                document.getElementById(`t${sno}`).innerText = isNaN(total) ? '' : total
                desTotal()
            }

        }
    }
}


function desTotal() {
    let tot = 0
    for (let i = 0; i < items; i++) {
        tot += parseInt(document.getElementById(`t${i + 1}`).innerText)
    }
    document.getElementById('desTot').innerText = isNaN(tot) ? '0.00' : tot.toFixed(2)
}

function calculateTotal(due) {
    let tot = 0
    for (let i = 0; i < items; i++) {
        tot += parseInt(document.getElementById(`t${i + 1}`).innerText)
    }
    return parseInt(due) + tot
}

function generateBillId() {

    fetch(`${serverUrl}/generate`)
        .then(res => res.json())
        .then(id => {
            console.log(id)
            document.getElementById('billId').value = id.id
        }).catch(e => {
            console.log(e)
        })
}
function getDate() {
    let now = new Date()
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return now.toLocaleString('en-GB', options).replace(',', '');
}
let billData
function createBill() {
    let total = 0
    let billId = document.getElementById('billId').value
    let billDate = document.getElementById('billDate').value
    let name = document.getElementById('salName').value + document.getElementById('fullName').value
    let prevDue = document.getElementById('prevDue').value
    let payMeth = document.getElementById('paymentM').value
    let paySts = document.getElementById('paymentS').value
    let notes = document.getElementById('notes').value
    if (billId == '') {
        alert("Generate proper BillId")
        return
    }
    if (billDate == '') {
        alert("Enter Bill Date")
        return
    }
    if (items == 1 && document.getElementById('t1').innerText === '') {
        alert("Enter Description!")
        return
    }
    if (name == '') {
        alert("Enter customer name!")
        return
    }
    let due;
    if (prevDue === '') {
        total = calculateTotal(0)
        due = 0
    } else {
        total = calculateTotal(parseInt(prevDue))
        due = parseInt(prevDue)
    }

    let desc = []
    for (let i = 0; i < items; i++) {
        let obj = {
            item: document.getElementById(`i${i + 1}`).innerText,
            quantity: document.getElementById(`q${i + 1}`).innerText,
            price: document.getElementById(`p${i + 1}`).innerText,
            total: document.getElementById(`t${i + 1}`).innerText
        }
        desc.push(obj)
    }
    let payload = {
        billId: billId,
        date: billDate,
        name: name,
        items: items,
        mode: payMeth,
        notes: notes,
        bill: total,
        due: due,
        status: paySts,
        generated: getDate(),
        description: desc
    }
    fetch(`${serverUrl}/bill`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(a => alert(a.msg))
        .catch(a => console.log(a))


    billData = payload
    downloadBill()
}
function downloadBill() {

    document.getElementById('invName').innerText = billData.name
    document.getElementById('invId').innerText = billData.billId
    document.getElementById('invMode').innerText = billData.mode
    document.getElementById('invDate').innerText = billData.date
    document.getElementById('invTab').innerHTML = '<tr><th>Item</th><th>Qty</th><th>Price</th><th>Sub Total</th></tr>'

    for (let i = 0; i < parseInt(billData.items); i++) {
        document.getElementById('invTab').innerHTML += `
        <tr>
        <td>${billData.description[i].item}</td>
        <td>${billData.description[i].quantity}</td>
        <td>${billData.description[i].price}</td>
        <td>${parseInt(billData.description[i].total).toFixed(2)}</td></tr>`
    }
    document.getElementById('invDue').innerText = parseInt(billData.due).toFixed(2)
    document.getElementById('invTotal').innerText = parseInt(billData.bill).toFixed(2)


    const elementToSave = document.getElementById('billPrintable');
    html2canvas(elementToSave, {
        scale: 5,
        width: elementToSave.scrollWidth - 1,
        height: elementToSave.scrollHeight - 1
    }).then(canvas => {
        var dataUrl = canvas.toDataURL("image/jpeg");
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${billData.billId}.png`;
        a.click();
    });

}


