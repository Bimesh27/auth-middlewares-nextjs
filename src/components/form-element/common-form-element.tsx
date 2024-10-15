import React, { FC } from "react";
import { Input } from "../ui/input";

interface FormControlItem {
  name: string;
  placeholder: string;
  componentType: string;
  label: string;
  type: string;
}

interface CommonFormElementProps {
  currentItem: FormControlItem;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonFormElement: FC<CommonFormElementProps> = ({
  currentItem,
  value,
  onChange,
}) => {
  let content = null;

  switch (currentItem.componentType) {
    case "input":
      content = (
        <Input
          name={currentItem.name}
          id={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
          type={currentItem.type}
        />
      );
      break;

    default:
      break;
  }
  return <div>{content}</div>;
};

export default CommonFormElement;
