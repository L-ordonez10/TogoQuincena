import { FC } from "react";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="text-rose-500 font-bold text-sm">
      {message}
    </div>
  );
};
