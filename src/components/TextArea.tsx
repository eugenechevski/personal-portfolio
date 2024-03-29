// A generic component for text area
import { textColor } from "@/lib/constants";

export default function TextArea(props: { [key: string]: any, classes?: string }) {
  const { classes } = props;
  return (
    <textarea
      className={
        "bg-white outline-none p-3 rounded-xl resize-none text-[" +
        textColor +
        "]" + " " + classes
      }
      {...props}
    />
  );
}
