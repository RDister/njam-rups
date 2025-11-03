import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Input, { InputProps } from "../Input";
import { memo, useState } from "react";
import classes from "./InputAutocomplete.module.scss";
import classNames from "classnames";

type InputAutocompleteProps = Omit<InputProps, "value" | "onChange"> & {
	options: string[];
	value?: string;
	onChange?: (value: string) => void;
};

const InputAutocomplete = (props: InputAutocompleteProps) => {
	const [open, setOpen] = useState(false);
	const inputValue = props.value || "";
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { value, onChange, options, ...inputProps } = props;

	return (
		<Autocomplete
			className={classNames(classes.container, {
				[classes.expanded]: props.expandHorizontaly,
			})}
			id="custom-input-demo"
			options={options}
			value={inputValue}
			inputValue={inputValue}
			open={open}
			onOpen={() => {
				if (inputValue.length > 0) {
					setOpen(true);
				}
			}}
			onClose={() => setOpen(false)}
			onChange={(event, newValue) => {
				onChange?.(newValue || "");
			}}
			onInputChange={(event, newInputValue, reason) => {
				// Only update input value if it's typed by user
				if (reason === "input") {
					onChange?.(newInputValue);
				}
				if (newInputValue.length === 0) {
					setOpen(false);
				} else {
					setOpen(true);
				}
			}}
			slotProps={{
				listbox: {
					style: { maxHeight: "200px" },
				},
			}}
			renderInput={(params) => (
				<div ref={params.InputProps.ref}>
					<Input {...params.inputProps} {...inputProps} value={inputValue} />
				</div>
			)}
		/>
	);
};

export default memo(InputAutocomplete);
