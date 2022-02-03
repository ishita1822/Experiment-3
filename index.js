// 0->one 1->two 2->three 3->four

wireTerminalCheck = [{'one': false, 'four': false},
                        {'two': false,'resistor': false},{'three': false, 'capacitor': false},
                        {'resistor': false, 'three': false},{'four': false, 'capacitor': false}]

terminalMap = {0:'one', 1:'two', 2:'three', 3:'four','resistor': 'resistor', 'capacitor':'capacitor'}

var xValues = [0,30,60,90,120,150,180,210,240,270,300,330,360];

sequenceNum = 0

var rowData =  {'sno':0, 'time': 0, 'volts': 0}
localStorage.setItem("rowData", JSON.stringify(rowData))
localStorage.setItem("fullScreen", false)
localStorage.setItem("transitionDis", false)
var btnPressed = [false, false]

setTimeout(() => {
    enablingSequence(sequenceNum)
}, 2000);


function enablingSequence(sequenceNum){    
    if(sequenceNum <= wireTerminalCheck.length){
        for(var key in wireTerminalCheck[sequenceNum]){
            elem = document.getElementsByClassName(key)[0]
            elem.style.stroke = "#FFFF00"
            elem.style.animationName = "pulse"
            elem.style.opacity = "1"
        }
    }        
}

function trial(componentSom){
    componentSomMap = terminalMap[componentSom]
    for(var key in wireTerminalCheck[sequenceNum])
        if(key == componentSomMap)
            wireTerminalCheck[sequenceNum][key] = true
    
    elem = document.getElementsByClassName(componentSomMap)[0]
    elem.style.animationName = "none"
    elem.style.stroke = "none"
    // console.log(checkPair())
    dum = checkPair(sequenceNum)
    // console.log(dum)
    if(dum){
        wireName = 'wire'+(sequenceNum+2)
        document.getElementById(wireName).style.transition = "display 10s"
        document.getElementById(wireName).style.display = "block"
        ++sequenceNum
        if(sequenceNum < wireTerminalCheck.length)
            enablingSequence(sequenceNum)
        else
            replacement()
    }
}

function checkPair(sequenceNum){
    count = 0
    for(var key in wireTerminalCheck[sequenceNum])
        if(wireTerminalCheck[sequenceNum][key] == true)
            count++
        console.log(count, 'count')
        if(count == 2)
            return true   
        return false
}    
    
function replacement(){
    document.getElementById('black-board').classList.add('hidden')
    document.getElementById('table-board').classList.add('replacement');

    document.getElementById('stopwatch-button').style.stroke = "yellow"
    document.getElementById('stopwatch-button').style.strokeWidth = "1%"
    document.getElementById('stopwatch-button').onclick = function(){
        checkbtnPressed(1)
    }

    document.getElementById('power-btn').style.stroke = "yellow"
    document.getElementById('power-btn').style.strokeWidth = "2%"
    document.getElementById('power-btn').onclick = function(){
        checkbtnPressed(0)
    }
    localStorage.setItem('fullScreen', true)
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function checkbtnPressed(btnNum){
    btnPressed[btnNum] = true
    if(btnNum == 0){
        document.getElementById("power").textContent = "02.50"
        document.getElementById('volt').textContent = "00.36"
        document.getElementById('power-btn').style.strokeWidth = "0%"
    }
    else
        document.getElementById('stopwatch-button').style.strokeWidth = "0%"
    
    if(btnPressed[0] && btnPressed[1]){    
        startWorking('charging')
    }
}

function startWorking(conditionChar){
    rowData =  {'sno':0, 'time': 0, 'volts': 0.36}
    localStorage.setItem("rowData", JSON.stringify(rowData))
    stopwatch = document.getElementById('stopwatch')
    voltmeter = document.getElementById('volt')
    if(conditionChar === 'charging'){
        // voltmeter.textContent = "00.36"
        volt = 36
        time = 0
        min = 4
        max = 6
        srno = 1
        // actualWorking(volt, time, min, max, srno)
        yValuesdum = []
        stopwatchTime = setInterval(() => {
            if(time< 10)
                stopwatch.textContent = '00'+time+'.0'
            else if(time<100)
                stopwatch.textContent = '0'+time+'.0'
            else
                stopwatch.textContent = time+'.0'
            time++
            if(time == 211){
                clearInterval(stopwatchTime)
                clearInterval(voltReading)
                clearInterval(dataPass)
                localStorage.setItem("transitionDis", true)
                // elem = document.getElementById("checker")
                // elem.style.stroke = "#FFFF00"
                // elem.style.animationName = "pulse"
                // elem.style.opacity = "1"
                // elem.onclick = function(){
                //     startWorking('discharging')
                // }
                setTimeout(() => {
                    startWorking('discharging')    
                }, 4000);
            }
        }, 330);
        voltReading = setInterval(() => {
            volt += getRndInteger(min, max)
            if(volt<100)
                voltmeter.textContent = "00."+volt
            else if(volt < 200){
                if(volt < 110)
                    voltmeter.textContent = "01.0"+(volt-100)
                else 
                    voltmeter.textContent = "01."+(volt-100)
            }
        }, 1000);
        dataPass = setInterval(() => {
            if(min>0) min--
            if(max>1) max--
            yValue = parseFloat(voltmeter.textContent)
            yValuesdum.push(yValue)
            rowData.sno = srno
            rowData.time = xValues[srno]
            rowData.volts = yValue
            localStorage.setItem('rowData', JSON.stringify(rowData))
            srno++          
        }, 9901);
    }else{
        volt = parseFloat(voltmeter.textContent)*100
        time = 210
        min = 3
        max = 6
        srno = 8
        // actualWorking(volt, time, min, max, srno)
        yValuesdum = []
        stopwatchTime = setInterval(() => {
            stopwatch.textContent = time+'.0'
            time++
            if(time == 361){
                clearInterval(stopwatchTime)
                clearInterval(voltReading)
                clearInterval(dataPass)
            }
        }, 330);
        voltReading = setInterval(() => {
            volt -= getRndInteger(min, max)
            if(volt<100)
                voltmeter.textContent = "00."+volt
            else if(volt < 200){
                if(volt < 110)
                    voltmeter.textContent = "01.0"+(volt-100)
                else 
                    voltmeter.textContent = "01."+(volt-100)
            }
        }, 1000);
        dataPass = setInterval(() => {
            if(min>0) min--
            if(max>1) max--
            yValue = parseFloat(voltmeter.textContent)
            yValuesdum.push(yValue)
            rowData.sno = srno
            rowData.time = xValues[srno]
            rowData.volts = yValue
            localStorage.setItem('rowData', JSON.stringify(rowData))
            srno++
        }, 9901);

    }
}

