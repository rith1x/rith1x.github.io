let items = 1
let serverUrl = 'https://billr-api.onrender.com'

document.addEventListener('DOMContentLoaded', () => {
    fetch(serverUrl)
        .then(res => res.json())
        .then(data => {
            document.getElementById('lscr').style.display = 'none'
        })
})



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
        .then(a => alert("Data updated in the server!, click 'ok' to proceed with printing."))
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
    if (parseInt(billData.due) !== 0) {
        document.getElementById("inDue").style.display = 'flex'
        document.getElementById('invDue').innerText = parseInt(billData.due).toFixed(2)
    } else {
        document.getElementById("inDue").style.display = 'none'
    }
    document.getElementById('invTotal').innerText = parseInt(billData.bill).toFixed(2)

    screenshot()
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

let canvaas = document.getElementById('billPrintable')
function capture() {
    // domtoimage.toBlob(document.getElementById('canvas'), {
    //     quality: 2,
    // })
    //     .then(function (blob) {
    //         saveAs(blob, 'export.png');
    //     });

    document.fonts.ready.then(() => {
        requestAnimationFrame(() => {

            // domtoimage
            //     .toJpeg(document.getElementById('canvas'), { quality: 1.0, width: canvaas.offsetWidth * 3, height: canvaas.offsetHeight * 3 })
            //     .then(function (dataUrl) {
            //         var link = document.createElement('a');
            //         link.download = 'my-image-name.jpeg';
            //         link.href = dataUrl;
            //         link.click();
            //     });

            // Select all elements inside the body
            // const allElements = document.querySelectorAll('body *');

            // Loop through each element and apply the scale
            // allElements.forEach((element) => {
            //     element.style.transform = 'scale(3)';
            //     element.style.transformOrigin = 'top left'; // Ensure the scale happens from the top-left
            // });


            // domtoimage.toBlob(document.getElementById('canvas'), {
            //     quality: 2, width: canvaas.offsetWidth * 3, height: canvaas.offsetHeight * 3
            // })
            //     .then(function (blob) {
            //         saveAs(blob, 'export.png');
            //     });
            // allElements.forEach((element) => {
            //     element.style.transform = 'scale(1)'; // Reset the scale back to normal
            // });

            // html2canvas(canvaas, {
            //     scale: 5,
            //     width: canvaas.scrollWidth - 1,
            //     height: canvaas.scrollHeight - 1
            // }).then(canvas => {
            //     var dataUrl = canvas.toDataURL("image/jpeg");
            //     const a = document.createElement('a');
            //     a.href = dataUrl;
            //     a.download = 'quote.png';

            //     a.click();
            // });



            screenshot(canvaas).download()

            // domtoimage.toPng(canvaas)
            //     .then(function (dataUrl) {
            //         var img = new Image();
            //         img.src = dataUrl;

            //         // Convert the data URL to a Blob
            //         var byteString = atob(dataUrl.split(',')[1]);
            //         var mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

            //         var ab = new ArrayBuffer(byteString.length);
            //         var ia = new Uint8Array(ab);
            //         for (var i = 0; i < byteString.length; i++) {
            //             ia[i] = byteString.charCodeAt(i);
            //         }

            //         var blob = new Blob([ab], { type: mimeString });

            //         // Use FileSaver.js to save the blob as an image file
            //         saveAs(blob, 'image.png');
            //     })
            //     .catch(function (error) {
            //         console.error('oops, something went wrong!', error);
            //     });


        })
    })



}

function download(url, fullName) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.style.display = 'none';
    anchor.setAttribute('download', fullName);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

function screenshot(imgNode, format = 'png', quality = 1) {
    const canva = document.createElement('canva');
    canva.width = imgNode.width;
    canva.height = imgNode.height;

    const context = canva.getContext('2d');
    context.filter = getComputedStyle(imgNode).filter;

    imgNode.setAttribute('crossOrigin', 'anonymous');

    context.drawImage(imgNode, 0, 0, canva.width, canva.height);
    const url = canva.toDataURL(`image/${format}`, quality);

    return {
        url: url,
        then: function (cb) {
            cb(url);
        },
        download: function (name = 'image') {
            download(url, `${name}.${format}`);
        }
    };
}