"use client"

import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'
import React, { useCallback, useMemo, useState } from "react";

import { useRouter } from '@node_modules/next/navigation'
import Button from '@components/Button/Button'
import BackButton from '@components/Button/BackButton'

import { Editor, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const Create = () => {

    const router = useRouter()
    const handleRedirect = () => {
        router.push("/create_event/create/upload")
    }

    // Rich Text Editor 
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
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
        if (leaf.color) children = <span style={{ color: leaf.color }}>{children}</span>;
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

    const handleChange = (newValue) => {
        setValue(newValue);

        const marks = Editor.marks(editor) || {};
        setActiveFormats({
            bold: marks.bold === true,
            italic: marks.italic === true,
            underline: marks.underline === true,
        });
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


    return (
        <>
            <Header isMenu="create" />

            <div
                className='w-full h-full flex flex-wrap m-auto '
            >
                <div className='w-5/12 h-auto flex flex-wrap my-20 m-auto border-2 border-black rounded-lg '>
                    <form action="" className='p-4 bg-gray-100 rounded-xl w-full h-auto flex flex-col gap-8'>

                        <h2 className='text-2xl font-bold text-black'>Create an Event</h2>

                        <ul className='flex justify-between'>
                            <li className='border-b-2 border-customPurple-default text-customPurple-default font-bold text-sm md:text-base lg:text-lg xl:text-xl'>Basic Info</li>
                            <li className='text-sm md:text-base lg:text-lg xl:text-xl'>Upload Media</li>
                            <li className='text-sm md:text-base lg:text-lg xl:text-xl'>Tickets</li>
                            <li className='text-sm md:text-base lg:text-lg xl:text-xl'>Payment Info</li>
                        </ul>

                        <div className='flex flex-wrap lg:flex-col gap-4'>
                            <h2 className='text-2xl font-bold'>What's the name of your Event?</h2>
                            <p>This will be your event's title. Your title will be used to help create your event's summary, description, category</p>
                        </div>

                        <input type="text" id='name' placeholder='Enter Event Name' className="w-full p-4 rounded-lg border-2 border-black" />

                        <h2 className='text-2xl font-bold'>Schedule</h2>

                        <div className='w-full flex justify-between flex-wrap gap-8'>
                            <div className='flex gap-4 flex-col w-full lg:w-[40%]'>
                                <label htmlFor="">Date (Month / Day / Year)</label>
                                <input type="date" placeholder='Select your date' className="date text-black w-full p-4 rounded-lg border-2 border-black" />
                            </div>

                            <div className='flex gap-4 flex-col lg:w-auto w-full'>
                                <label htmlFor="">Start Time (Hour / Min)</label>
                                <input type="time" id="start-time" placeholder='Start Time' className="w-full p-4 rounded-lg border-2 border-black" />
                            </div>

                            <div className='flex gap-4 flex-col lg:w-auto w-full'>
                                <label htmlFor="">End Time</label>
                                <input type="time" placeholder='End Time' className="w-full p-4 rounded-lg border-2 border-black" id='end-time' />
                            </div>
                        </div>

                        <input type="url" id='location' placeholder='Pass your url location.' className="w-full p-4 rounded-lg border-2 border-black" />

                        {/* Rick Text Editor */}
                        <div className="flex flex-col gap-4 p-2 border-2 border-black rounded-lg">
                            <Slate editor={editor} initialValue={value} onChange={handleChange}>
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

                        <div className='w-full flex justify-between items-end'>
                            <BackButton
                                param="Back"
                            />

                            <Button
                                onClick={handleRedirect}
                                param="Save & Continue"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Create
