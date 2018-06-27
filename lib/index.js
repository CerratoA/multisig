var exchangeHelpersImport = require('./exchangeHelpers');
var multiSigHelperImport = require("./multisig");
var exportModule = {
    exchangeHelpersImport: new exchangeHelpersImport(),
    multiSigHelperImport: new multiSigHelperImport()
}
module.exports = exportModule;