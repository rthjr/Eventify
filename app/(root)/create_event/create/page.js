"use client";
import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { useEffect } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "@node_modules/next/navigation";
import { Editor, createEditor, Node } from "slate";
import { withReact, Slate, Editable } from "slate-react";
import { withHistory } from "slate-history";
import { useSession } from "@node_modules/next-auth/react";
const Create = () => {
  const { data: session } = useSession()
  const router = useRouter();

  // Rich Text Editor
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: " " }],
    },
  ]);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const [selectedColor, setSelectedColor] = useState("black");

  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case "paragraph":
        return (
          <p {...attributes} style={{ textAlign: element.align || "left" }}>
            {children}
          </p>
        );
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    if (leaf.color)
      children = <span style={{ color: leaf.color }}>{children}</span>;
    return <span {...attributes}>{children}</span>;
  }, []);

  const toggleFormat = (format) => {
    const isActive = Editor.marks(editor)?.[format] === true;
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }

    setActiveFormats((prev) => ({ ...prev, [format]: !isActive }));
  };

  const applyColor = (color) => {
    Editor.addMark(editor, "color", color);
    setSelectedColor(color);
  };



  const TextEditorButton = ({ onMouseDown, active, children }) => (
    <button
      onMouseDown={onMouseDown}
      style={{
        fontWeight: active ? "bold" : "normal",
        backgroundColor: active ? "#f0f0f0" : "transparent",
        border: "none",
        padding: "8px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );

  const ColorPicker = ({ onChange }) => (
    <select
      value={selectedColor}
      onChange={(e) => {
        const color = e.target.value;
        applyColor(color);
        onChange && onChange(color);
      }}
      style={{
        padding: "6px",
        marginLeft: "8px",
        cursor: "pointer",
      }}
    >
      <option value="black">Black</option>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
      <option value="orange">Orange</option>
    </select>
  );

  //TODO handle form submitted
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "",
    description: "",
    owner: session.user.id,
  });



  const handleFormChange = (e) => {
    const { id, value } = e.target;
    console.log(value);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleEditorChange = (newValue) => {
    setValue(newValue);
    const plainText = serialize(newValue);
    console.log(plainText)
    setFormData((prev) => ({ ...prev, description: plainText }));
    const marks = Editor.marks(editor) || {};
    setActiveFormats({
      bold: marks.bold === true,
      italic: marks.italic === true,
      underline: marks.underline === true,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.startTime || !formData.endTime || !formData.location || !formData.category) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      console.log(formData)
      localStorage.setItem("eventData", JSON.stringify(formData));
      console.log("Updated local storage data:", formData);
      router.push(`/create_event/create/upload`);
    } catch (error) {
      throw new Error(error);
    }
  };
  const serialize = (nodes) => {
    return nodes.map(n => Node.string(n)).join('\n');
  };



  // hanlde select data form category put in selector
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch("https://coding-fairy.com/api/mock-api-resources/1734491523/category");
        const data = await response.json();
        const filteredData = data.filter(item => item.name !== "All");
        setCategory(filteredData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  
    fetchCategory();
  }, []);
  

  return (
    <>
      <Header isMenu="create" />

      <div className="w-full h-full flex flex-wrap m-auto ">
        <div className="w-full md:w-5/12 h-auto flex flex-wrap my-20 m-auto border-2 border-black rounded-lg ">
          {/* //TODO this is form */}
          <form
            className="p-4 bg-gray-100 rounded-xl w-full h-auto flex flex-col gap-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-black">Create an Event</h2>

            <ul className="flex justify-between">
              <li className="border-b-2 border-customPurple-default text-customPurple-default font-bold text-sm md:text-base lg:text-lg xl:text-xl">
                Basic Info
              </li>
              <li className="text-sm md:text-base lg:text-lg xl:text-xl">
                Upload Media
              </li>
              <li className="text-sm md:text-base lg:text-lg xl:text-xl">
                Tickets
              </li>
              <li className="text-sm md:text-base lg:text-lg xl:text-xl">
                Payment Info
              </li>
            </ul>

            <div className="flex flex-wrap lg:flex-col gap-4">
              <h2 className="text-2xl font-bold">
                What&apos;s the name of your Event?
              </h2>
              <p>
                This will be your event&apos;s title. Your title will be used to help
                create your event&apos;s summary, description, category
              </p>
            </div>

            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Enter Event Name"
              className="w-full p-4 rounded-lg border-2 border-black"
            />

            {/* select all data from category */}
            <select
              id="category"
              className="border-2 border-black rounded-lg p-4 w-full"
              value={formData.category}
              onChange={handleFormChange}
            >
              <option value="" disabled>
                -- Choose a category --
              </option>
              {category.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <h2 className="text-2xl font-bold">Schedule</h2>

            <div className="w-full flex justify-between flex-wrap lg:gap-0 gap-8">
              <div className="flex gap-4 flex-col w-full lg:w-[35%]">
                <label htmlFor="date" className="text-sm">Date (Month / Day / Year)</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  placeholder="Select your date"
                  className="w-full p-4 rounded-lg border-2 border-black"
                />
              </div>

              <div className="flex gap-4 flex-col w-full lg:w-[30%]">
                <label htmlFor="startTime" className="text-sm">Start Time (Hour / Min)</label>
                <input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleFormChange}
                  placeholder="Start Time"
                  className="w-full p-4 rounded-lg border-2 border-black"
                />
              </div>

              <div className="flex gap-4 flex-col w-full lg:w-[30%]">
                <label htmlFor="endTime" className="text-sm">End Time (Hour / Min)</label>
                <input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleFormChange}
                  placeholder="End Time"
                  className="w-full p-4 rounded-lg border-2 border-black"
                />
              </div>
            </div>

            <input
              type="url"
              id="location"
              value={formData.location}
              onChange={handleFormChange}
              placeholder="Pass your URL location."
              className="w-full p-4 rounded-lg border-2 border-black"
            />

            {/* Rich Text Editor */}
            <div className="flex flex-col gap-4 p-2 border-2 border-black rounded-lg">
              <Slate
                editor={editor}
                initialValue={value}
                onValueChange={handleEditorChange}
                onChange={handleEditorChange}
              >
                <div className="flex gap-4 items-center">
                  <TextEditorButton
                    onMouseDown={(e) => {
                      e.preventDefault();
                      toggleFormat("bold");
                    }}
                    active={activeFormats.bold}
                  >
                    <b>B</b>
                  </TextEditorButton>
                  <TextEditorButton
                    onMouseDown={(e) => {
                      e.preventDefault();
                      toggleFormat("italic");
                    }}
                    active={activeFormats.italic}
                  >
                    <i>I</i>
                  </TextEditorButton>
                  <TextEditorButton
                    onMouseDown={(e) => {
                      e.preventDefault();
                      toggleFormat("underline");
                    }}
                    active={activeFormats.underline}
                  >
                    <u>U</u>
                  </TextEditorButton>
                  <ColorPicker />
                </div>

                {/* place input text */}
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  placeholder="Start typing..."
                  spellCheck
                  autoFocus
                  className="px-2 border-2 border-black rounded-lg"
                />
              </Slate>
            </div>

            <div className="w-full flex justify-between items-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-300 text-black py-2 px-4 rounded"
              >
                Back
              </button>

              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Save & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Create;
