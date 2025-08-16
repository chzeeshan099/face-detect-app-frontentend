import React from 'react';

interface InputFieldProps {
    value: string;
    onChange: (value: string) => void;
    readOnly: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, readOnly }) => {
    return (
        <input
            id="input"
            className="text-xs border-none sm:text-sm h-10 sm:h-11 flex items-center dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200 w-full rounded-md border border-greenPrimary-300 p-2 hover:outline-none hover:ring-0 focus:outline-none focus:ring-0"
            placeholder="Input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
        />
    );
};

export default InputField;
