import React, { useState } from "react";

function Quizz({ quizz ,isSubmitted,it}) {

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const [options] = useState(shuffleArray(quizz?.options));
  const [selected, setSelected] = useState("");
  return (
    <div className=" p-2 rounded w-19/20 md:w-7/10 relative">
      <h1>{it+1}.{" "+quizz?.question}</h1>
      {options.map((option, indx) => {
        return (
          <div className="flex gap-2" key={indx}>
            <input
              type="radio"
              name={`quiz-option-${it}`}
              id={`option-${indx}`}
              value={option}
              checked={selected === option}
              onChange={() => setSelected(option)}
              disabled={isSubmitted && selected !== option}
            />
            <label htmlFor={`option-${indx}`}>
              {option[0].toUpperCase() + option.slice(1, option.length)}
            </label>
          </div>
        );
      })}

      {isSubmitted && (
        <div className="absolute top-1 right-5">
          {selected === quizz?.answer ? (
            <span className="font-bold text-green-500">5/5</span>
          ) : (
            <span className="font-bold text-red-500">0/5</span>
          )}
        </div>
      )}
      {isSubmitted && (
        <div className="mt-4">
          {selected === quizz?.answer ? (
            <p className="text-green-600 font-semibold">Correct Answer ✅</p>
          ) : (
            <p className="text-red-600 font-semibold">Wrong Answer ❌</p>
          )}
          <p className="mt-2 text-sm text-gray-700">
            <strong>Explanation:</strong> {quizz.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

export default Quizz;
