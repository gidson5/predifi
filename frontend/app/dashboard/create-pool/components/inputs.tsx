import { Control, Controller,FieldValues } from "react-hook-form";
import Datetime from "react-datetime";
import moment, { Moment } from "moment";

import { Path } from "react-hook-form";

type Props<T extends FieldValues> ={
  name: string;
  data: {
    name: Path<T>;
    control: Control<T>;
  };
};

export function DateInput<T extends FieldValues>({ data, name }: Props<T>) {
  const inputProps = {
    placeholder: "date/time",
    className:
      " text-[#fff] border-[#373737] bg-inherit border rounded-[8px] h-[45px] px-4 w-full",
  };
  // Define a function to disable past dates
  const validDate = (current: Moment) => {
    // Allow only dates and times in the future
    return current.isSameOrAfter(moment(), "date");
  };

  return (
    <div className="flex gap-1 flex-col text-base place-self-end w-full">
      <label htmlFor={name}>Start time</label>
      <Controller
        {...data}
        rules={{ required: "Date and time are required" }}
        render={({ field }) => (
          <>
            <Datetime
              {...field}
              inputProps={inputProps}
              className=" text-[#373737] w-full"
              isValidDate={validDate}
              onChange={(date) => field.onChange(date)}
            />
            {/* {fieldState.error && (
                    <span style={{ color: "red" }}>
                      {fieldState.error.message}
                    </span>
                  )} */}
          </>
        )}
      />
    </div>
  );
}
