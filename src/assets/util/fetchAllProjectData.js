export async function fetchAllProjectData(setFileData) {
  try {
    const manifestModule = await import("../data/manifest.json");
    const manifestData = manifestModule.default;
    for (const data of manifestData) {
      const projectModule = await import(`../data/projectData/${data}.json`);
      const projectData = projectModule.default;
      setFileData((prevFileData) => [
        ...prevFileData,
        {
          filename: projectData.filename,
          header: projectData.header,
          description: projectData.description,
        },
      ]);
    }
  } catch (error) {
    console.error("Error importing file:", error);
  }
}
