import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Slider,
  Card,
  CardBody,
} from "@nextui-org/react";
import {
  Settings,
  Code,
  Type,
  AlignLeftIcon,
  PlayIcon,
  PaletteIcon,
} from "lucide-react";
import Loader from "./Loader";

const MonacoEditor = () => {
  const { theme } = useTheme();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [language, setLanguage] = useState("javascript");
  const [showSettings, setShowSettings] = useState(false);
  const [editorValue, setEditorValue] = useState("// Start coding here");
  const editorTheme = theme === "dark" ? "vs-dark" : "light";
  const [currentTheme, setCurrentTheme] = useState(editorTheme);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    // Update editor theme when system/app theme changes
    const newTheme = theme === "dark" ? "vs-dark" : "light";
    setCurrentTheme(newTheme);
  }, [theme]);

  const languages = [
    "javascript",
    "typescript",
    "python",
    "java",
    "cpp",
    "csharp",
    "html",
    "css",
    "json",
  ];

  // Add this themes array near your languages array
  const themes = [
    { name: "VS Dark", value: "vs-dark" },
    { name: "Light", value: "light" },
    { name: "High Contrast", value: "hc-black" },
    { name: "Monokai", value: "monokai" },
    { name: "GitHub", value: "github" },
    { name: "Tomorrow Night", value: "tomorrow-night" },
  ];

  function handleEditorDidMount(editor, monaco) {
    setIsEditorReady(true);
    setEditor(editor);

    // Add custom themes
    monaco.editor.defineTheme("monokai", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "88846f", fontStyle: "italic" },
        { token: "keyword", foreground: "f92672" },
        { token: "string", foreground: "e6db74" },
      ],
      colors: {
        "editor.background": "#272822",
        "editor.foreground": "#f8f8f2",
        "editorLineNumber.foreground": "#90908a",
      },
    });

    // Add these theme definitions in your handleEditorDidMount function
    monaco.editor.defineTheme("github", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6a737d", fontStyle: "italic" },
        { token: "keyword", foreground: "d73a49" },
        { token: "string", foreground: "032f62" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#24292e",
        "editor.lineHighlightBackground": "#f1f8ff",
        "editorLineNumber.foreground": "#1b1f234d",
      },
    });

    monaco.editor.defineTheme("tomorrow", {
      base: "vs",
      inherit: true,
      rules: [],
    });
    monaco.editor.defineTheme("tomorrow-night", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "727072", fontStyle: "italic" },
        { token: "keyword", foreground: "cc99cc" },
        { token: "string", foreground: "7ec699" },
      ],
      colors: {
        "editor.background": "#1d1f21",
        "editor.foreground": "#c5c8c6",
        "editorLineNumber.foreground": "#373b41",
      },
    });
  }
  async function handleFormat() {
    if (editor) {
      editor.getAction("editor.action.formatDocument").run();
    }
  }
  function handleRunCode() {
    const code = editorValue;

    // Create a new function scope to avoid global scope pollution
    try {
      // Wrap the code in a try-catch to handle runtime errors
      const wrappedCode = `
      try {
        ${code}
      } catch (error) {
        console.error(error);
      }
    `;

      // Use Function constructor for safer evaluation
      new Function(wrappedCode)();
    } catch (error) {
      console.error("Syntax Error:", error.message);
    }
  }

  const editorOptions = {
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: "on",
    accessibilitySupport: "auto",
    autoIndent: "full",
    automaticLayout: true,
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    cursorBlinking: "expand",
    cursorSmoothCaretAnimation: true,
    cursorStyle: "line",
    // disableLayerHinting: false,
    dragAndDrop: true,
    folding: true,
    foldingStrategy: "auto",
    fontFamily: "'Fira Code', 'Consolas', monospace",
    fontLigatures: true,
    fontSize: fontSize,
    formatOnPaste: true,
    formatOnType: true,
    lineNumbers: "on",
    minimap: { enabled: true },
    links: true,
    mouseWheelZoom: true,
    multiCursorModifier: "alt",
    padding: { top: 10 },
    parameterHints: { enabled: true },
    quickSuggestions: true,
    renderLineHighlight: "all",
    renderWhitespace: "selection",
    smoothScrolling: true,
    snippetSuggestions: "bottom",
    suggestOnTriggerCharacters: true,
    wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
    wordWrapBreakAfterCharacters: "\t})]?|&,;",
    wordWrapBreakBeforeCharacters: "{([+",
    wordWrapBreakObtrusiveCharacters: ".",
    wrappingIndent: "same",
    wrappingStrategy: "advanced",
    tabSize: 2,
    wordWrap: "on",
  };

  return (
    <div className="flex flex-col gap-4  ">
      <div className="flex justify-between items-center px-4 pt-4 ">
        <div className="flex gap-2">
          <Dropdown size="sm">
            <DropdownTrigger>
              <Button
                isDisabled={!isEditorReady}
                variant="flat"
                size="sm"
                startContent={<Code size={18} />}
              >
                {language.toUpperCase()}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Language selection"
              onAction={(key) => setLanguage(key)}
              selectedKeys={new Set([language])}
            >
              {languages.map((lang) => (
                <DropdownItem key={lang}>{lang.toUpperCase()}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button
            variant="flat"
            size="sm"
            startContent={<Settings size={18} />}
            onClick={() => setShowSettings(!showSettings)}
          >
            Settings
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                size="sm"
                startContent={<PaletteIcon size={18} />} // Import PaletteIcon from lucide-react if you want to use it
              >
                {themes.find((t) => t.value === currentTheme)?.name}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Theme selection"
              onAction={(key) => setCurrentTheme(key)}
              selectedKeys={new Set([currentTheme])}
            >
              {themes.map((theme) => (
                <DropdownItem key={theme.value}>{theme.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleRunCode}
            color="success"
            isDisabled={!isEditorReady}
          >
            <PlayIcon size={18} />
            Run
          </Button>

          {/* <Button onClick={handleFormat} size="sm" isDisabled={!isEditorReady}>
            <AlignLeftIcon size={18} />
            Format
          </Button> */}
        </div>
        <div className="flex items-center gap-2">
          <Type size={18} />
          <Slider
            label="px"
            size="sm"
            step={1}
            maxValue={24}
            minValue={10}
            value={fontSize}
            onChange={(value) => setFontSize(value)}
            className="w-32"
          />
        </div>
      </div>
      {/* {showSettings && (
        <Card className=" mx-4">
          <CardBody>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Font Size</span>
                <Slider
                  label="px"
                  size="sm"
                  step={0.01}
                  maxValue={24}
                  minValue={10}
                  value={fontSize}
                  onChange={(value) => setFontSize(value)}
                  className="w-48"
                />
              </div>
              // Add more settings here as needed 
              <div className="flex items-center justify-between">
                <span>Theme</span>
                
              </div>
            </div>
          </CardBody>
        </Card>)} */}

      <div className="h-[60vh] border border-default-200">
        <Editor
          height="100%"
          theme={currentTheme}
          language={language}
          value={editorValue}
          onChange={setEditorValue}
          options={editorOptions}
          onMount={handleEditorDidMount}
          loading={<Loader />}
        />
      </div>
    </div>
  );
};

export default MonacoEditor;
