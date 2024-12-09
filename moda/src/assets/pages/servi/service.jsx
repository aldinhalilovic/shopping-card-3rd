import contImg from "./hero-container.png";
import contService from "./Service-content.png";
import "./service.css";
export default function Service() {
  return (
    <>
      <img src={contImg} alt="" style={{ width: "100%" }} />
      <div className="div2">
        <img
          src={contService}
          alt=""
          style={{ width: "100%" }}
          className="img2"
        />
      </div>
    </>
  );
}
