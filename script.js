'use strict'
// 1行目に記載している 'use strict' は削除しないでください

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//................................................................//

//空のペアリング表を作成
const target11 = document.getElementById("emptychartbutton");
target11.addEventListener('click', makeCorrectChart);

let emptychart = [];

function makeCorrectChart(){ 
    let nop = Number(document.getElementById("inputnumber").value);
    function makeInitialChart(nop){
      function makeInitialObject(nop){
        const object = {};                    
        for ( let i = 0 ; i <= nop - 1 ; i ++ ){  
          object[i] = "x";
        }
        return object;
      }
      const intchart = [];
      for ( let i = 0 ; i <= nop - 1 ; i ++){
        intchart.push(makeInitialObject(nop));
      }
      return intchart;
    }
    
    const chart = makeInitialChart(nop);
    for ( let i = 0 ; i <= nop - 1 ; i ++){
      chart[i][i] = "-";
    }
    emptychart = chart;
    return emptychart;
}

//................................................................//

//作成した空のペアリング表を保存(オブジェクト)
const target12 = document.getElementById("savebutton");
target12.addEventListener('click', saveInitialChart);

let result = [];
let initialchart = [];
let newchart = [];
let tempchart = [];

function saveInitialChart(){
  initialchart = JSON.parse(JSON.stringify(emptychart));
  result.push(initialchart);
  newchart = JSON.parse(JSON.stringify(initialchart));
  tempchart = JSON.parse(JSON.stringify(newchart));
}

//................................................................//

//作成した空のペアリング表を画面に表示
const target13 = document.getElementById("displaybutton");
target13.addEventListener('click', displayInitialChart);

function displayInitialChart(){
  const intcharthead = document.getElementById("initialhead");
  const trh = document.createElement("tr");
  const len = Object.keys(initialchart[0]).length;
  intcharthead.appendChild(trh); 
  const tdh = document.createElement("th");
  tdh.textContext = 0 ;
  trh.appendChild(tdh);
  for ( let i = 1 ; i <= len ; i++ ){
    const tdh = document.createElement("th");
    tdh.textContent = i;
    trh.appendChild(tdh);
  }

  const intchart = document.getElementById("initialchart");
  let i = 1;
  initialchart.forEach((player) => {
    const tr = document.createElement("tr");  
    intchart.appendChild(tr);
    const th = document.createElement("th");
    th.textContent = i;
    i = i + 1
    tr.appendChild(th)
    const objArray = Object.entries(player);
    objArray.forEach((arr) => {
      const td = document.createElement("td");
      td.textContent = arr[1];
      tr.appendChild(td);
    }
    );
  }
  );

  let possiblepair = "";
  for (let i = 0; i < initialchart.length; i++){
    for (let j = i; j < Object.keys(initialchart[i]).length; j++){
      if (initialchart[i][j] === "x"){
        possiblepair += `[ ${i+1} , ${j+1} ]` + "\n";
        document.querySelector('.area').innerHTML = possiblepair;
      }
    }
  }
}

//................................................................//

//作成した空のペアリング表をcsv形式で保存
document.getElementById("outputbutton").addEventListener('click', async () => {
  
  let string = " ,";
  let len_array = newchart.length;

  for ( let i = 0 ; i < Object.keys(newchart[0]).length ; i++){
    if ( i === Object.keys(newchart[0]).length - 1 ){
      string += i + 1 + "\n";
    } else {
      string += i + 1 + ",";
    }
  }
  
  for ( let i = 0 ; i < len_array ; i++){
    string += i + 1 + "," ;
    let len_object = Object.keys(newchart[i]).length
    for ( let j = 0 ; j < len_object ; j++ ){
      if( j === len_object -1 ){
        string += newchart[i][j] + "\n";
      } else {
        string += newchart[i][j] + ",";
      }
    } 
  }

  const fh = await window.showSaveFilePicker({ suggestedName: 'initial.csv' });
  const stream = await fh.createWritable();
  const blob = new Blob([string], { type: 'text/csv' });
  await stream.write(blob);
  await stream.close();
  console.log(fh.name);
}
)

//................................................................//

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//................................................................//

//csvファイルを読み込み
let readingfile = [];
let form = document.forms.readform;

form.readfile.addEventListener('change', function(e) {  
  let targetfile = e.target.files[0];
  let reader = new FileReader();
  reader.readAsText(targetfile);
  reader.addEventListener('load', function() {
    readingfile = reader.result.split('\n');
  }
  )
}
) 

//................................................................//

//読み込んだcsvファイルを表示
const target22 = document.getElementById("displaybutton2");
target22.addEventListener('click', displayReadingChart);

