type Type = "bin" | "dec" | "oct" | "hex";

function convert(data: { value: string; type: Type }) {
  if (!data.value || !data.type) {
    return error("Missing parameters");
  }

  const baseMap: { [key in Type]: number } = {
    bin: 2,
    oct: 8,
    dec: 10,
    hex: 16,
  };

  const regexMap: { [key in Type]: RegExp } = {
    bin: /^(0b)?[01]+$/i,
    oct: /^(0o)?[0-7]+$/i,
    dec: /^\d+$/,
    hex: /^(0x)?[0-9a-f]+$/i,
  };

  const base = baseMap[data.type];
  const regex = regexMap[data.type];

  if (!regex.test(data.value)) {
    return error("Invalid parameters");
  }

  const val = parseInt(data.value, base);
  const bin = val.toString(2);
  const oct = val.toString(8);
  const dec = val.toString();
  const hex = val.toString(16);

  return { bin, dec, hex, oct };
}

function error(message: string) {
  return { message };
}

export { convert };
