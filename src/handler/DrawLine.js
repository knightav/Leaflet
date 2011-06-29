/*
 * L.Handler.DrawMarker is used to add markers to map when clicking.
 */

L.Handler.DrawLine = L.Handler.extend({
	initialize: function(map, options) {
		L.Util.setOptions(this, options);
		this._map = map;
	},
	enable: function() {
		if (this._enabled) { return; }
		this._tempMarkers = new L.LayerGroup();
		this._map.addLayer(this._tempMarkers);		
		this._map.on('click', this._onClick, this);
		this._enabled = true;		
	},
	disable: function() {
		if (!this._enabled) { return; }
		this._map.removeLayer(this._tempMarkers);
		this._map.off('click', this._onClick, this);
		this._map.off('dblclick', this._onDoubleClick, this);		
		this._enabled = false;
	},
	_onClick: function(e) {
		var marker = new L.Marker(e.latlng),
			layerGroup = this.options.layerGroup,
			tempMarkers = this._tempMarkers;	
		if(!this._line) {
			this._line = new L.Polyline([e.latlng], {noSimplify: true});
			if(layerGroup) {
				this.options.layerGroup.addLayer(this._line)
			} else {
				this._map.addLayer(this._line);
			}			
		} else {
			this._line.addLatLng(e.latlng);
		}
		
		marker.on('dblclick', this._onDoubleClick, this);
		marker.on('click', function(e) {
			this._line.addLatLng(e.target._latlng);			
		}, this);
		tempMarkers.clearLayers();
		tempMarkers.addLayer(marker);		
	},
	_onDoubleClick: function(e) {
		if(!this._line) { return;}
		this._tempMarkers.clearLayers();
		this._line = undefined;
	}
});
