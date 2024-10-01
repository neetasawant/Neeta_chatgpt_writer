import * as React from "react";
import "@/assets/styles.css";
import InputUserText from "./InputUserText";
import GeneratedTextView from "./GeneratedTextView";
import Button from "./Button";
import GenerateIcon from "@/assets/generate.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (text: string) => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  // state Variables
  const [dummyText, setDummyText] = React.useState<string | null>(null);
  const [userText, setUserText] = React.useState<string>("");
  const [inputError, setInputError] = React.useState<boolean>(false);

  React.useEffect(() => {
    // check state of modal
    if (isOpen) {
      resetState();
    }
  }, [isOpen]);

  // function to reset state
  const resetState = () => {
    setDummyText(null);
    setUserText("");
    setInputError(false);
  };

  // function to generate dummy text based on user input
  const handleGenerate = () => {
    if (!userText.trim()) {
      setInputError(true);
      return;
    }

    setInputError(false);
    setDummyText(
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    );
  };

  // function to handle inserting text
  const handleInsert = () => {
    if (dummyText) {
      onInsert(dummyText);
      onClose();
    }
  };

  // function to close modal
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // function to handle user input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserText(e.target.value);
    if (inputError && e.target.value.trim()) {
      setInputError(false);
    }
  };

  // dont show modal if isOpen is false
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div
        className="flex justify-center items-center fixed z-50 outline-none focus:outline-none w-[530px] min-h-[80px] transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-[8px] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 rounded-lg w-full min-h-[80px] shadow-lg text-center">
          {dummyText ? (
            <GeneratedTextView
              userText={userText}
              dummyText={dummyText}
              onInsert={handleInsert}
              generatedView={true}
            />
          ) : (
            <>
              <InputUserText
                userText={userText}
                onChange={handleInputChange}
                inputError={inputError}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleGenerate}
                  icon={GenerateIcon}
                  label="Generate"
                  primary
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
