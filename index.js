/** @format */

module.exports = function HiddenLoc(mod) {
  let loc = false
  let mapId, guardId, unk

  mod.command.add("loc", (arg1, arg2, arg3, arg4) => {
    if (arg1 && arg1.length > 0) arg1 = arg1.toLowerCase()
    switch (arg1) {
      case "set":
        mod.hook("C_VISIT_NEW_SECTION", 1, (e) => {
          e.mapId = arg2
          e.guardId = arg3
          e.unk = arg4
        })
        mod.command.message(`Set Loc ${mapId} ${guardId} ${sectionId}`)
        return true
      default:
        loc = !loc
        mod.command.message(`${loc ? "HiddenLoc" : "showing"} location.`)
        break
    }
  })
  mod.toServer("C_STATUS_FL", 1, (e) => {
    e.state = 2
    return true
  })
  mod.hook("C_STATUS_FL", 1, (e) => {
    e.state = 2
    return true
  })

  mod.hook("C_LOAD_TOPO_FIN", 1, (e) => {
    e.status = 2
    return true
  })

  mod.hook("C_VISIT_NEW_SECTION", 1, (e) => {
    if (loc) {
      return false
    }
    e.mapId = 1
    e.guardId = 0
    e.unk = 0
    return true
  })
}
