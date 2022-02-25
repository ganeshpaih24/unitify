//All the select attributes of different units are called
var Length       = document.getElementById("Length-data");
var Length2      = document.getElementById("Length-data-2");
var Mass         = document.getElementById("Mass-data");
var Mass2        = document.getElementById("Mass-data-2");
var Volume       = document.getElementById("Volume-data");
var Volume2      = document.getElementById("Volume-data-2");
var Temperature  = document.getElementById("Temperature-data");
var Temperature2 = document.getElementById("Temperature-data-2");
var Time         = document.getElementById("Time-data");
var Time2        = document.getElementById("Time-data-2");

//Input and output attributes
var Input        = document.getElementById("Input-value");
var Output       = document.getElementById("Output-value");

//All the select attributes are stored in an array
const tabChangeArray= [
    Length,      Length2,
    Mass,        Mass2,
    Volume,      Volume2,
    Temperature, Temperature2,
    Time,        Time2
]

//Used to change the display of select attributes of different units
function tabChangeFunction(unitNumber){        //unitNumber= index of tabChangeArray
    const isEven = num => num % 2 === 0;
    
    //first hides all the select attributes
    tabChangeArray.forEach((unit)=>unit.style.display="none");
    
    //displays only that attribute that has been clicked
    (isEven(unitNumber)||unitNumber==0)?tabChangeArray[unitNumber].style.display=tabChangeArray[unitNumber+1].style.display='block':tabChangeArray[unitNumber].style.display=tabChangeArray[unitNumber-1].style.display='block';
    
    //clears the input and output attributes each time any tab is clicked/ during load
    Input.value=Output.value="";
    
    //selected index is saved
    presentUnitIndex=unitNumber;
}

//Conversion is done by mutiplying or dividing an input number with a particular value,i.e,factor
//factor is a 2d array that saves the values of different options of each select attribute of each unit with respect to a single unit
var factor=new Array();

//inputUnit[0] = ['Meter', 'Kilometer', 'Centimeter','Millimeter', 'Micrometer','Nanometer', 'Decimeter', 'Mile', 'inch', 'Yard', 'Foot', 'Light-Year', 'Terameter','Parsec', 'Astronomical Unit','Nautical Mile', 'Fermi'];
factor[0] = [1, 1000, 1e-2, 1e-3, 1e-6,1e-9, 10, 1609.344, 0.0254, .9144, 0.3048, 9460550000000000,1.E-12,30837400000000000,149598000000,1852,1e-15];

//inputUnit[1]= new Array("Kilogram","Gram","Milligram","Ton","Pound","Ounce","Carat","AMU","Quarter","Qunital","Grain");
factor[1]= new Array(1,.001,.000001,1000,0.453592,0.0283495,0.0002,1.67377e-27,11.33980925,100,6.47989e-5);

//inputUnit[2]=new Array("Cubic Meter","Cubic Kilometer","Cubic Centimeter","Cubic Millimeter","Liter","Milli Liter","Gallon","Quart","Pint","Cup","Tablespoon","Teaspoon","Barrel");
factor[2]= new Array(1,1e+9,1e-6,1e-9,0.001,1e-6,0.00378541,0.000946353,0.000473176,0.000236588,1.47868e-5,4.9289e-6,0.16);

//inputUnit[3]= new Array("Kelvin","Celsius","Fahrenheit");
factor[3]= new Array( 1,1, 0.555555555555);
//temperature is a special case, as it requires addition/subtraction along with multiplication/division, hence an extra array is needed
var tempAdd = new Array(-273.15,0,-32);
    
//inputUnit[4]= new Array("Second","Millisecond","Minute","Hour","Day","Week","Month","Year","Microsecond","Shake","Septennial");
factor[4]= new Array(1,0.001,60,3600,86400,604800,2.628e+6,3.154e+7,1e-6,1e-8,220752000);

//below function sets the index of the above arrays
function selectedUpdate(num){                //num=0 for select attribute on the input side, num=1 otherwise
    //gets all the input select attributes
    selectedInputValue=document.getElementsByClassName("Unit-1");
    
    //gets all the output select attributes
    selectedOutputValue=document.getElementsByClassName("Unit-2");
    
    //factorIndex is index of the factor array as well as above 2 select value arrays
    factorIndex=presentUnitIndex/2
    factorIndex= Math.floor(factorIndex);
    if(num==0)
    inputUnitIndex=selectedInputValue[factorIndex].selectedIndex//the unit chosen in input select attribute is stored in the form of index in inputUnitIndex
    else 
    outputUnitIndex=selectedOutputValue[factorIndex].selectedIndex//the unit chosen in output select attribute is stored in the form of index in outputUnitIndex
}

//function to validate input before making the conversion
function CalculateUnit() {
    var sourceValue = Input.value;
    sourceValue = parseFloat(sourceValue);
    if (!isNaN(sourceValue) || sourceValue == 0) {
      Input.value= sourceValue;
      Convert();
    }
}

// Converts the contents of input box to the units specified in the output select attribute and puts the result in the output box.
function Convert(){
    var inputFactor;
    var outputFactor;
    var result=0;
 
    //used to select the particular element from the 2d factor array, same for outputFactor
    inputFactor = factor[factorIndex][inputUnitIndex];
    outputFactor = factor[factorIndex][outputUnitIndex];
  
    result = Input.value;
    
    //Temperature inputs are added/subtracted
    tempResult=parseFloat(result)
    if (presentUnitIndex==6||presentUnitIndex==7) {
      result = tempResult + tempAdd[inputUnitIndex];
    }

    //input value is multiplied by an factor element
    result = result * inputFactor;

    //input value is divided(useful when output select attribute has unit other than first unit)
    result = result / outputFactor;

    //Temperature handled again
    if (presentUnitIndex==6||presentUnitIndex==7) {
        result = result - tempAdd[outputUnitIndex];
    }
    Output.value = result;
}