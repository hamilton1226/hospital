export default Ember.ObjectController.extend({
    printers: function() {    
        return dymo.label.framework.getTapePrinters();
    }.property(),
    
    havePrinters: function() {
        return true;
        var printers = this.get('printers');
        if (printers.length > 0) {
            return true;
        } else {
            return false;
        }
    }.property('printers'),
    
    singlePrinter: function() {
        return false;
        var printers = this.get('printers');
        if (printers.length === 1) {
            return true;
        } else {
            return false;
        }
    }.property('printers'),

    
    actions: {
        print: function() {
            var barcodeUri = this.get('barcodeUri'),
                selectedPrinter = this.get('selectedPrinter');
            if (!selectedPrinter) {
                selectedPrinter = this.get('printers')[0].name;
            }
            Ember.$.get("/dymo/BarcodeAsImage.label", function(labelXml) {
                var barcodeAsImageLabel = dymo.label.framework.openLabelXml(labelXml);
                    var pngBase64 = barcodeUri.substr('data:image/png;base64,'.length);
                    barcodeAsImageLabel.setObjectText('Image', pngBase64);
                    barcodeAsImageLabel.print(selectedPrinter);
            }, "text");            
        }
    }

});