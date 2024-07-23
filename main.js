document.addEventListener('DOMContentLoaded', (event) => {
  const colorsContainer = document.querySelector('.colors_container');

  function deselectAll() {
    const checkboxes = colorsContainer.querySelectorAll('.custom_checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
      checkbox.closest('.colors_content_container').classList.remove('selected');
    });
  }

  colorsContainer.addEventListener('click', function(event) {
    const container = event.target.closest('.colors_content_container');
    if (container) {
      const checkbox = container.querySelector('.custom_checkbox');
      if (checkbox.checked) {
        checkbox.checked = false;
        container.classList.remove('selected');
      } else {
        deselectAll();
        checkbox.checked = true;
        container.classList.add('selected');
      }
    }
  });
});

  function triggerInputChange (inputSelector, inputVal) {
    const event = new Event('change');
    inputSelector.value=inputVal;
    inputSelector.dispatchEvent(event);
  }

  function calculateModules(inputWidthVal, inputHeightVal) {
    const area = inputWidthVal * inputHeightVal;
    const modulesPerCm2 = 0.001953125;
    let modules = area * modulesPerCm2;

    modules = Math.ceil(modules * 2) / 2;

    return modules;
  }

  function updateResult() {
    
    const inputWidthVal = document.getElementById('textInputWidth').value;
    const inputHeightVal = document.getElementById('textInputHeight').value;
    const sizeWithBox = document.getElementById('widht_height_box');
    const screenRezolution = document.getElementById('screen_resolution');
    const ledsDisplay = document.getElementById('leds_area');
    const screenArea = document.getElementById('screen_area');
    const result = document.getElementById('result_area')
    const ledModule = document.getElementById('led_module')

    const resultDataElement = document.querySelector('.result_data');
    const resultSummElement = document.querySelector('.result_summ');
    const orderBtnElement = document.querySelector('.order_bnt');
    const minimumOrderNoticeId = 'minimum-order-notice';
    let minimumOrderNotice = document.getElementById(minimumOrderNoticeId);

    const width = parseInt(inputWidthVal) + 3;
    const height = parseInt(inputHeightVal) + 3;
    
    let modules = calculateModules(inputWidthVal, inputHeightVal);
    const area = (inputWidthVal / 100) * (inputHeightVal / 100);
    const leds = Math.ceil(area * 10000);

    const selectedColorContainer = document.querySelector('.colors_content_container.selected');
    const selectedColor = selectedColorContainer ? selectedColorContainer.querySelector('.custom_checkbox').value : null;

let pricePerModule;
if (selectedColor === 'Красный') {
  pricePerModule = modules <= 5 ? 2448 : 2040;
} else if (['Зеленый', 'Белый', 'Желтый', 'Синий'].includes(selectedColor)) {
  pricePerModule = modules <= 5 ? 2720 : 2380;
} else if (selectedColor === 'RG') {
  pricePerModule = modules <= 5 ? 4040 : 3536;
} else if (selectedColor === 'Автомобильная строка') {
  pricePerModule = 4243;
} else if (selectedColor && selectedColor.includes('Полноцвет')) {
  pricePerModule = 5753;
} 

const totalPrice = modules * pricePerModule;

function showMinimumOrderNotice(message) {
  const resultDataElement = document.querySelector('.result_data');
  const minimumOrderNoticeId = 'minimum-order-notice';
  let minimumOrderNotice = document.getElementById(minimumOrderNoticeId);

  if (!minimumOrderNotice) {
    minimumOrderNotice = document.createElement('div');
    minimumOrderNotice.id = minimumOrderNoticeId;
    minimumOrderNotice.style.color = 'red';
    minimumOrderNotice.style.marginTop = '30px';
    minimumOrderNotice.style.fontSize = '20px';
    minimumOrderNotice.style.textAlign = 'center';
    resultDataElement.parentNode.insertBefore(minimumOrderNotice, resultDataElement);
  }

  minimumOrderNotice.textContent = message;
  resultDataElement.style.display = 'none';
}
function removeMinimumOrderNotice() {
  const minimumOrderNotice = document.getElementById('minimum-order-notice');
  if (minimumOrderNotice) {
    minimumOrderNotice.remove();
  }

  const resultDataElement = document.querySelector('.result_data');
  const resultSummElement = document.querySelector('.result_summ');
  const orderBtnElement = document.querySelector('.order_bnt');
  resultDataElement.style.display = 'flex';
  resultSummElement.style.display = 'flex';
  orderBtnElement.style.display = 'flex';
}

if (selectedColor) {
  if (selectedColor.includes('Полноцвет') && modules < 6) {
    showMinimumOrderNotice('Минимальный заказ для полноцветных панелей - 6 модулей');
    return;
  } else if (!selectedColor.includes('Полноцвет') && modules < 2) {
    showMinimumOrderNotice('Минимальный заказ 2 модуля');
    return;
  } else {
    removeMinimumOrderNotice();
  }
}

    if (modules < 2) {
      resultDataElement.style.display = 'none';
      resultSummElement.style.display = 'none';
      orderBtnElement.style.display = 'none';
  
      if (!minimumOrderNotice) {
        minimumOrderNotice = document.createElement('div');
        minimumOrderNotice.id = minimumOrderNoticeId;
        minimumOrderNotice.textContent = 'Минимальный заказ 2 модуля';
        minimumOrderNotice.style.color = 'red';
        minimumOrderNotice.style.marginTop = '30px';
        minimumOrderNotice.style.fontSize = '20px';
        minimumOrderNotice.style.textAlign = 'center';

        resultDataElement.parentNode.insertBefore(minimumOrderNotice, resultDataElement);
      }
    } else {

      resultDataElement.style.display = 'flex';
      resultSummElement.style.display = 'flex';
      orderBtnElement.style.display = 'flex';
  
      if (minimumOrderNotice) {
        minimumOrderNotice.remove();
      }
    }
    
    sizeWithBox.textContent = `${width}x${height} см`;
    screenRezolution.textContent = `${inputWidthVal}x${inputHeightVal} см`;
    ledModule.textContent = `${modules.toFixed(1)} шт`;
    ledsDisplay.textContent = `${leds} шт`;
    screenArea.textContent = `${area.toFixed(2)} м²`;
    result.textContent = `${totalPrice}`;

    document.querySelectorAll('.custom_checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateResult);
    });
    document.addEventListener('DOMContentLoaded', updateResult);
  }
  
  document.getElementById('textInputWidth').addEventListener('change', updateResult);
  document.getElementById('textInputHeight').addEventListener('change', updateResult);

  function updateInputValueByRange (rangeValue, inputType) {
    const inputElement = document.getElementById(`textInput${inputType}`);
    triggerInputChange(inputElement, rangeValue);
  }

  function incrementValueHeight() {
    const inputHeight = document.getElementById('textInputHeight');
    let value = parseInt(inputHeight.value, 10);
    value = isNaN(value) ? 0 : value;
    value += 16;
    if (value > 512) { value = 512; } 
    triggerInputChange(inputHeight, value);
    document.getElementsByName('rangeInputheight')[0].value = value;
  }
  
  function decrementValueHeight() {
    const inputHeight = document.getElementById('textInputHeight');
    let value = parseInt(inputHeight.value, 10);
    value = isNaN(value) ? 0 : value;
    value -= 16;
    if (value < 32) { value = 32; }
    triggerInputChange(inputHeight, value);
    document.getElementsByName('rangeInputheight')[0].value = value;
  }
  
  function incrementValueWidth() {
    const inputWidth = document.getElementById('textInputWidth');
    let value = parseInt(inputWidth.value, 10);
    value = isNaN(value) ? 0 : value;
    value += 16; 
    if (value > 320) { value = 320; }
    triggerInputChange(inputWidth, value);
    document.getElementsByName('rangeInputwidth')[0].value = value;  
  }
  
  function decrementValueWidth() {
    const inputWidth = document.getElementById('textInputWidth');
    let value = parseInt(inputWidth.value, 10);
    value = isNaN(value) ? 0 : value;
    value -= 16; 
    if (value < 16) { value = 16; } 
    triggerInputChange(inputWidth, value);
    document.getElementsByName('rangeInputwidth')[0].value = value; 
  }

const heightSlider = document.getElementById('rangeHeight');
if (heightSlider) {
  heightSlider.value = heightSlider.min;
  updateInputValueByRange(heightSlider.value, 'Height');
}

const widthSlider = document.getElementById('rangeWigth');
if (widthSlider) {
  widthSlider.value = widthSlider.min;
  updateInputValueByRange(widthSlider.value, 'Width');
}
updateResult();








