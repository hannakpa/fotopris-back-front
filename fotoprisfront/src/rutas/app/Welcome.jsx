import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigateTo = useNavigate();
  const goSelect = () => {
    navigateTo("/select");
  };
  return (
    <div className="centrar">
      <h1> Personaliza la foto que te guste</h1>
      <button className="btn btn-outline-dark" onClick={() => goSelect()}>
        Continuar
      </button>
    </div>
  );
}
export default Welcome;
