<template>
    <section class="toc" id="oferta">
      <h2>Oferta</h2>
      <ul>
        <li><span>Informatyka (szkoła średnia)</span><span>80 zł/h</span></li>
        <li><span>Programowanie (C++, Python, HTML/CSS)</span><span>90 zł/h</span></li>
        <li><span>INF.03 – egzamin zawodowy</span><span>100 zł/h</span></li>
        <li><span>Pomoc projektowa (Vue, C#, SQL)</span><span>do ustalenia</span></li>
      </ul>
    </section>
  </template>
  
  <style scoped>
  .toc {
    margin-bottom: 2rem;
  }
  .toc h2 {
    margin-bottom: 1rem;
  }
  .toc ul {
    list-style: none;
    padding: 0;
  }
  .toc li {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e3d8f7;
    border-left: 4px solid transparent;
    transition: 0.3s ease;
    cursor: pointer;
    border-radius: 4px;
  }
  .toc li:hover {
    background: #f5f0fb;
    border-left: 4px solid #6f42c1;
  }
  </style>
  