"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Editor, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const RichTextEditor = () => {
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

    const Button = ({ onMouseDown, active, children }) => (
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
        <div className="flex flex-col gap-4 p-2 border-2 border-black rounded-lg">
            <Slate editor={editor} initialValue={value} onChange={handleChange}>
                <div className="flex gap-4 items-center">
                    <Button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleFormat("bold");
                        }}
                        active={activeFormats.bold}
                    >
                        <b>B</b>
                    </Button>
                    <Button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleFormat("italic");
                        }}
                        active={activeFormats.italic}
                    >
                        <i>I</i>
                    </Button>
                    <Button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleFormat("underline");
                        }}
                        active={activeFormats.underline}
                    >
                        <u>U</u>
                    </Button>
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
    );
};

export default RichTextEditor;