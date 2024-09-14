// function download(url, fullName) {
//   const anchor = document.createElement('a')
//   anchor.href = url
//   anchor.style.display = 'none'
//   anchor.setAttribute('download', fullName)
//   document.body.appendChild(anchor)
//   anchor.click()
//   document.body.removeChild(anchor)
// }

// function screenshot(imgNode, format = 'png', quality = 1) {
//   const canva = document.createElement('canva')
//   canva.width = imgNode.width
//   canva.height = imgNode.height

//   const context = canva.getContext('2d')
//   context.filter = getComputedStyle(imgNode).filter

//   imgNode.setAttribute('crossOrigin', 'anonymous')

//   context.drawImage(imgNode, 0, 0, canva.width, canva.height)
//   const url = canva.toDataURL(`image/${format}`, quality)

//   return {
//     url,
//     then: (cb) => {
//       cb(url)
//     },
//     download: (name = 'image') => {
//       download(url, `${name}.${format}`)
//     }
//   }
// }
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
