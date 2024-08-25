async function addCartField() {
  try {
    const result = await User.updateMany(
      { cart: { $exists: false } },
      { $set: { cart: [] } }
    );
    console.log(`${result.nModified} documents were updated`);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = addCartField;
