import React from "react";
import ReactToPdf from "react-to-pdf";
import "../RecipePage/RecipePage.scss";
import Button from "@mui/material/Button";
import "../PDF/PDF.scss";
export default function PDF({
  ingredients,
  image,
  title,
  readyIn,
  instructions,
}) {
  const ref = React.createRef();
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [17, 21],
  };
  return (
    <ReactToPdf options={options} x={0.8} y={0.8} scale={1}>
      {({ toPdf, targetRef }) => (
        <div ref={ref}>
          <div className="PDF" ref={targetRef}>
            <div className="PDF__ingredientsContainer">
              <div>
                <h1>{title}</h1>
                <img src={image} alt="Recipe" className="PDF__image" />
              </div>
              <div className="PDF__ingredientsContainer-loopContainer">
                <h3>Ingredients</h3>
                <ul className="PDF__ingredientsList">
                  {ingredients
                    ? ingredients.map((food, i) => (
                        <li className="PDF__ingredientsList-item" key={i}>
                          {food.name}
                        </li>
                      ))
                    : ""}
                </ul>
                <p>Can Be Ready In: {readyIn} Minutes</p>
              </div>
            </div>
            <div className="PDF__instructions">
              {instructions && instructions.length > 0 ? (
                <h3>Instructions</h3>
              ) : (
                <h3>Sorry No Instructions Are Available</h3>
              )}
              <ol>
                {" "}
                {instructions && instructions.length > 0
                  ? instructions.map((steps) => (
                      <>
                        {steps.steps.map((item, i) => (
                          <li className="PDF__ingredientsList-item" key={i}>
                            {item.step}
                          </li>
                        ))}
                      </>
                    ))
                  : ""}
              </ol>
              <Button variant="contained" onClick={toPdf}>
                Save Recipe As PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </ReactToPdf>
  );
}
