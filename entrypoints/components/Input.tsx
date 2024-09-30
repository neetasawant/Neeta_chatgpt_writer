import Button from "./Button";
import GenerateIcon from "@/assets/generate.svg";

const Input: React.FC<{
  userText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: boolean;
  onGenerate: () => void;
}> = ({ userText, onChange, inputError, onGenerate }) => (
  <>
    <input
      type="text"
      placeholder="Your prompt"
      value={userText}
      onChange={onChange}
      className="p-3 w-full h-[60px] bg-transparent rounded-[8px] mb-2 border-transparent focus:border-transparent focus:ring-0"
    />
    {inputError && (
      <p className="text-red-500 text-left mt-1 text-sm">
        Please enter a prompt before generating.
      </p>
    )}
    <div className="flex justify-end">
      <Button
        onClick={onGenerate}
        icon={GenerateIcon}
        label="Generate"
        primary
      />
    </div>
  </>
);

export default Input;
