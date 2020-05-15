const SECTIONS = ['A', 'B', 'C'];

async function sectionPopulator(sectionModel) {
  const saveSections = SECTIONS.map(section => {
    const sectionData = sectionModel.build({
      name: section,
    });
    return sectionData.save();
  });

  return Promise.all(saveSections);
}

module.exports = sectionPopulator;
