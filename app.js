const search=document.getElementById("search");
const areaFilter=document.getElementById("areaFilter");
const personFilter=document.getElementById("personFilter");
const tbody=document.getElementById("tbody");
const count=document.getElementById("count");
const copyAll=document.getElementById("copyAll");
const downloadXlsx=document.getElementById("downloadXlsx");

const unique=a=>[...new Set(a)].sort((x,y)=>x.localeCompare(y,"cs"));

unique(data.map(x=>x.area)).forEach(v=>{
  const o=document.createElement("option");
  o.value=v;o.textContent=v;areaFilter.appendChild(o);
});
unique(data.map(x=>x.person)).forEach(v=>{
  const o=document.createElement("option");
  o.value=v;o.textContent=v;personFilter.appendChild(o);
});

function itemText(x){
  return `${x.device}
Oblast: ${x.area}
Model: ${x.model}
Použití: ${x.use}
Kontaktní osoba: ${x.person}
Web MEL: ${x.web}
PDF MEL: ${x.pdf}`;
}

async function copyText(value,button){
  try{
    await navigator.clipboard.writeText(value);
  }catch(_){
    const ta=document.createElement("textarea");
    ta.value=value;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  const old=button.textContent;
  button.textContent="Zkopírováno";
  button.classList.add("copied");
  setTimeout(()=>{
    button.textContent=old;
    button.classList.remove("copied");
  },1200);
}

function filtered(){
  const q=search.value.trim().toLocaleLowerCase("cs");
  return data.filter(x=>{
    const hay=`${x.area} ${x.device} ${x.model} ${x.use} ${x.person}`.toLocaleLowerCase("cs");
    return (!q||hay.includes(q))
      &&(!areaFilter.value||x.area===areaFilter.value)
      &&(!personFilter.value||x.person===personFilter.value);
  });
}

function render(){
  const rows=filtered();
  count.textContent=`Zobrazeno ${rows.length} z ${data.length} položek.`;
  tbody.innerHTML="";
  rows.forEach(x=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`
      <td class="area"></td>
      <td class="device"></td>
      <td class="model"></td>
      <td class="use"></td>
      <td class="person"></td>
      <td class="links">
        <a class="link-btn web" target="_blank" rel="noopener noreferrer">Web MEL ↗</a>
        <a class="link-btn pdf" target="_blank" rel="noopener noreferrer">PDF ↗</a>
      </td>
      <td class="copycol"><button class="copy-btn">Kopírovat</button></td>`;
    tr.children[0].textContent=x.area;
    tr.children[1].textContent=x.device;
    tr.children[2].textContent=x.model;
    tr.children[3].textContent=x.use;
    tr.children[4].textContent=x.person;
    tr.querySelector(".web").href=x.web;
    tr.querySelector(".pdf").href=x.pdf;
    const btn=tr.querySelector(".copy-btn");
    btn.addEventListener("click",()=>copyText(itemText(x),btn));
    tbody.appendChild(tr);
  });
}

function xmlEscape(v){
  return String(v)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&apos;");
}
function columnName(i){
  let n="";
  while(i>0){
    i--;
    n=String.fromCharCode(65+(i%26))+n;
    i=Math.floor(i/26);
  }
  return n;
}
function crc32(bytes){
  if(!crc32.table){
    const table=new Uint32Array(256);
    for(let n=0;n<256;n++){
      let c=n;
      for(let k=0;k<8;k++) c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);
      table[n]=c>>>0;
    }
    crc32.table=table;
  }
  let crc=0xFFFFFFFF;
  for(const b of bytes) crc=crc32.table[(crc^b)&255]^(crc>>>8);
  return (crc^0xFFFFFFFF)>>>0;
}
const u16=v=>new Uint8Array([v&255,(v>>>8)&255]);
const u32=v=>new Uint8Array([v&255,(v>>>8)&255,(v>>>16)&255,(v>>>24)&255]);
function concatBytes(parts){
  const len=parts.reduce((s,p)=>s+p.length,0);
  const out=new Uint8Array(len);
  let off=0;
  for(const p of parts){out.set(p,off);off+=p.length;}
  return out;
}
function zipStore(files){
  const enc=new TextEncoder(),locals=[],centrals=[];
  let offset=0;
  for(const f of files){
    const name=enc.encode(f.name);
    const body=typeof f.data==="string"?enc.encode(f.data):f.data;
    const crc=crc32(body);
    const local=concatBytes([
      u32(0x04034b50),u16(20),u16(0),u16(0),u16(0),u16(0),
      u32(crc),u32(body.length),u32(body.length),u16(name.length),u16(0),name
    ]);
    locals.push(local,body);
    centrals.push(concatBytes([
      u32(0x02014b50),u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),
      u32(crc),u32(body.length),u32(body.length),u16(name.length),
      u16(0),u16(0),u16(0),u16(0),u32(0),u32(offset),name
    ]));
    offset+=local.length+body.length;
  }
  const central=concatBytes(centrals);
  return concatBytes([...locals,central,concatBytes([
    u32(0x06054b50),u16(0),u16(0),u16(files.length),u16(files.length),
    u32(central.length),u32(offset),u16(0)
  ])]);
}

