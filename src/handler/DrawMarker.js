/*
 * L.Handler.DrawMarker is used to add markers to map when clicking.
 */

L.Handler.DrawMarker = L.Handler.extend({
	initialize: function(map, options) {
		this._map = map;
		L.Util.setOptions(this, options);		
	},
	enable: function() {
		if (this._enabled) { return; }
		this._map.on('click', this._onClick, this);
		this._enabled = true;
	},
	disable: function() {
		if (!this._enabled) { return; }
		this._map.off('click', this._onClick, this);
		this._enabled = false;
	},
	_onClick: function(e) {
		var marker = new L.Marker(e.latlng, this.options.markerOptions),
		layerGroup = this.options.layerGroup;
		if(layerGroup) {
			this.options.layerGroup.addLayer(marker)
		} else {
			this._map.addLayer(marker);
		}
	}
});