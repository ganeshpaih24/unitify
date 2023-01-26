//Input and output attributes
var Input = document.getElementsByClassName('Input-value');
var Output = document.getElementsByClassName('Output-value');
var selectedUnitIndex, inputUnitIndex, outputUnitIndex;

function openTab(evt, name) {
  var i, tabcontent, name;
  console.log(Input)
  selectedUnitIndex = evt.currentTarget.selectedIndex;

  if (selectedUnitIndex == 0) name = 'unit-length';
  else if (selectedUnitIndex == 1) name = 'unit-mass';
  else if (selectedUnitIndex == 2) name = 'unit-volume';
  else if (selectedUnitIndex == 3) name = 'unit-temperature';
  else if (selectedUnitIndex == 4) name = 'unit-time';

  tabcontent = document.getElementsByClassName('tabcontent');

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  displaytype = document.getElementsByClassName(name);

  for (i = 0; i < displaytype.length; i++) {
    displaytype[i].style.display = 'flex';
  }
  Input[selectedUnitIndex].value = Output[selectedUnitIndex].value ='';
}

//Conversion is done by mutiplying or dividing an input number with a particular value,i.e,factor
//factor is a 2d array that saves the values of different options of each select attribute of each unit with respect to a single unit
var factor = new Array();

//inputUnit[0] = ['Meter', 'Kilometer', 'Centimeter','Millimeter', 'Micrometer','Nanometer', 'Decimeter', 'Mile', 'inch', 'Yard', 'Foot', 'Light-Year', 'Terameter','Parsec', 'Astronomical Unit','Nautical Mile', 'Fermi'];
factor[0] = [
  1, 1000, 1e-2, 1e-3, 1e-6, 1e-9, 10, 1609.344, 0.0254, 0.9144,
  0.3048, 9460550000000000, 1e-12, 30837400000000000, 149598000000,
  1852, 1e-15,
];

//inputUnit[1]= new Array("Kilogram","Gram","Milligram","Ton","Pound","Ounce","Carat","AMU","Quarter","Qunital","Grain");
factor[1] = new Array(
  1,
  0.001,
  0.000001,
  1000,
  0.453592,
  0.0283495,
  0.0002,
  1.67377e-27,
  11.33980925,
  100,
  6.47989e-5
);

//inputUnit[2]=new Array("Cubic Meter","Cubic Kilometer","Cubic Centimeter","Cubic Millimeter","Liter","Milli Liter","Gallon","Quart","Pint","Cup","Tablespoon","Teaspoon","Barrel");
factor[2] = new Array(
  1,
  1e9,
  1e-6,
  1e-9,
  0.001,
  1e-6,
  0.00378541,
  0.000946353,
  0.000473176,
  0.000236588,
  1.47868e-5,
  4.9289e-6,
  0.16
);

//inputUnit[3]= new Array("Kelvin","Celsius","Fahrenheit");
factor[3] = new Array(1, 1, 0.555555555555);
//temperature is a special case, as it requires addition/subtraction along with multiplication/division, hence an extra array is needed
var tempAdd = new Array(-273.15, 0, -32);

//inputUnit[4]= new Array("Second","Millisecond","Minute","Hour","Day","Week","Month","Year","Microsecond","Shake","Septennial");
factor[4] = new Array(
  1,
  0.001,
  60,
  3600,
  86400,
  604800,
  2.628e6,
  3.154e7,
  1e-6,
  1e-8,
  220752000
);

//below function sets the index of the above arrays
function selectedUpdate(num) {
  //num=0 for select attribute on the input side, num=1 otherwise
  //gets all the input select attributes
  selectedInputValue = document.getElementsByClassName('Unit-1');

  //gets all the output select attributes
  selectedOutputValue = document.getElementsByClassName('Unit-2');
  console.log(num);

  //factorIndex is index of the factor array as well as above 2 select value arrays
  factorIndex = selectedUnitIndex;
    if (num == 0) {
        inputUnitIndex = selectedInputValue[factorIndex].selectedIndex; //the unit chosen in input select attribute is stored in the form of index in inputUnitIndex
        // console.log(selectedInputValue[factorIndex].selectedIndex);
    }
    else {
        outputUnitIndex = selectedOutputValue[factorIndex].selectedIndex; //the unit chosen in output select attribute is stored in the form of index in outputUnitIndex
        // console.log(selectedOutputValue[factorIndex]);
    
    }
}

//function to validate input before making the conversion
function CalculateUnit() {
  var sourceValue = Input[selectedUnitIndex].value;
  console.log(sourceValue)
  sourceValue = parseFloat(sourceValue);  
  if (!isNaN(sourceValue) || sourceValue == 0) {
    Input[selectedUnitIndex].value = sourceValue;
    Convert();
  }
}

// Converts the contents of input box to the units specified in the output select attribute and puts the result in the output box.
function Convert() {
  var inputFactor;
  var outputFactor;
  var result = 0;

  //used to select the particular element from the 2d factor array, same for outputFactor
  inputFactor = factor[factorIndex][inputUnitIndex];
    // console.log(outputUnitIndex);
  outputFactor = factor[factorIndex][outputUnitIndex];

  result = Input[selectedUnitIndex].value;
  //   console.log(result)

  //Temperature inputs are added/subtracted
  tempResult = parseFloat(result);
  if (selectedUnitIndex == 3) {
    result = tempResult + tempAdd[inputUnitIndex];
  }

  //input value is multiplied by an factor element
  result = result * inputFactor;
  // console.log(result);

  //input value is divided(useful when output select attribute has unit other than first unit)
  result = result / outputFactor;
//   console.log(outputFactor);

  //Temperature handled again
  if (selectedUnitIndex == 3) {
    result = result - tempAdd[outputUnitIndex];
  }
  Output[selectedUnitIndex].value = result;
  //   console.log(Output.value);
}