function makeXlsx(rows){
  const headers=["Oblast","Přístroj / systém","Model","Použití","Kontaktní osoba","Web MEL","PDF MEL"];
  const values=[headers,...rows.map(x=>[x.area,x.device,x.model,x.use,x.person,x.web,x.pdf])];
  const xmlRows=values.map((row,ri)=>{
    const r=ri+1;
    return `<row r="${r}">`+row.map((v,ci)=>{
      const ref=`${columnName(ci+1)}${r}`;
      const style=ri===0?' s="1"':'';
      return `<c r="${ref}" t="inlineStr"${style}><is><t xml:space="preserve">${xmlEscape(v)}</t></is></c>`;
    }).join("")+"</row>";
  }).join("");
  const last=values.length;

  const worksheet=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
<cols>
<col min="1" max="1" width="30" customWidth="1"/>
<col min="2" max="2" width="38" customWidth="1"/>
<col min="3" max="3" width="34" customWidth="1"/>
<col min="4" max="4" width="62" customWidth="1"/>
<col min="5" max="5" width="25" customWidth="1"/>
<col min="6" max="7" width="45" customWidth="1"/>
</cols>
<sheetData>${xmlRows}</sheetData><autoFilter ref="A1:G${last}"/></worksheet>`;

  const contentTypes=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;

  const rootRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;

  const workbook=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets><sheet name="Přístroje" sheetId="1" r:id="rId1"/></sheets></workbook>`;

  const workbookRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

  const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font></fonts>
<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF075A9C"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="1"><border/></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="2">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFill="1" applyFont="1"><alignment vertical="center" wrapText="1"/></xf>
</cellXfs></styleSheet>`;

  const now=new Date().toISOString();
  const core=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>MEL – zobrazené přístroje</dc:title><dc:creator>ChatGPT</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created></cp:coreProperties>`;

  const app=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Microsoft Excel compatible export</Application></Properties>`;

  return new Blob([zipStore([
    {name:"[Content_Types].xml",data:contentTypes},
    {name:"_rels/.rels",data:rootRels},
    {name:"docProps/core.xml",data:core},
    {name:"docProps/app.xml",data:app},
    {name:"xl/workbook.xml",data:workbook},
    {name:"xl/_rels/workbook.xml.rels",data:workbookRels},
    {name:"xl/styles.xml",data:styles},
    {name:"xl/worksheets/sheet1.xml",data:worksheet}
  ])],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
}

function downloadVisibleXlsx(){
  const rows=filtered();
  if(!rows.length){
    alert("Není co exportovat – aktuální filtr nezobrazuje žádnou položku.");
    return;
  }
  const url=URL.createObjectURL(makeXlsx(rows));
  const a=document.createElement("a");
  a.href=url;
  a.download=`MEL_pristroje_${new Date().toISOString().slice(0,10)}.xlsx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

[search,areaFilter,personFilter].forEach(el=>el.addEventListener("input",render));
copyAll.addEventListener("click",()=>copyText(
  filtered().map(itemText).join("\n\n--------------------\n\n"),copyAll
));
downloadXlsx.addEventListener("click",downloadVisibleXlsx);
render();