function displayReadingChart(){
  
  let readingchart = [];
  for (let i = 1 ; i < readingfile.length - 1 ; i++ ){
    let string = "";
    let object = {};
    let objlength = readingfile[i].length / 2 ;
    for(let j = 1 ; j <= objlength  ; j++ ){
      string += readingfile[i].charAt(j * 2);
      object[j-1] = readingfile[i].charAt(j * 2);
    }
    readingchart.push(object);
  }
  
  let possiblepair = "";
  for (let i = 0; i < readingchart.length; i++){
    for (let j = i; j < Object.keys(readingchart[i]).length; j++){
      if (readingchart[i][j] === "x"){
        possiblepair += `[ ${i+1} , ${j+1} ]` + "\n";
        document.querySelector('.area').innerHTML = possiblepair;
      }
    }
  }

  readingchart = JSON.parse(JSON.stringify(readingchart));
  result.push(readingchart);
  newchart = JSON.parse(JSON.stringify(readingchart));
  tempchart = JSON.parse(JSON.stringify(newchart));
  
  const intcharthead = document.getElementById("initialhead");
  const trh = document.createElement("tr");
  const len = Object.keys(readingchart[0]).length;
  intcharthead.appendChild(trh); 
  const tdh = document.createElement("th");
  tdh.textContext = 0 ;
  trh.appendChild(tdh);
  for ( let i = 1 ; i <= len ; i++ ){
    const tdh = document.createElement("th");
    tdh.textContent = i;
    trh.appendChild(tdh);
  }
  
  const intchart = document.getElementById("initialchart");
  let i = 1;
  readingchart.forEach((player) => {
    const tr = document.createElement("tr");  
    intchart.appendChild(tr);
    const th = document.createElement("th");
    th.textContent = i;
    i = i + 1
    tr.appendChild(th)
    const objArray = Object.entries(player);
    objArray.forEach((arr) => {
      const td = document.createElement("td");
      td.textContent = arr[1];
      tr.appendChild(td);
    }
    );
  }
  );
}

//................................................................//

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//................................................................//

//ペアリングを選択
const target31 = document.getElementById("changebutton");
target31.addEventListener('click', changeChartDaily);

let inputpair = "";

function changeChartDaily(){

  let num1 = Number(document.getElementById("inputchange1").value);
  let num2 = Number(document.getElementById("inputchange2").value);
  newchart[num1-1][num2-1] = "o";
  newchart[num2-1][num1-1] = "o";
  inputpair += `[ ${num1} , ${num2} ]` + "\n";
  document.querySelector('.area2').innerHTML = inputpair;
  for (let i = 0; i < tempchart.length; i++){
    tempchart[num1-1][num2-1] = "o";
    tempchart[num2-1][num1-1] = "o";
    tempchart[num1-1][i] = "-";
    tempchart[num2-1][i] = "-";
    tempchart[i][num1-1] = "-";
    tempchart[i][num2-1] = "-";
  }

  let possiblepair = "";
  for (let i = 0; i < tempchart.length; i++){
    for (let j = i; j < Object.keys(tempchart[i]).length; j++){
      if (tempchart[i][j] === "x"){
        possiblepair += `[ ${i+1} , ${j+1} ]` + "\n";
        document.querySelector('.area').innerHTML = possiblepair;
      }
    }
  }
  if(possiblepair === ""){
    document.querySelector('.area').innerHTML = "選択完了！";
  }
}

//................................................................//

//入力をクリア
const target32 = document.getElementById("clearbutton");
target32.addEventListener('click', clearTextbox);

function clearTextbox(){
  document.getElementById("inputchange1").value = "";
  document.getElementById("inputchange2").value = "";
}

//................................................................//

//ペアリング後の表を保存
const target33 = document.getElementById("finishbutton");
target33.addEventListener('click', outputChart);

function outputChart(){
  result.push(JSON.parse(JSON.stringify(newchart)));
}

//................................................................//

//ペアリング後の表を表示
const target34 = document.getElementById("displaybutton3");
target34.addEventListener('click', displayChangeChart);

function displayChangeChart(){

  const cngecharthead = document.getElementById("changehead");
  const trh = document.createElement("tr");
  const len = Object.keys(newchart[0]).length;
  cngecharthead.appendChild(trh); 
  const tdh = document.createElement("th");
  tdh.textContext = 0 ;
  trh.appendChild(tdh);
  for ( let i = 1 ; i <= len ; i++ ){
    const tdh = document.createElement("th");
    tdh.textContent = i;
    trh.appendChild(tdh);
  }

const cngechart = document.getElementById("changechart");
let i = 1
newchart.forEach((object) => {  // 配列の中のオブジェクトの数だけ処理を繰り返す
  const tr = document.createElement("tr"); 
  cngechart.appendChild(tr); // 表の中に８個の「tr」（行）ができる
  // 1行の中を生成
  const th = document.createElement("th");
  th.textContent = i;
  i = i + 1
  tr.appendChild(th)
  const objArray = Object.entries(object);  // オブジェクトを配列に

  objArray.forEach((arr) => { // No, name, age, gradeの4回繰り返す
    const td = document.createElement("td");
    td.textContent = arr[1];  // arr[1]はvalueの部分
    tr.appendChild(td);
  }
  );
}
);
}

//................................................................//

//ペアリングした表をcsvファイルに保存
document.getElementById("outputCSVbutton").addEventListener('click', async () => {

  let string = " ,";
  let len_array = newchart.length;  
  for ( let i = 0 ; i < Object.keys(newchart[0]).length ; i++){
    if ( i === Object.keys(newchart[0]).length - 1 ){
      string += i + 1 + "\n";
    } else {
      string += i + 1 + ",";
    }
  }
  
  for ( let i = 0 ; i < len_array ; i++){
    string += i + 1 + "," ;
    let len_object = Object.keys(newchart[i]).length
    for ( let j = 0 ; j < len_object ; j++ ){
      if( j === len_object -1 ){
        string += newchart[i][j] + "\n";
      } else {
        string += newchart[i][j] + ",";
      }
    } 
  }

  const fh = await window.showSaveFilePicker({ suggestedName: 'output.csv' });
  const stream = await fh.createWritable();
  const blob = new Blob([string], { type: 'text/csv' });
  await stream.write(blob);
  await stream.close();
}
)

//................................................................//

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//................................................................//

//結果を全てリセット
document.getElementById('reset-button').addEventListener('click', resetResult)

function resetResult(){
  window.location.reload();
}

//................................................................//

///////////////////////////////////////////////////////////////////////////////////////////////////////////
