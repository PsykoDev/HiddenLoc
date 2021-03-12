/** @format */

module.exports = function HiddenLoc(mod) {
  let loc = true

  mod.command.add("loc", () => {
    loc = !loc
    mod.command.message(`${loc ? "HiddenLoc" : "showing"} location.`)
  })

  mod.hook("C_VISIT_NEW_SECTION", 1, (e) => {
    if (loc) {
      return false
    }
  })
}
