(function ($) {
    $.widget("ui.popup", {
        options: {
            position: { my: "left top", at: "left bottom" },
            popup: null,
            delegate: false
        },
        _create: function () {
            this.options.popup.addClass("ui-popup").hide();
            this.element.on('click', this.options.delegate, $.proxy(this.triggerEvent, this));
        },
        triggerEvent: function(event){
            event.preventDefault();
            var currentTarget = this.currentTarget;
            if(this.isOpen){
                this.hide(event);
            }
            if(currentTarget != event.target){
                this.show(event);
            }
        },
        show: function(event){
            this.isOpen = true;
            var target = event ? event.target : this.element;
            this.currentTarget = target;
            var position = $.extend({}, { of: target }, this.options.position);
            this.options.popup.show().position(position);
            this._delay(function () {
                this._setDocumentClickListener(event);
            });
            this._trigger("show", event);
        },
        hide: function(event){
            this.isOpen = false;
            this.currentTarget = false;
            this.options.popup.hide();
            this._removeDocumentClickListener();
            this._trigger("hide", event);
        },
        _setDocumentClickListener: function () {
            var self = this;
            //todo rename click.x to something more reasonable and maybe using an instance guid
            $(document).on('click.x', function(event){
                var $target = $(event.target),
                    $popupContainer = $(self.options.popup);
                // ignore the click if the target is the popup container or is inside the popup container
                if($target.is($popupContainer) || $.contains($popupContainer[0], $target[0])) {
                    return;
                }
                self.hide();
            });
        },
        _removeDocumentClickListener: function () {
            $(document).off('click.x');
        }
    });
} (jQuery));