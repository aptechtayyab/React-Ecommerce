
import { useEffect } from "react";
const DynamicTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default DynamicTitle;
