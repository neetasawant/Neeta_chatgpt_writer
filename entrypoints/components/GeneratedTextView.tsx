import Button from "./Button";
import InsertIcon from "@/assets/insert.svg";
import RegenerateIcon from "@/assets/regenerate.svg";

const GeneratedTextView: React.FC<{
  userText: string;
  dummyText: string;
  onInsert: () => void;
}> = ({ userText, dummyText, onInsert }) => (
  <>
    <div className="flex flex-col items-start bg-white p-3 rounded-lg w-full">
      <div className="bg-gray-100 p-3 rounded-[8px] mt-2 max-w-[80%] self-end text-right">
        {userText || "User's input message"}
      </div>
      <div className="bg-lightblue p-3 rounded-[8px] mt-2 max-w-[80%] self-start text-left">
        {dummyText}
      </div>
      <input
        type="text"
        placeholder="Your prompt"
        className="p-3 w-full h-[60px] rounded-[8px] mt-5"
      />
    </div>
    <div className="flex justify-end items-center space-x-2 p-2">
      <Button onClick={onInsert} icon={InsertIcon} label="Insert" />
      <Button
        onClick={onInsert}
        icon={RegenerateIcon}
        label="Regenerate"
        primary
      />
    </div>
  </>
);

export default GeneratedTextView;
