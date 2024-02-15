const Allergy = ({ livesArray, allergyFruit }) => {
  return (
    <div>
      <div className="allergy">
        <h4>Allergic To</h4>
        <div className="image">
          <img src={allergyFruit.src} width={"90%"} alt="allergy" />
        </div>
      </div>
      <div className="allergy">
        <div style={{ display: "flex" }}>
          {livesArray.map((item, index) => {
            return (
              <img
                key={index}
                src={item}
                alt="lives"
                width={50}
                style={{ marginLeft: 10 }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Allergy;
