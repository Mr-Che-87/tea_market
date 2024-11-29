// Склонение существительного в зависимости от последней цифры:
export default function declensionText(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {     //11-19 - исключения
      return `${count} товаров`;
    }
  
    if (lastDigit === 1) {
      return `${count} товар`;
    }
  
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${count} товара`;
    }
  
    return `${count} товаров`;
  }
  