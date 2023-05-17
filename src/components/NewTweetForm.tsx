import { useState, useLayoutEffect, useRef, useCallback } from "react";
import { ProfileImage } from "./ProfileImage";
import { Button } from "./Button";
import { useSession } from "next-auth/react";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  const updateTextAreaSize = (textArea?: HTMLTextAreaElement) => {
    if (!textArea) return;

    textArea.style.height = "0";
    textArea.style.height = `${textArea.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage />
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
          style={{ height: 0 }}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's happening?"
        ></textarea>
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
};

export const NewTweetForm = () => {
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return <Form />;
};
