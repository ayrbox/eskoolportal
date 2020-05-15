const CLASSES = ['Nursery', 'JKG', 'SKG', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async function classPopulator(classModel) {
  const saveClasses = CLASSES.map(class_ => {
    const classData = classModel.build({
      name: class_,
    });
    return classData.save();
  });

  return Promise.all(saveClasses);
}

module.exports = classPopulator;
