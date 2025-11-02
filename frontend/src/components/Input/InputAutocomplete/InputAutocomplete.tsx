import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Input, { InputProps } from "../Input";
import { memo, useState } from "react";
import classes from "./InputAutocomplete.module.scss";
import classNames from "classnames";

type InputAutocompleteProps = InputProps & {
	options: string[];
};

const InputAutocomplete = (props: InputAutocompleteProps) => {
	const [inputValue, setInputValue] = useState("");
	const [open, setOpen] = useState(false);

	return (
		<Autocomplete
			className={classNames(classes.container, {
				[classes.expanded]: props.expandHorizontaly,
			})}
			id="custom-input-demo"
			options={props.options}
			open={open}
			onOpen={() => {
				if (inputValue.length > 0) {
					setOpen(true);
				}
			}}
			onClose={() => setOpen(false)}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
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
					<Input {...params.inputProps} {...props} />
				</div>
			)}
		/>
	);
};

export default memo(InputAutocomplete);
