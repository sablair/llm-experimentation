export default function math(a, b, operator) {
  if (typeof a !== "number") {
    a = parseFloat(a);
  }

  if (typeof b !== "number") {
    b = parseFloat(b);
  }

  switch (operator) {
    case "+":
      console.log(`${a} + ${b}`);
      return a + b;
    case "-":
      console.log(`${a} - ${b}`);
      return a - b;
    case "*":
      console.log(`${a} * ${b}`);
      return a * b;
    case "/":
      console.log(`${a} / ${b}`);
      return a / b;
    default:
      return "What are you doing?!";
  }
}
