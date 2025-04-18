
export const scrollToCalculator = () => {
  const calculatorElement = document.getElementById('calculator-section');
  if (calculatorElement) {
    calculatorElement.scrollIntoView({ behavior: 'smooth' });
  }
};
