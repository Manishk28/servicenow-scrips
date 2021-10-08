// Run the following script from background to get the list of Plugins installed
(function() {
    var plugins = [];
    var result = 'List of all plugins installed on ' + gs.getProperty('instance_name') + '\n';
    var pMgr = new GlidePluginManager();
    var grPlugin = new GlideRecord('sys_plugins');
    grPlugin.addEncodedQuery("active=0^ORactive=1");
    grPlugin.query();
    while (grPlugin.next()) {
        var pluginObj = {};
        pluginObj.name = grPlugin.getValue('name');
        pluginObj.pID = grPlugin.getValue('source');
        pluginObj.isActive = pMgr.isActive(pluginObj.pID);
        if (pluginObj.isActive) {
            plugins.push(pluginObj);
        }
    }
    //sort plugins by name
    plugins = plugins.sort(function(a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
    });
    for (var i = 0; i < plugins.length; i++) {
        result += plugins[i].name + ' | ' + plugins[i].pID + '\n';
    }
    gs.info(result);
})();
