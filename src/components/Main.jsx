import '../styles/Main.css';  // Importar los estilos del Main

export default function Main() {
  return (
    <main>
      <div className="overlay"></div>
      <div className="contenido">
        <h1>Bienvenido a Nuestra Página</h1>
        <p>Esta es la página principal. Aquí encontrarás información sobre nuestros productos y más.</p>
      </div>
    </main>
  );
}
