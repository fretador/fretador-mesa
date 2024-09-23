import { CheckBoxIcon, CheckBoxUncheckIcon } from "@/utils/icons";

interface CheckboxIconProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxIcon: React.FC<CheckboxIconProps> = ({ checked, onChange }) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <span
      onClick={handleClick}
      style={{ cursor: "pointer", marginRight: "8px", marginTop: "9px" }}
    >
      {checked ? <CheckBoxIcon /> : <CheckBoxUncheckIcon />}
    </span>
  );
};

export default CheckboxIcon;
