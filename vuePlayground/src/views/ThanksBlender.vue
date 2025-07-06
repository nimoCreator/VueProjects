<template>
    copied from &nbsp;<a href="https://www.blender.org/thanks/"> https://www.blender.org/thanks/</a>
    <div class="thanks-page">
      <header class="header">
        <h1>Join the 2%</h1>
        <p>Help keep the project alive.</p>
      </header>
  
      <section class="download-section">
        <p>Your download will start automatically. If it didn't start, <a href="#">download manually</a>.</p>
        <p>Direct link: <a href="#">mirrors.dotsrc.org</a></p>
      </section>
  
      <section class="mirrors">
        <h2>Alternative Mirrors</h2>
        <ul>
          <li><a href="#">USA – mirrors.ocf.berkeley.edu</a></li>
          <li><a href="#">Germany – ftp.halifax.rwth-aachen.de</a></li>
          <li><a href="#">Netherlands – ftp.nluug.nl</a></li>
          <li><a href="#">Singapore – mirror.freedif.org</a></li>
        </ul>
      </section>
  
      <section class="donation">
        <p>Less than 0.1% of users donate to Blender. Your contribution will make a difference.</p>
        <p>We don’t show advertisements or sell your data. We are completely funded by donations from our community.</p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ThanksPage',
  };
  </script>
  
  <style scoped>
  .thanks-page {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding: 2rem;
    max-width: 960px;
    margin: auto;
    color: #333;
  }
  
  .header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .download-section,
  .mirrors,
  .donation {
    margin-bottom: 2rem;
  }
  
  .mirrors ul {
    list-style: none;
    padding: 0;
  }
  
  .mirrors li {
    margin: 0.5rem 0;
  }
  
  a {
    color: #007acc;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .thanks-page {
      padding: 1rem;
    }
  
    .header h1 {
      font-size: 1.5rem;
    }
  
    .mirrors ul {
      padding-left: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .header h1 {
      font-size: 1.2rem;
    }
  
    .download-section,
    .mirrors,
    .donation {
      font-size: 0.9rem;
    }
  }
  </style>
  