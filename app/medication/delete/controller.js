import AbstractDeleteController from 'hospitalrun/controllers/abstract-delete-controller';    
export default AbstractDeleteController.extend({
    title: 'Delete Request',
    
    actions: {
        delete: function() {
            var visit = this.get('visit'),
                medications = visit.get('medication');
            medications.removeObject(this.get('model'));
            visit.save().then(function() {
                this.get('model').destroyRecord().then(function() {
                    this.send('modalClose');
                }.bind(this));
            }.bind(this));
        }
    }
});