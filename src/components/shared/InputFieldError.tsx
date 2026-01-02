import { getInputFieldError, InputErrorState } from "@/lib/getinputFieldError";
import { FieldDescription } from "../ui/field";

interface InputFieldErrorProps {
  field: string;
  state: InputErrorState;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  if (getInputFieldError(field, state)) {
    return (
      <FieldDescription className="text-red-600">
        {getInputFieldError(field, state)}
      </FieldDescription>
    );
  }

  return null;
};

export default InputFieldError;
