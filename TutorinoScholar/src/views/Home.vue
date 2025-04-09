<template>
    <div class="skul-app">
        <header class="topbar">
        <img src="" alt="Skul logo" class="logo" />
        <input type="text" placeholder="" class="search" />
        </header>

        <nav class="breadcrumb">
        <a href="#">Opracowania zadan z podrecznikow</a> 
        > <a href="#">Fizyka. Klasa 3...</a>
        </nav>

        <section class="book-card">
        <div class="book-info">
            <div class="icon">📘</div>
            <div class="details">
            <h1>Fizyka. Klasa 3. Zakres podstawowy...</h1>
            <p><strong>Typ ksiazki:</strong> Podrecznik</p>
            <p><strong>Klasa:</strong> 3 szkoly sredniej</p>
            <p><strong>Wydawnictwo:</strong> WSIP</p>
            <p><strong>Autorzy:</strong> Ludwik Lehman, Witold Polesiuk, Grzegorz F. Wojewoda</p>
            <p><strong>Rok wydania:</strong> 2021, Wydanie 1</p>
            <p><strong>ISBN:</strong> 978-8-30-219549-5</p>
            </div>
        </div>
        </section>

        <section class="toc">
        <h2>Spis tresci</h2>
        <ul>
            <li><span>Elektrostatyka</span> <span>7</span></li>
            <li><span>Prad elektryczny</span> <span>65</span></li>
            <li><span>Elektromagnetyzm</span> <span>103</span></li>
            <li><span>Fizyka atomowa</span> <span>173</span></li>
            <li><span>Fizyka jadrowa</span> <span>241</span></li>
        </ul>
        </section>

        <footer class="footer">
        <div>
            <img src="" class="logo" />
            <nav>
            <a href="#">Napisz do nas</a>
            <a href="#">FAQ</a>
            <a href="#">Mapa Serwisu</a>
            </nav>
            <div class="apps">
            <img src="" />
            <img src="" />
            </div>
        </div>
        <p>Korzystanie z portalu oznacza akceptacje Regulaminu...</p>
        </footer>
    </div>
    <div>
        <h1>Witaj na Tutorino Scholar!</h1>
        <h5>Strona w trakcie tworzenia</h5>
        <h2>Narzędzia</h2>
        <ul>
            <li>
                <router-link to="/generator-ukladu-rownan-liniowych">Generator układów równań liniowych</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>
<style scoped>
.skul-app {
  font-family: 'Segoe UI', sans-serif;
  color: #1f1f1f;
  background: #f9f7fc;
  padding: 1rem;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 40px;
}

.search {
  background: white;
  border-radius: 10px;
  border: none;
  padding: 8px 12px;
  width: 200px;
}

.breadcrumb {
  font-size: 0.9rem;
  margin: 1rem 0;
  color: #666;
}

.book-card {
  background: linear-gradient(135deg, #6f42c1, #a066e0);
  border-radius: 12px;
  color: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.book-info {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.icon {
  font-size: 2rem;
  background: white;
  color: #6f42c1;
  padding: 1rem;
  border-radius: 12px;
}

.details p {
  margin: 0.3rem 0;
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
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
  font-size: 1.1rem;
  background: none;
  border-radius: 0;
  margin: 0;
  border-left: 4px solid transparent;
  transition: border-color 0.3s;
}

.toc li:hover {
  border-left: 4px solid #6f42c1;
  background: #f0ebfa;
}

.footer {
  margin-top: 3rem;
  padding: 2rem 1rem;
  background: #f2f0f9;
  border-radius: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #777;
}

.footer nav a {
  margin: 0 0.5rem;
  color: #555;
  text-decoration: none;
}

.footer .apps img {
  height: 40px;
  margin: 0.5rem;
}
</style>