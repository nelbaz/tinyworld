sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	var oFirstDialog;
	var oTable;
	return Controller.extend("tinyworld.tinyui.controller.TinyWorldMainView", {
		onInit: function() {
			var oModel = new sap.ui.model.odata.ODataModel("/euro.xsodata", true);
			var oView = this.getView();
			oTable = oView.byId("__table1");
			oTable.setModel(oModel, "tabModel");
		},
		/**
		 *@memberOf tinyworld.tinyui.controller.TinyWorldMainView
		 */
		OpenFirstDialog: function() {

			if (oFirstDialog) {

				oFirstDialog.open();

			} else {

				oFirstDialog = new sap.m.Dialog({

					width: "400px", // sap.ui.core.CSSSize
					height: "550px", // sap.ui.core.CSSSize
					title: "Country Details", // string
					applyContentPadding: true, // boolean
					modal: true, // boolean
					content: [new sap.ui.layout.form.SimpleForm({
							content: [
								new sap.ui.core.Title({
									text: "Country Name"
								}),
								new sap.m.Label({
									text: "name"
								}),
								new sap.m.Input                 ({
									value: "",
									id: "name"
								}),
								new sap.m.Label({
									text: "partof"
								}),
								new sap.m.Input({
									value: "",
									id: "partof"
								})
							]
						})] // sap.ui.core.Control
				});

				oFirstDialog.addButton(new sap.m.Button({
					text: "OK",
					press: function() {
						var name = sap.ui.getCore().byId("name").getValue();
						var partof = sap.ui.getCore().byId("partof").getValue();
						var payload = {};
						payload.name = name;
						payload.partof = partof;
						var insertdata = JSON.stringify(payload);

						$.ajax({
							type: "POST",
							url: "/country/country.xsjs",
							contentType: "application/json",
							data: insertdata,
							dataType: "json",
							crossDomain: true,
							success: function(data) {
								oFirstDialog.close();
								oTable.getModel("tabModel").refresh(true);
								alert("Data inserted successfully");
							},
							error: function(data) {
								var message = JSON.stringify(data);
								alert(message);
							}
						});
					}
				}));
				oFirstDialog.open();
			}
		}
	});
});