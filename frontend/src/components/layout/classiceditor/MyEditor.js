import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";

const MyEditor = ({ event,value }) => {
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <div className="App">
      <JoditEditor
        ref={editor}
        // value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => event(newContent)} // preferred to use only this option to update the content for performance reasons
      />
    </div>
  );
};

export default MyEditor;
