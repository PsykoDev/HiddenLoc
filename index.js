/** @format */

module.exports = function HiddenLoc(mod) {
  let loc = true
  let mapId, guardId, unk

  mod.command.add("loc", (arg1, arg2, arg3, arg4) => {
    if (arg1 && arg1.length > 0) arg1 = arg1.toLowerCase()
    switch (arg1) {
      case "set":
        mod.toServer("C_VISIT_NEW_SECTION", 1, {
          mapId: arg2,
          guardId: arg3,
          sectionId: arg4,
        })
        mod.toClient("S_VISIT_NEW_SECTION", 1, {
          mapId: arg2,
          guardId: arg3,
          sectionId: arg4,
        })
        //mod.command.message(`Set Loc ${mapId} ${guardId} ${sectionId}`)
        break
      default:
        loc = !loc
        mod.command.message(`${loc ? "HiddenLoc" : "showing"} location.`)
        break
    }
  })

  mod.hook("C_VISIT_NEW_SECTION", 1, (e) => {
    if (loc) {
      return false
    }
  })
}
