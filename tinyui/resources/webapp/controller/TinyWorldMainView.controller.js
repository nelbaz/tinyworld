sap.ui.define([
			"sap/ui/core/mvc/Controller"
		], 

		function(Controller) {
			"use strict";
            
				return Controller.extend("tinyworld.tinyui.controller.TinyWorldMainView", {
        onInit: function () {
			var oModel = new sap.ui.model.odata.ODataModel("/euro.xsodata", true);
            var oView = this.getView();
            var oTable = oView.byId("__table1");
            oTable.setModel(oModel, "tabModel");
        }

				});
			});