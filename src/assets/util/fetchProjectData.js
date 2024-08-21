export async function fetchProjectData(filename, setFileData) {
  try {
    const module = await import(`../data/projectData/${filename}.json`);
    const newFileData = module.default;
    console.log(newFileData);
    setFileData(newFileData);
  } catch (error) {
    setFileData(null);
  }
}
