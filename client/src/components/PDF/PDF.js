import React from "react";
import ReactToPdf from "react-to-pdf";

export default function PDF({
  ingredients,
  image,
  title,
  readyIn,
  instructions,
}) {
  const ref = React.createRef();

  return (
    <ReactToPdf>
      {({ toPdf, targetRef }) => (
        <>
          <div className="PDF" ref={ref} ref={targetRef}>
            <h1>{title}</h1>
            <img src={image} alt="Recipe" />
            <h3>Ingredients</h3>
            {ingredients
              ? ingredients.map((food, i) => (
                  <>
                    <li key={i}>{food.name}</li>
                  </>
                ))
              : ""}
            <p>Can Be Ready In: {readyIn} Minutes</p>
            {instructions && instructions.length > 0 ? (
              <h3>Instructions</h3>
            ) : (
              <h3>Sorry No Instructions Are Available</h3>
            )}
            {instructions && instructions.length > 0
              ? instructions.map((steps) => (
                  <ol>
                    {steps.steps.map((item, i) => (
                      <li key={i}>{item.step}</li>
                    ))}
                  </ol>
                ))
              : ""}
          </div>
          <button onClick={toPdf}>Save Recipe As PDF</button>
        </>
      )}
    </ReactToPdf>
  );
}
