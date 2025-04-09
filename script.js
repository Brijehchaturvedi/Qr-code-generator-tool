function updateInputField() {
  const type = document.getElementById("qrType").value;
  const textarea = document.getElementById("qrContent");
  textarea.placeholder =
    type === "url"
      ? "Enter a URL..."
      : type === "text"
      ? "Enter some text..."
      : type === "vcard"
      ? "Enter contact info like: N:Name;TEL:1234567890;EMAIL:email@example.com;"
      : "Enter WiFi info like: T:WPA;S:Network;P:Password;;";
}

function generateQR() {
  const type = document.getElementById("qrType").value;
  let content = document.getElementById("qrContent").value;
  const color = document.getElementById("qrColor").value;
  const bgColor = document.getElementById("bgColor").value;
  const size = parseInt(document.getElementById("qrSize").value);

  const qrOutput = document.getElementById("qrOutput");
  qrOutput.innerHTML = "";

  if (type === "vcard") {
    content = "BEGIN:VCARD\nVERSION:3.0\n" + content + "\nEND:VCARD";
  } else if (type === "wifi") {
    content = "WIFI:" + content;
  }

  const options = {
    width: size,
    color: {
      dark: color,
      light: bgColor,
    },
  };

  QRCode.toCanvas(document.createElement("canvas"), content, options, (err, canvas) => {
    if (err) console.error(err);
    qrOutput.appendChild(canvas);
    document.querySelector(".download-button").style.display = "block";
    canvas.id = "qrCanvas";
  });
}

function downloadQR() {
  const canvas = document.getElementById("qrCanvas");
  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
