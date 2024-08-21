import React, { useState, useEffect } from "react";
import { fetchAllProjectData } from "../../assets/util/fetchAllProjectData.js";

function SelectProject() {
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    fetchAllProjectData(setFileData);
  }, []);

  return (
    <section className="project-wrapper">
      SelectProject from
      {fileData.map((file, index) => (
        <div key={index}> {file.header} </div>
      ))}
    </section>
  );
}

export default SelectProject;
