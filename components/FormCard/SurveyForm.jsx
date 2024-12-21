import Button from "@components/Button/Button";
import { useState } from "react";

const SurveyForm = () => {
  const [mode, setMode] = useState("default");
  const [questions, setQuestions] = useState([{ id: 1, text: "" }]);

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const addQuestionAtIndex = (index) => {
    const newId = questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;
    const newQuestion = { id: newId, text: "" };
    const updatedQuestions = [
      ...questions.slice(0, index + 1),
      newQuestion,
      ...questions.slice(index + 1),
    ];
    setQuestions(updatedQuestions);
  };

  const removeQuestionAtIndex = (index) => {
    console.log("Removing question at index:", index); // Debugging line
    if (questions.length === 1) {
      alert("You must have at least one question.");
      return;
    }
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (id, value) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, text: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const defaultQuestions = () => (
    <div className="flex flex-col gap-8 justify-center items-center">
      <span className="text-lg font-semibold">Help Us Improve</span>
      <p className="text-base font-light text-start">
        How satisfied were you with the event overall?
      </p>

      <div className="w-full flex gap-8 justify-center items-center">
        <div className="flex flex-col gap-4">
          <label htmlFor="">Very Good</label>
          <input type="radio" />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="">Good</label>
          <input type="radio" />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="">Bad</label>
          <input type="radio" />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="">Very Bad</label>
          <input type="radio" />
        </div>
      </div>
      <p>
        Is there anything else you would like to share about your experience?
      </p>
      <textarea
        placeholder="Description"
        className="w-full border-2 border-black rounded-lg p-4"
      ></textarea>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <h2>Survey Form</h2>
      <label>
        <input
          type="radio"
          name="mode"
          value="default"
          checked={mode === "default"}
          onChange={handleModeChange}
        />
        Default Survey
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value="custom"
          checked={mode === "custom"}
          onChange={handleModeChange}
        />
        Custom Survey
      </label>

      {mode === "default" && (
        <form>
          <h3>Default Questions</h3>
          {defaultQuestions()}
        </form>
      )}

      {mode === "custom" && (
        <div className="flex flex-col gap-8">
          <h3 className="text-center font-bold">Custom Questions</h3>
          {questions.map((q, index) => (
            <div key={q.id} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter Question text"
                value={q.text}
                onChange={(e) => updateQuestion(q.id, e.target.value)}
                className="p-2 w-full "
              />
              <input
                type="text"
                placeholder="Answer"
                className="border-2 w-full border-black rounded-md p-2"
                disabled
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  className="text-blue-500 underline"
                  onClick={() => addQuestionAtIndex(index)}
                >
                  Add Below
                </button>
                <button
                  type="button"
                  className="text-red-500 underline"
                  onClick={() => removeQuestionAtIndex(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full h-auto flex justify-between">
        <Button param="Cancel" />
        <Button param="Submit" />
      </div>
    </div>
  );
};

export default SurveyForm;
