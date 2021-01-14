var prevSetup = Selectize.prototype.setup;

Selectize.prototype.setup = function() {
    prevSetup.call(this);

    this.$control_input.prop('readonly', true);
};

const select = {
    load: () => {
        $('[data-selectize]').selectize({
            sortField: 'text'
        });
    }
}