export async function dict(word) {
  console.log(word);
  if (word) {
    const response = await fetch(
      `https://api.safone.me/dictionary?query=${word}`
    );
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } else return error();
}

export function convert(value, param) {
  let rsp = "";
  if (param === "error") return error();
  else {
    if (param === "binary") rsp = binary(value);
    else if (param === "decimal") rsp = decimal(value);
    else if (param === "hexadecimal") rsp = hexadecimal(value);
    else if (param === "octal") rsp = octal(value);
    else return error();
  }

  let json = JSON.stringify({
    binary: rsp.bin,
    decimal: rsp.dec,
    hexadecimal: rsp.hex,
    octal: rsp.oct,
  });

  let headers = new Headers({ "Content-Type": "application/json" });
  return new Response(json, { headers: headers });
}

function binary(bin) {
  const dec = parseInt(bin, 2);
  const hex = dec.toString(16);
  const oct = dec.toString(8);
  return { bin, dec, hex, oct };
}

function decimal(dec) {
  dec = parseInt(dec);
  const bin = dec.toString(2);
  const hex = dec.toString(16);
  const oct = dec.toString(8);
  return { bin, dec, hex, oct };
}

function hexadecimal(hex) {
  const dec = parseInt(hex, 16);
  const bin = dec.toString(2);
  const oct = dec.toString(8);
  return { bin, dec, hex, oct };
}

function octal(oct) {
  const dec = parseInt(oct, 8);
  const bin = dec.toString(2);
  const hex = dec.toString(16);
  return { bin, dec, hex, oct };
}

function error() {
  return new Response("Invalid Request", { status: 400 });
}
